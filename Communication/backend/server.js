const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const imageRoutes = require('./routes/imageRoutes');  // <-- Add this line
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const path = require("path");

const app = express();

dotenv.config();

connectDB();

app.use(express.json());
// app.get('/', (req, res) => {
//     res.send("Api is working");
// });

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/upload', imageRoutes);  // <-- Add this line

app.use('/uploads', express.static('uploads'));
// --------deploy-------//
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname1, "/frontend/build")));

    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
    );
} else {
    app.get("/", (req, res) => {
        res.send("API is running..");
    });
}
// --------deploy-------//

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`Server started on PORT ${PORT}`));

const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        // origin: "http://localhost:3000",
        origin: "*",
    },
})

io.on("connection", (socket) => {
    // console.log("Socket connected");
    socket.on('setup', (userData) => {
        socket.join(userData._id);
        // console.log(userData._id);
        socket.emit('connected');
    });

    socket.on('join chat', (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
    });

    socket.on('new message', (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;

        if (!chat.users)
            return console.log("chat.users not defined");

        chat.users.forEach(user => {
            if (user._id == newMessageRecieved.sender._id)
                return;
            socket.in(user._id).emit("message recieved", newMessageRecieved)
        });
    })
    socket.off("setup", () => {
        console.log("user disconnected");
        socket.leave(userData._id);
    });
});

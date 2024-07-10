const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const userRoutes=require('./routes/userRoutes')


const app = express();

dotenv.config();

connectDB();

app.use(express.json());
app.get('/', (req, res) => {
    res.send("Api is working");
});

app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
chats
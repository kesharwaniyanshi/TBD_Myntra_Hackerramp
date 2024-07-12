import { IconButton, Box, Text, useToast, Spinner, FormControl, Input } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import { getSender, getSenderFull } from '../config/ChatLogics'
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from "./miscellaneous/ProfileModal";
import UpdatedGroupChatModal from "./miscellaneous/UpdatedGroupChatModal";
import { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";

const ENDPOINT = "https://myntra-buzz.onrender.com";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const { user, selectedChat, setSelectedChat, notification, setNotification } = ChatState();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);
    const toast = useToast();

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        socket.on('connection', () => setSocketConnected(true));
    }, []);
    const fetchMessages = async () => {
        if (!selectedChat)
            return;
        try {

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            }
            setLoading(true);
            const { data } = await axios.get(`/api/message/${selectedChat._id}`,
                config
            );
            // console.log(data);
            setMessages(data);
            setLoading(false);

            socket.emit('join chat', selectedChat._id);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to fetch Messages",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMessages();

        selectedChatCompare = selectedChat;
    }, [selectedChat]);

    useEffect(() => {
        socket.on("message recieved", (newMessageRecieved) => {
            if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id) {
                if (!notification.includes(newMessageRecieved)) {
                    setNotification([newMessageRecieved, ...notification]);
                    setFetchAgain = (!fetchAgain);
                }
            }
            else {
                setMessages([...messages, newMessageRecieved]);
            }
        })
    })

    const sendMessage = async (event) => {
        if (event.key === "Enter" && newMessage) {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                }
                setNewMessage("");
                const { data } = await axios.post('/api/message', {
                    content: newMessage,
                    chatId: selectedChat._id
                },
                    config
                );
                console.log(data);

                socket.emit('new message', data)
                setMessages([...messages, data]);
            } catch (error) {
                toast({
                    title: "Error Occured!",
                    description: "Failed to send the Message",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
            }
        }
    }
    
    const sendImage = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("image", file);

        try {
            const { data } = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const imageUrl = data.imageUrl;

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            };

            const messageData = {
                content: `<img src="${imageUrl}" alt="Image" />`,
                chatId: selectedChat._id
            };

            const response = await axios.post('/api/message', messageData, config);

            socket.emit('new message', response.data);
            setMessages([...messages, response.data]);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to send the image",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    };


    const typingHandler = (e) => {
        setNewMessage(e.target.value);
    }
    return (
        <>
            {selectedChat ? (
                <>
                    <Text
                        fontSize={{ base: "28px", md: "30px" }}
                        pb={3}
                        px={2}
                        w="100%"
                        fontFamily="Work sans"
                        display="flex"
                        justifyContent={{ base: "space-between" }}
                        alignItems="center"
                    >
                        <IconButton
                            display={{ base: "flex", md: "none" }}
                            icon={<ArrowBackIcon />}
                            onClick={() => setSelectedChat("")}
                        />
                        {!selectedChat.isGroupChat ?
                            (<>
                                {
                                    getSender(user, selectedChat.users)
                                }
                                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
                            </>
                            ) : (
                                <>
                                    {selectedChat.chatName.toUpperCase()}
                                    <UpdatedGroupChatModal
                                        fetchAgain={fetchAgain}
                                        setFetchAgain={setFetchAgain}
                                        fetchMessages={fetchMessages}
                                    />
                                </>
                            )}
                    </Text>
                    <Box
                        display="flex"
                        flexDir="column"
                        justifyContent="flex-end"
                        p={3}
                        bg="#E8E8E8"
                        w="100%"
                        height="100%"
                        borderRadius="lg"
                        overflowY="hidden">
                        {loading ?
                            (<Spinner
                                size="xl"
                                w={20}
                                h={20}
                                color="magenta"
                                alignSelf={"center"}
                                margin={"auto"}
                            />) : (
                                <div className="messages">
                                    <ScrollableChat messages={messages} />
                                </div>
                            )}
                        <FormControl onKeyDown={sendMessage} mt={3} isRequired>
                            <Input
                                variant={"filled"}
                                bg={"#E0E0E0"}
                                placeholder="Type a message"
                                onChange={typingHandler}
                                value={newMessage}
                            />
                        </FormControl>
                        <FormControl onKeyDown={sendImage} mt={3}>
                            <Input
                                type="file"
                                accept="image/*"
                                // onChange={sendImage}
                                mt={3}
                            />
                        </FormControl>
                    </Box>
                </>
            ) : (
                // to get socket.io on same page
                <Box display="flex" alignItems="center" justifyContent="center" h="100%">
                    <Text fontSize="xl" pb={3} fontFamily="Work sans">
                        Click on a user to start chatting
                    </Text>
                </Box>
            )}
        </>
    )
}

export default SingleChat;

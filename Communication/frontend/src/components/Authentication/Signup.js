import { FormControl, FormLabel, Input, InputGroup, VStack, Button, InputRightElement, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import axios from "axios";
import {useHistory} from "react-router-dom";
const Signup = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    // const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false);
    const toast=useToast();
    const history=useHistory();

    // const postDetails = (pics) => {
    //     setLoading(true);
    //     if (pics === undefined) {
    //         Toast({
               
    //             title: "Please upload a profile picture",
    //             status: "warning",
    //             duration: 3000,
    //             isClosable:true,
    //             position:'bottom',
    //         });
    //         return;
    //     }
    //     if(pics.type==="image/jpeg" || pics.type==="image/png"){
    //         const data=new FormData();
    //         data.append("file",pics);
    //         data.append("upload_preset","myntra-chat");
    //         data.append("cloud_name",)
    //     }
    // }

    const handleClick = () => {
        setShow(!show);
    }

    const submitHandler = async () => {
        setLoading(true);
        if (!name || !email || !password || !confirmPassword) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
           
            return;
        }
        if (password !== confirmPassword) {
            toast({
                title: "Passwords Do Not Match",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        console.log(name, email, password);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/api/user",
                {
                    name,
                    email,
                    password,
                    // pic,
                },
                config
            );
            console.log(data);
            toast({
                title: "Registration Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            history.push("/chats");
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
    };


    return (
        <VStack>
            <FormControl id='first-name' isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    value={name}
                    placeholder='Enter Your name'
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>
            <FormControl id='email' isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    value={email}
                    placeholder='Enter Your email'
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                    <Input
                        value={password}
                        type={show ? "text" : "password"}
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup size="md">
                    <Input
                        value={confirmPassword}
                        type={show ? "text" : "password"}
                        placeholder="Enter Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            {/* <FormControl id="pic">
                <FormLabel>Upload your Picture</FormLabel>
                <Input
                    type="file"
                    p={1.5}
                    accept="image/*"
                    onChange={(e) => postDetails(e.target.files[0])}
                />
            </FormControl> */}
            <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
            isLoading={loading}
            >
                Sign Up
            </Button>
        </VStack>
    )
}

export default Signup;

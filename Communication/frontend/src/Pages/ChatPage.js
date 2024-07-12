import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import Chatbox from "../components/Chatbox";
// import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";

export const Chatpage = () => {
    // const [fetchAgain, setFetchAgain] = useState(false);
    const { user } = ChatState();

    return (
        <div style={{ width: "100%" }}>
            {user && <SideDrawer />}
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              w={"100%"}
              h={"91.5vh"}
              p={"10px"}
            >
                {user && <MyChats />}
                {user && <Chatbox /> }
            </Box>
        </div>
    );
};

// // export default Chatpage;
// import { Box, Button, Input, VStack } from "@chakra-ui/react";
// import { useState } from "react";
// import Chatbox from "../components/Chatbox";
// import MyChats from "../components/MyChats";
// import { ChatState } from "../Context/ChatProvider";

// export const Chatpage = () => {
//     const [fetchAgain, setFetchAgain] = useState(false);
//     const { user } = ChatState();
//     const [selectedChat, setSelectedChat] = useState(null);

//     return (
//         <div style={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column" }}>
//             {user && (
//                 <Box w="100%" p="10px" boxShadow="md" display="flex" justifyContent="space-between">
//                     <Input placeholder="Search people..." w="80%" />
//                     {selectedChat && (
//                         <Button onClick={() => setSelectedChat(null)}>
//                             Back
//                         </Button>
//                     )}
//                 </Box>
//             )}
//             <Box w="100%" flex="1" display="flex" flexDirection="column">
//                 {user && !selectedChat && (
//                     <MyChats fetchAgain={fetchAgain} setSelectedChat={setSelectedChat} />
//                 )}
//                 {user && selectedChat && (
//                     <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
//                 )}
//             </Box>
//         </div>
//     );
// };

// export default Chatpage;

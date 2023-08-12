import React, { useEffect, useState } from "react";
import { ChatState } from "../ContextAPI/ChatProvider";
import { Box, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import parse from "html-react-parser";

function MyChats({ fetchAgain }) {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chats/myChats", config);
      setChats(data);
      console.log("fetched all chats form mychatjsx", data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <>
      <Box
        display={{ base: "flex", md: "flex" }}
        flexDir="column"
        alignItems="center"
        p={3}
        bg="white"
        w={{ base: "31%", md: "31%" }}
        borderRadius="lg"
        borderWidth="1px"
      >
        <Box
          pb={3}
          px={3}
          fontSize={{ base: "28px", md: "30px" }}
          fontFamily="Work sans"
          display="flex"
          w="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          My Chats
        </Box>
        <Box
          display="flex"
          flexDir="column"
          p={3}
          bg="#F8F8F8"
          w="100%"
          h="100%"
          borderRadius="lg"
          overflowY="hidden"
        >
          {chats ? (
            <Stack overflowY="scroll">
              {chats.map((chat) => (
                <Box
                  onClick={() => setSelectedChat(chat)}
                  cursor="pointer"
                  bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                  color={selectedChat === chat ? "white" : "black"}
                  px={3}
                  py={2}
                  borderRadius="lg"
                  key={chat._id}
                >
                  <Text>{chat.chatName}</Text>
                  {chat.latestMessage && (
                    <Text fontSize="xs" color="cyan.900">
                      <b>{chat.latestMessage.sender.name} : </b>
                      {parse(chat.latestMessage.content).length > 50
                        ? parse(chat.latestMessage.content).substring(0, 51) +
                          "..."
                        : parse(chat.latestMessage.content)}
                    </Text>
                  )}
                </Box>
              ))}
            </Stack>
          ) : (
            <div>loading....</div>
            /* <ChatLoading /> */
          )}
        </Box>
      </Box>
    </>
  );
}

export default MyChats;

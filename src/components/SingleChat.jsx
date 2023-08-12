import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";

import axios from "axios";
import { ChatState } from "../ContextAPI/ChatProvider";
import { ArrowBackIcon, ViewIcon } from "@chakra-ui/icons";
import ProfileModal from "./ProfileModal";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";
// import TextEditor from "./TextEditor";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ENDPOINT = "http://localhost:5000"; // "https://talk-a-tive.herokuapp.com"; -> After deployment
var socket, selectedChatCompare;

function SingleChat({ fetchagain, setFetchAgain }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);

  const { user, selectedChat, setSelectedChat } = ChatState();
  const toast = useToast();

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "blockquote"],
      //   [{ code: "code-block" }, { code: "code-snippet" }],
      [{ code: "code-block" }],
      [{ upload: "file" }],
      ["emoji"],
      [{ mention: { mentionDenotationChars: ["@", "#"] } }],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "strike",
    "list",
    "bullet",
    "link",
    "blockquote",
    "code-block",
    // "code-snippet",
    "upload",
    "emoji",
    "mention",
  ];

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      // socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/messages/myMessages",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
        console.log("coming from single chat", messages);
        console.log("coming from single chat", newMessage);
        console.log("coming from single chat", data);
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
  };

  const handleTypedMessage = (value) => {
    setNewMessage(value);
  };
  // const handleTypedMessage = (html) => {
  //   setNewMessage(html);
  // };

  const fetchIndivisualMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `/api/messages/myMessages/${selectedChat._id}`,
        config
      );
      setMessages(data);
      console.log("myOwn chats data", data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  console.log("myOwn chats messages", messages);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchIndivisualMessages();

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageRecieved) => {
      // if (
      //   !selectedChatCompare ||
      //   selectedChatCompare._id !== newMessageRecieved.chat._id
      // ) {
      //   // if (!notification.includes(newMessageRecieved)) {
      //   //   setNotification([newMessageRecieved, ...notification]);
      //   //   setFetchAgain(!fetchAgain);
      //   // }
      // } else {
      setMessages([...messages, newMessageRecieved]);
      // }
    });
  });
  console.log("selected chats is ", selectedChat);
  console.log("message is ", messages);
  console.log("the current users name is ", user.name);
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
              // backgroundColor="red"
              // display={{ base: "flex", md: "none" }}
              // display="flex"
              // justifyContent="start"
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {selectedChat.chatName.toUpperCase()}

            <IconButton icon={<ViewIcon />} />
          </Text>

          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}

            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
              {/* {istyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    // height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )} */}
              {/* <Input
                variant="filled"
                bg="#E0E0E0"
                borderRadius="lg"
                boxShadow="sm"
                border="1px solid #ccc"
                placeholder="Enter a message..."
                value={newMessage}
                onChange={handleTypedMessage}
                _focus={{
                  bg: "#fff",
                  boxShadow: "md",
                  borderColor: "blue.500",
                }}
              /> */}
              <ReactQuill
                theme="snow"
                value={newMessage}
                onChange={handleTypedMessage}
                modules={modules}
                formats={formats}
              />
              {/* <TextEditor value={newMessage} onChange={handleTypedMessage} /> */}
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={3} fontFamily="Work Sans">
            Click on the user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
}

export default SingleChat;

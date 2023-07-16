import { Box, Container, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import React from "react";
import Login from "../components/Login";
import Signup from "../components/Sign-up";

function Home() {
  return (
    <Container maxWidth={"xl"} centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={1}
        bg="white"
        w="100%"
        m="20px 0 10px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="2xl" fontFamily="Victor Mono">
          Chatting-Tom
        </Text>
      </Box>
      <Box
        bg="white"
        w="100%"
        p={4}
        borderRadius="lg"
        borderWidth="1px"
        // opacity={0.8}
      >
        <Tabs isFitted variant="soft-rounded" colorScheme="green">
          <TabList mb="20px">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign-Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Home;

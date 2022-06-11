import { CharacterCardListing } from "../components/CharacterCardListing";
import { Pagination } from "../components/Pagination";
import React from "react";
import io from "socket.io-client";
import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import "./Character.scss";

function App() {
    const socket = io("http://localhost:8999");
    socket.connect();

    socket.on("hello", (message) => {
        console.log(message);
    });

    return (
        <Flex alignItems="center" justifyContent="center" flexDirection={"column"}>
            <Box w="lg" h="max-content" borderRadius={30} bgGradient="linear(to-r, #000428, #004e92)" p={2} m={10}>
                <Container>
                    <Heading as="h1" size="2xl" fontWeight="extrabold" textAlign="center" p={4} textTransform="uppercase">
                        Leaderboard
                    </Heading>
                    <CharacterCardListing />
                </Container>
            </Box>
            <Box w="lg" h="max-content">
                <Pagination />
            </Box>
        </Flex>
    );
}

export default App;

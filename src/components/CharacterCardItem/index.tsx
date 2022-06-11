import { Avatar, Box, Flex, Heading, HStack, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text } from "@chakra-ui/react";
import React from "react";

export const CharacterCard = ({ name }: { name: string }) => {
    return (
        <Box maxW="100%" borderWidth="2px" borderRadius="lg" overflow="hidden">
            <Box p="2">
                <HStack justifyContent="space-between">
                    <Flex gap={2} alignItems="center">
                        <Heading as="h3" size={"lg"}>
                            #1
                        </Heading>
                        <Avatar id={name} name={name} />
                        <Text fontSize="2xl" fontWeight="extrabold">
                            {name}
                        </Text>
                    </Flex>
                    <Box>
                        <Stat>
                            <StatLabel>Score</StatLabel>
                            <StatNumber>45</StatNumber>
                            <StatHelpText>
                                <StatArrow type="decrease" />
                                9.05%
                            </StatHelpText>
                        </Stat>
                    </Box>
                </HStack>
            </Box>
        </Box>
    );
};

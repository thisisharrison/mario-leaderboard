import { Box, Flex, Heading, HStack, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text } from "@chakra-ui/react";
import React from "react";
import type { CharacterInfo } from "../../slice/ranking";

export const CharacterCard = ({ name, score, rank, delta }: CharacterInfo & { rank: number; delta: number }) => {
    const hideDelta = isNaN(delta) || delta === 0;
    return (
        <Box maxW="100%" borderWidth="2px" borderRadius="lg" overflow="hidden">
            <Box p="2">
                <HStack justifyContent="space-between">
                    <Flex gap={2} alignItems="center">
                        <Heading as="h3" size={"lg"}>
                            #{rank}
                        </Heading>
                        <span id={name} className="character-avatar"></span>
                        <Text fontSize="2xl" fontWeight="extrabold">
                            {name}
                        </Text>
                    </Flex>
                    <Box textAlign="right">
                        <Stat>
                            <StatLabel>Score</StatLabel>
                            <StatNumber>{score}</StatNumber>
                            <StatHelpText>
                                {!hideDelta && <StatArrow type={delta > 0 ? "increase" : "decrease"} />}
                                {hideDelta ? "--" : delta.toFixed(2) + "%"}
                            </StatHelpText>
                        </Stat>
                    </Box>
                </HStack>
            </Box>
        </Box>
    );
};

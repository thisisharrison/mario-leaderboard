import { CharacterCard } from "../CharacterCardItem";
import characters from "../../constant/characters.json";
import React from "react";
import { VStack } from "@chakra-ui/react";

export const CharacterCardListing = () => {
    return (
        <VStack spacing={4} align="stretch">
            {characters.map((name) => (
                <CharacterCard key={name.name} {...name} />
            ))}
        </VStack>
    );
};

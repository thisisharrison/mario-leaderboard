import { CharacterCard } from "../CharacterCardItem";
import { selectCurrentPaginatedRanking, selectPreviousPaginatedRanking } from "../../slice/ranking";
import React from "react";
import { VStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

export const CharacterCardListing = () => {
    const characters = useSelector(selectCurrentPaginatedRanking);
    const previous = useSelector(selectPreviousPaginatedRanking);
    const pageIndex = useSelector((state: RootState) => state.pagination.pageIndex);

    return (
        <VStack spacing={4} align="stretch">
            {characters.map((character, index) => {
                const delta = ((character.score - previous[character.id]) / previous[character.id]) * 100;
                return <CharacterCard key={character.id} {...character} rank={index + 1 + pageIndex} delta={delta} />;
            })}
        </VStack>
    );
};

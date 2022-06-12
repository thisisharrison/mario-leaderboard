import { paginationSlice } from "../../slice/pagination";
import { Text, Flex, IconButton, Tooltip } from "@chakra-ui/react";
import { ArrowRightIcon, ArrowLeftIcon, ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";

export const Pagination = () => {
    const dispatch = useDispatch();
    const pageIndex = useSelector((state: RootState) => state.pagination.pageIndex);
    const pageSize = useSelector((state: RootState) => state.pagination.pageSize);
    const pageCount = useSelector((state: RootState) => Math.floor(state.ranking.curr.length / pageSize));
    const totalCharacters = useSelector((state: RootState) => state.ranking.curr.length);

    const canPreviousPage = pageIndex !== 0;

    const canNextPage = pageIndex + pageSize < totalCharacters;

    const previousPage = () => {
        dispatch(paginationSlice.actions.decrement());
    };

    const nextPage = () => {
        dispatch(paginationSlice.actions.increment());
    };

    const gotoPage = (page: number) => {
        dispatch(paginationSlice.actions.gotoPage(page));
    };

    return (
        <Flex justifyContent="space-between" m={4} alignItems="center">
            <Flex>
                <Tooltip label="First Page">
                    <IconButton onClick={() => gotoPage(0)} isDisabled={!canPreviousPage} icon={<ArrowLeftIcon h={3} w={3} />} mr={4} aria-label={""} />
                </Tooltip>
                <Tooltip label="Previous Page">
                    <IconButton onClick={previousPage} isDisabled={!canPreviousPage} icon={<ChevronLeftIcon h={6} w={6} />} aria-label={""} />
                </Tooltip>
            </Flex>
            <Flex alignItems="center">
                <Text flexShrink="0" mr={8}>
                    Page{" "}
                    <Text fontWeight="bold" as="span">
                        {pageIndex / pageSize + 1}
                    </Text>{" "}
                    of{" "}
                    <Text fontWeight="bold" as="span">
                        {Math.floor(totalCharacters / pageSize) + 1}
                    </Text>
                </Text>
            </Flex>
            <Flex>
                <Tooltip label="Next Page">
                    <IconButton onClick={nextPage} isDisabled={!canNextPage} icon={<ChevronRightIcon h={6} w={6} />} aria-label={""} />
                </Tooltip>
                <Tooltip label="Last Page">
                    <IconButton onClick={() => gotoPage(pageCount)} isDisabled={!canNextPage} icon={<ArrowRightIcon h={3} w={3} />} ml={4} aria-label={""} />
                </Tooltip>
            </Flex>
        </Flex>
    );
};

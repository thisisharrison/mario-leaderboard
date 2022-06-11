import { Text, Flex, IconButton, Tooltip } from "@chakra-ui/react";
import { ArrowRightIcon, ArrowLeftIcon, ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import React from "react";
import type { MouseEvent } from "react";

export const Pagination = () => {
    const gotoPage = (page: number) => {
        console.log(page);
    };
    const previousPage = (event: MouseEvent<HTMLButtonElement>) => {
        console.log(event);
    };
    const canPreviousPage = true;
    const canNextPage = true;
    const pageIndex = 0;
    const pageOptions = [10];
    const nextPage = (event: MouseEvent<HTMLButtonElement>) => {
        console.log(event);
    };
    const pageCount = 0;
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
                        {pageIndex + 1}
                    </Text>{" "}
                    of{" "}
                    <Text fontWeight="bold" as="span">
                        {pageOptions.length}
                    </Text>
                </Text>
            </Flex>
            <Flex>
                <Tooltip label="Next Page">
                    <IconButton onClick={nextPage} isDisabled={!canNextPage} icon={<ChevronRightIcon h={6} w={6} />} aria-label={""} />
                </Tooltip>
                <Tooltip label="Last Page">
                    <IconButton onClick={() => gotoPage(pageCount - 1)} isDisabled={!canNextPage} icon={<ArrowRightIcon h={3} w={3} />} ml={4} aria-label={""} />
                </Tooltip>
            </Flex>
        </Flex>
    );
};

import { PageSizeOptions } from "../../slice/pagination";
import { usePagination } from "../../hook/usePagination";
import { Text, Flex, IconButton, Tooltip, Select } from "@chakra-ui/react";
import { ArrowRightIcon, ArrowLeftIcon, ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import React from "react";
import type { PageSizeType } from "../../slice/pagination";

export const Pagination = () => {
    const { canPreviousPage, previousPage, pageIndex, pageSize, totalCharacters, setPageSize, nextPage, canNextPage, gotoPage, pageCount } = usePagination();

    return (
        <Flex justifyContent="space-between" m={4} alignItems="center">
            <Flex>
                <Tooltip label="First Page">
                    <IconButton onClick={() => gotoPage(0)} isDisabled={!canPreviousPage} icon={<ArrowLeftIcon h={3} w={3} color="gray.600" />} mr={4} aria-label={"First Page"} />
                </Tooltip>
                <Tooltip label="Previous Page">
                    <IconButton onClick={previousPage} isDisabled={!canPreviousPage} icon={<ChevronLeftIcon h={6} w={6} color="gray.600" />} aria-label={"Previous Page"} />
                </Tooltip>
            </Flex>
            <Flex alignItems="center">
                <Text flexShrink="0" mr={8}>
                    Page{" "}
                    <Text fontWeight="bold" as="span">
                        {Math.floor(pageIndex / pageSize + 1)}
                    </Text>{" "}
                    of{" "}
                    <Text fontWeight="bold" as="span">
                        {Math.floor(totalCharacters / pageSize) + 1}
                    </Text>
                </Text>
            </Flex>
            <Select
                w={32}
                value={pageSize}
                onChange={(e) => {
                    setPageSize(Number(e.target.value) as PageSizeType);
                }}
            >
                {PageSizeOptions.map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </option>
                ))}
            </Select>
            <Flex>
                <Tooltip label="Next Page">
                    <IconButton onClick={nextPage} isDisabled={!canNextPage} icon={<ChevronRightIcon h={6} w={6} color="gray.600" />} aria-label={"Next Page"} />
                </Tooltip>
                <Tooltip label="Last Page">
                    <IconButton onClick={() => gotoPage(pageCount)} isDisabled={!canNextPage} icon={<ArrowRightIcon h={3} w={3} color="gray.600" />} ml={4} aria-label={"Last Page"} />
                </Tooltip>
            </Flex>
        </Flex>
    );
};

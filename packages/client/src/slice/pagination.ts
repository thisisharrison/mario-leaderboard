import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PaginationState {
    pageIndex: number;
}

const initialState: PaginationState = {
    pageIndex: 0,
};

export const PAGE_SIZE = 10;

export const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        increment: (state) => {
            state.pageIndex += 1;
        },
        decrement: (state) => {
            state.pageIndex -= 1;
        },
        reset: (state) => {
            state.pageIndex = 0;
        },
        last: (state, action: PayloadAction<number>) => {
            state.pageIndex = action.payload;
        },
    },
});

export const selectPagination = createSelector(
    (state: RootState) => ({ ranking: state.ranking.curr, index: state.pagination.pageIndex }),
    ({ ranking, index }) => ({ pageOptions: Math.floor(ranking.length / PAGE_SIZE), pageIndex: index })
);
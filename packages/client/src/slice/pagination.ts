import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PaginationState {
    pageIndex: number;
    pageSize: number;
}

const initialState: PaginationState = {
    pageIndex: 0,
    pageSize: 10,
};

export const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        increment: (state) => {
            state.pageIndex += state.pageSize;
        },
        decrement: (state) => {
            state.pageIndex -= state.pageSize;
        },
        gotoPage: (state, action: PayloadAction<number>) => {
            state.pageIndex = action.payload * state.pageSize;
        },
    },
});

export const selectPagination = createSelector(
    (state: RootState) => ({ ranking: state.ranking.curr, index: state.pagination.pageIndex, pageSize: state.pagination.pageSize }),
    ({ ranking, index, pageSize }) => ({ pageOptions: Math.floor(ranking.length / pageSize), pageIndex: index })
);

import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { PayloadAction } from "@reduxjs/toolkit";

export const PageSizeOptions = [10, 15, 20, 25] as const;
export type PageSizeType = typeof PageSizeOptions[number];

export interface PaginationState {
    pageIndex: number;
    pageSize: PageSizeType;
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
            state.pageIndex = Math.max(state.pageIndex - state.pageSize, 0);
        },
        gotoPage: (state, action: PayloadAction<number>) => {
            state.pageIndex = action.payload * state.pageSize;
        },
        updatePageSize: (state, action: PayloadAction<PageSizeType>) => {
            state.pageSize = action.payload;
        },
    },
});

export const selectPagination = createSelector(
    ({ ranking, pagination }: RootState) => ({ ranking: ranking.curr, index: pagination.pageIndex, pageSize: pagination.pageSize }),
    ({ ranking, index, pageSize }) => ({ pageOptions: Math.floor(ranking.length / pageSize), pageIndex: index })
);

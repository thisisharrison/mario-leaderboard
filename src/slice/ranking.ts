import { PAGE_SIZE } from "./pagination";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface RankingState {
    curr: string[];
    next: string[];
}

const initialState: RankingState = {
    curr: [],
    next: [],
};

export const rankingSlice = createSlice({
    name: "ranking",
    initialState,
    reducers: {
        receiveNewRanking(state, action: PayloadAction<string[]>) {
            state.next = action.payload;
        },
        updateRanking(state: RankingState) {
            state.curr = state.next;
        },
    },
});

export const selectCurrentPaginatedRanking = createSelector(
    (state: RootState) => ({ ranking: state.ranking.curr, index: state.pagination.pageIndex }),
    ({ ranking, index }) => ranking.slice(index, index + PAGE_SIZE)
);

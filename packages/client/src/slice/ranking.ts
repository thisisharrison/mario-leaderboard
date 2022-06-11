import { PAGE_SIZE } from "./pagination";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CharacterInfo {
    id: string;
    name: string;
    score: number;
}

export interface RankingState {
    curr: CharacterInfo[];
    prev: CharacterInfo[];
}

const initialState: RankingState = {
    curr: [],
    prev: [],
};

export const rankingSlice = createSlice({
    name: "ranking",
    initialState,
    reducers: {
        receiveNewRanking(state, action: PayloadAction<CharacterInfo[]>) {
            state.prev = state.curr;
            state.curr = action.payload;
        },
    },
});

export const selectCurrentPaginatedRanking = createSelector(
    (state: RootState) => ({ ranking: state.ranking.curr, index: state.pagination.pageIndex }),
    ({ ranking, index }) => ranking.slice(index, index + PAGE_SIZE)
);

export const selectPreviousPaginatedRanking = createSelector(
    (state: RootState) => ({ ranking: state.ranking.prev }),
    ({ ranking }) => ranking.reduce<Record<string, number>>((acc, cur) => ({ ...acc, [cur.id]: cur.score }), {})
);

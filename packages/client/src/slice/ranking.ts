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
    ({ ranking, pagination }: RootState) => ({ ranking: ranking.curr, index: pagination.pageIndex, pageSize: pagination.pageSize }),
    ({ ranking, index, pageSize }) => ranking.slice(index, index + pageSize > ranking.length ? undefined : index + pageSize)
);

export const selectPreviousPaginatedRanking = createSelector(
    ({ ranking }: RootState) => ({ ranking: ranking.prev }),
    ({ ranking }) => ranking.reduce<Record<string, number>>((acc, cur) => ({ ...acc, [cur.id]: cur.score }), {})
);

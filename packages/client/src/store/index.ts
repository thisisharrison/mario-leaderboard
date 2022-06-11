import { paginationSlice } from "../slice/pagination";
import { rankingSlice } from "../slice/ranking";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        ranking: rankingSlice.reducer,
        pagination: paginationSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

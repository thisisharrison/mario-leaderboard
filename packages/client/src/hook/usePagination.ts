import { paginationSlice } from "../slice/pagination";
import { useDispatch, useSelector } from "react-redux";
import type { PageSizeType } from "../slice/pagination";
import type { RootState } from "../store";

export const usePagination = () => {
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

    const setPageSize = (pageSize: PageSizeType) => {
        dispatch(paginationSlice.actions.updatePageSize(pageSize));
    };

    return { canPreviousPage, previousPage, pageIndex, pageSize, totalCharacters, setPageSize, nextPage, canNextPage, gotoPage, pageCount };
};

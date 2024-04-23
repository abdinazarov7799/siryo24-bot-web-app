import { useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import {request} from "../../services/api/index.js";

const useInfiniteScrollQuery = (key = "infinity-scroll", url = "/", params = {}) => {

    const {
        data,
        fetchNextPage,
        isLoading,
        isError,
        isSuccess,
        isFetchingNextPage,
        hasNextPage,
        error,
        refetch,
    } = useInfiniteQuery(
        key,
        ({ pageParam = 0 }) => request.get(url, { ...params, page: pageParam }),
        {
            getNextPageParam: (lastPage) => {
                if (lastPage.hasNextPage) {
                    return lastPage.page + 1;
                }
                return undefined;
            },
        }
    );

    return {
        data,
        fetchNextPage,
        isLoading,
        isError,
        isSuccess,
        isFetchingNextPage,
        hasNextPage,
        error,
        refetch,
    };
};

export default useInfiniteScrollQuery;

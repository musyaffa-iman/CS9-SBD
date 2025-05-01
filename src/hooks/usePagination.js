import { useState, useCallback, useEffect } from 'react';
import { useApi } from './useApi';

const usePagination = (fetchFunction, options = {}) => {
    const {
        initialPage = 1,
        pageSize = 10,
        initialData = [],
        dependencies = []
    } = options;

    const [page, setPage] = useState(initialPage);
    const [data, setData] = useState(initialData);
    const [hasMore, setHasMore] = useState(true);
    const { execute: fetchData, loading, error } = useApi(fetchFunction);

    const loadPage = useCallback(async (pageNumber) => {
        try {
            const response = await fetchData({
                page: pageNumber,
                pageSize
            });

            if (response.success) {
                const newData = response.payload;
                
                if (pageNumber === 1) {
                    setData(newData);
                } else {
                    setData(prev => [...prev, ...newData]);
                }

                // Check if we've reached the end
                setHasMore(newData.length === pageSize);
            }
        } catch (error) {
            console.error('Error loading page:', error);
        }
    }, [fetchData, pageSize]);

    // Load initial data
    useEffect(() => {
        setPage(initialPage);
        loadPage(initialPage);
    }, [...dependencies]);

    const nextPage = useCallback(() => {
        if (!loading && hasMore) {
            const nextPageNumber = page + 1;
            setPage(nextPageNumber);
            loadPage(nextPageNumber);
        }
    }, [loading, hasMore, page, loadPage]);

    const reset = useCallback(() => {
        setPage(initialPage);
        setData(initialData);
        setHasMore(true);
        loadPage(initialPage);
    }, [initialPage, initialData, loadPage]);

    return {
        data,
        loading,
        error,
        hasMore,
        nextPage,
        reset,
        page
    };
};

export default usePagination;
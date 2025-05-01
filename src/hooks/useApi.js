import { useState, useCallback } from 'react';

const useApi = (apiFunc) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const execute = useCallback(async (...params) => {
        try {
            setLoading(true);
            setError('');
            const response = await apiFunc(...params);
            setData(response);
            return response;
        } catch (error) {
            setError(error.message || 'An error occurred');
            throw error;
        } finally {
            setLoading(false);
        }
    }, [apiFunc]);

    const reset = useCallback(() => {
        setData(null);
        setError('');
        setLoading(false);
    }, []);

    return {
        data,
        loading,
        error,
        execute,
        reset,
    };
};

export default useApi;
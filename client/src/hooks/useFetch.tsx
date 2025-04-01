import { useState, useEffect, useCallback } from "react";

const useFetch = (url: string, method: string, body?: any) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshIndex, setRefreshIndex] = useState(0);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            
            const options: RequestInit = {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            };

            if (method !== "GET" && body !== undefined && body !== null) {
                options.body = JSON.stringify(body);
            }

            const response = await fetch(`http://localhost:3001/api/v1/${url}`, options);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            setData(result);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    }, [url, method, body, refreshIndex]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const refresh = () => setRefreshIndex(prev => prev + 1);

    return { data, loading, error, refresh };
};

export default useFetch;

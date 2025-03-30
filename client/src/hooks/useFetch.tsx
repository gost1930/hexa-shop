import { useState, useEffect } from "react";

const useFetch = (url: string, method: string, body?: any) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
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
        };

        fetchData();
    }, [url, method, body]); 

    return { data, loading, error };
};

export default useFetch;

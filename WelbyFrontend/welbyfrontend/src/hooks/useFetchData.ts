// still needs more testing
import { useEffect, useState } from 'react';
import axios from 'axios';

type FetchDataOptions = {
    url: string;
    params?: object;
};

export function useFetchData<T>(options: FetchDataOptions) {
    const { url, params } = options;
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    params,
                });
                setData(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching data.');
                setLoading(false);
            }
        };

        fetchData();
    }, [url, params]);

    return { data, loading, error };
}
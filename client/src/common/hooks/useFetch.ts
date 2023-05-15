import { useEffect, useState } from 'react';

const useFetch = <T>(fetcher: (args?: any) => Promise<any>) => {
	const [error, setError] = useState<null | Error>(null);
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetcher()
      .then((data: T) => {
        setError(null);
        setData(data);
      })
      .catch((error: Error) => setError(error))
      .finally(() => setLoading(false));
  }, [fetcher]);

  return {
    loading,
    setLoading,
    error,
    data,
  };
};

export default useFetch;

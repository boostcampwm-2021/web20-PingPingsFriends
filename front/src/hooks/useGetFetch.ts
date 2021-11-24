import { useEffect, useState } from 'react';

const useGetFetch = <T>(URL: string) => {
  const [state, setState] = useState<T>();

  useEffect(() => {
    getFetch();

    async function getFetch() {
      const response = await fetch(URL);
      const data: T = await response.json();
      setState(data);
    }
  }, []);

  return state;
};

export default useGetFetch;

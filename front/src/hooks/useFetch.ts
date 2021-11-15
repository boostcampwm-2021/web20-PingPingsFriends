import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const useFetch = <T>(URL: string, depsArr: any[]): [T[], Dispatch<SetStateAction<T[]>>] => {
  const [state, setState] = useState<T[]>([]);

  const fetchData = async () => {
    try {
      const response: Response = await fetch(URL);
      const data = await response.json();
      setState([...state, ...data]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log('s');
    fetchData();
  }, depsArr);

  return [state, setState];
};

export default useFetch;

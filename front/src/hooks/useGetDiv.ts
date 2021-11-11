import { useCallback, useState } from 'react';

type GetFeed = [Element, (node: HTMLDivElement) => void];

export const useGetDiv = (): GetFeed => {
  const [feed, setFeed] = useState({} as Element);

  const ref = useCallback((node: HTMLDivElement): void => {
    if (node !== null) {
      setFeed(node);
    }
  }, []);

  return [feed, ref];
};

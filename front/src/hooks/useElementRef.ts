import { useCallback, useState } from 'react';

type GetFeed = [Element, (node: HTMLDivElement) => void];

export const useElementRef = (): GetFeed => {
  const [div, setDiv] = useState<Element | null>(null);

  const ref = useCallback((node: HTMLDivElement): void => {
    if (node !== null) {
      setDiv(node);
    }
  }, []);

  return [div!, ref];
};

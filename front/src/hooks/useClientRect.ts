import { useCallback, useState } from 'react';

type ClientRect = [rectType, (node: HTMLDivElement) => void];

export interface rectType {
  width: number;
  height: number;
}

export const useClientRect = (): ClientRect => {
  const [rect, setWidth] = useState({
    width: 0,
    height: 0,
  });

  const ref = useCallback((node: HTMLDivElement): void => {
    if (node !== null) {
      requestAnimationFrame(() => {
        setWidth({ width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height });
      });
    }
  }, []);

  return [rect, ref];
};

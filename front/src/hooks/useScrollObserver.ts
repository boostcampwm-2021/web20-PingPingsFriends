import { useElementRef } from '@hooks/useElementRef';
import { useEffect } from 'react';
type CustomIntersectionObserverType = (callback: IntersectionObserverCallback, options?: IntersectionObserverInit) => (node: HTMLDivElement) => void;

const useScrollObserver: CustomIntersectionObserverType = (callback, options) => {
  const [observedElement, observedRef] = useElementRef();

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    if (observedElement) {
      observer.observe(observedElement);
    }

    return () => observer.disconnect();
  }, [callback, observedElement]);

  return observedRef;
};

export default useScrollObserver;

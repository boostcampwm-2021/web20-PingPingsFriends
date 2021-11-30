import { useEffect, useState } from 'react';

const useDebounce = (value: string, ms: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, ms);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return debouncedValue;
};

export default useDebounce;

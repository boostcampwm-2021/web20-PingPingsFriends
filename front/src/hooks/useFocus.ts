import { useLayoutEffect, useRef } from 'react';

const useFocus = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if (inputRef.current !== null) inputRef.current.focus();
  }, []);

  return inputRef;
};

export default useFocus;

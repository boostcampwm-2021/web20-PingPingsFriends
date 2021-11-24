import { useState } from 'react';

const useThrottle = (ms = 300) => {
  const [throttle, setThrottle] = useState(false);

  return (callback: any) => {
    if (throttle) {
      return;
    }

    setThrottle(true);
    setTimeout(() => {
      callback();
      setThrottle(false);
    }, ms);
  };
};

export default useThrottle;

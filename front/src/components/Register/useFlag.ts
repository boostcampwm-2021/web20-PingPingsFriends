import { useEffect, useState } from 'react';

const useFlag = (imageURL: string) => {
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (imageURL) {
      setFlag(true);
      return;
    }
    setFlag(false);
  }, [imageURL]);

  return flag;
};

export default useFlag;

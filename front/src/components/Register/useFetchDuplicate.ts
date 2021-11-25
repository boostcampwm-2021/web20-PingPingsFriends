import { useState } from 'react';

type UseFetchDuplicate = (path: string) => [boolean, (arg: string) => Promise<void>];

const useFetchDuplicate: UseFetchDuplicate = (path: string) => {
  const [isDuplicate, setIsDuplicate] = useState(false);

  const handleCheckUsername = async (value: string) => {
    const response: Response = await fetch(`/api/users/isDuplicated?${path}=${value}`);
    const result = await response.json();
    setIsDuplicate(result);
  };

  return [isDuplicate, handleCheckUsername];
};

export default useFetchDuplicate;

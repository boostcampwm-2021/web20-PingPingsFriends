import { useState } from 'react';

type UseFetchVerification = (path: string) => [boolean, (arg: string) => Promise<void>];

const useFetchDuplicate: UseFetchVerification = (path: string) => {
  const [isDuplicate, setIsDuplicate] = useState(false);

  const handleCheckUsername = async (value: string) => {
    const response: Response = await fetch(`/api/users/verification?${path}=${value}`);
    const result = await response.json();
    setIsDuplicate(result);
  };

  return [isDuplicate, handleCheckUsername];
};

export default useFetchDuplicate;

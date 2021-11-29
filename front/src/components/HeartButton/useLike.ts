import { useState } from 'react';
import { getAuthOption } from '@lib/utils/fetch';
import { useUserState } from '@src/contexts/UserContext';

export interface LikeProps {
  like: boolean;
  toggleLike: any;
}

export type UseLikeType = (isHeartString: 0 | 1, feedId: number) => [like: boolean, toggleLike: () => void];

export const useLike: UseLikeType = (isHeartString, feedId) => {
  const isHeart = isHeartString !== 0;
  const [like, setLike] = useState(isHeart);
  const userState = useUserState();

  const toggleLike = () => {
    if (like) {
      setLike(false);
      fetch(`/api/hearts/${feedId}`, getAuthOption('DELETE', userState.data?.accessToken));
      return;
    }
    setLike(true);
    fetch(`/api/hearts/${feedId}`, getAuthOption('POST', userState.data?.accessToken));
  };

  return [like, toggleLike];
};

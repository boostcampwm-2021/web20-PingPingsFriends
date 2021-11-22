import { useState } from 'react';
import Config from '@lib/constants/config';

export interface LikeProps {
  like: boolean;
  toggleLike: () => void;
}

export type UseLikeType = (isHeartString: string, feedId: number) => [like: boolean, toggleLike: () => void];

export const useLike: UseLikeType = (isHeartString, feedId) => {
  const isHeart = isHeartString !== '0';
  const [like, setLike] = useState(isHeart);

  const toggleLike = () => {
    if (like) {
      setLike(false);
      fetch(`${Config.BACK_HOST}/api/hearts/${feedId}`, {
        method: 'POST',
      });
      return;
    }
    setLike(true);
    fetch(`${Config.BACK_HOST}/api/hearts/${feedId}`, {
      method: 'DELETE',
    });
  };

  return [like, toggleLike];
};

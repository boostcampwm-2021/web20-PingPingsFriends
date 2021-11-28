import { useState } from 'react';

export interface LikeProps {
  like: boolean;
  toggleLike: any;
}

export type UseLikeType = (isHeartString: 0 | 1, feedId: number) => [like: boolean, toggleLike: () => void];

export const useLike: UseLikeType = (isHeartString, feedId) => {
  const isHeart = isHeartString !== 0;
  const [like, setLike] = useState(isHeart);

  const toggleLike = () => {
    if (like) {
      setLike(false);
      fetch(`/api/hearts/${feedId}`, {
        method: 'DELETE',
      });
      return;
    }
    setLike(true);
    fetch(`/api/hearts/${feedId}`, {
      method: 'POST',
    });
  };

  return [like, toggleLike];
};

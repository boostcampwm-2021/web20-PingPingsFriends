import { useState } from 'react';

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
      fetch(`/api/hearts/${feedId}`, {
        method: 'POST',
      });
      return;
    }
    setLike(true);
    fetch(`/api/hearts/${feedId}`, {
      method: 'DELETE',
    });
  };

  return [like, toggleLike];
};

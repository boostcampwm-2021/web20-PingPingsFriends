import { useState } from 'react';

export interface LikeProps {
  like: boolean;
  toggleLike: () => void;
}

export const useLike = (): [boolean, () => void] => {
  const [like, setLike] = useState(false);

  const toggleLike = () => {
    setLike(!like);
    //todo: 여기서 서버에 요청
  };

  return [like, toggleLike];
};

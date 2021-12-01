import { Dispatch, SetStateAction, useState } from 'react';
import { getAuthOption, fetchAPI } from '@lib/utils/fetch';
import { useUserState } from '@src/contexts/UserContext';
import { Posts } from '@src/types/Post';

export interface LikeProps {
  like: boolean;
  toggleLike: any;
}

export type UseLikeType = (
  isHeartString: 0 | 1,
  feedId: number,
  setTotalPosts?: Dispatch<SetStateAction<Posts>> | undefined,
  setFeeds?: Dispatch<SetStateAction<Posts>> | undefined
) => [like: boolean, toggleLike: () => void];

export const useLike: UseLikeType = (isHeartString, feedId) => {
  const isHeart = isHeartString !== 0;
  const [like, setLike] = useState(isHeart);
  const userState = useUserState();

  const toggleLike = async () => {
    await fetchAPI(
      `/api/hearts/${feedId}`,
      (okRes) => {
        setLike(!like);
      },
      (failRes) => {},
      (err) => {},
      getAuthOption(like ? 'DELETE' : 'POST', userState.data?.accessToken)
    );
  };

  return [like, toggleLike];
};

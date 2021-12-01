import { Dispatch, SetStateAction, useState } from 'react';
import { getAuthOption, fetchAPI } from '@lib/utils/fetch';
import { useUserState } from '@src/contexts/UserContext';
import { Posts } from '@src/types/Post';
import { useScrollDispatch } from '@src/contexts/ScrollContext';

export interface LikeProps {
  like: boolean;
  toggleLike: any;
}

export type UseLikeType = (
  isHeartString: 0 | 1,
  feedId: number,
  setTotalPosts?: Dispatch<SetStateAction<Posts>> | undefined,
  setFeeds?: Dispatch<SetStateAction<Posts>> | undefined
) => [like: boolean, toggleLike: () => void, syncNumberOfHeart: number | null];

export const useLike: UseLikeType = (isHeartString, feedId) => {
  const isHeart = isHeartString !== 0;
  const [like, setLike] = useState(isHeart);
  const [syncNumberOfHeart, setSyncNumberOfHeart] = useState<number | null>(null);
  const userState = useUserState();
  const scrollDispatch = useScrollDispatch();

  const toggleLike = async () => {
    await fetchAPI(
      `/api/hearts/${feedId}`,
      async (okRes) => {
        setSyncNumberOfHeart(await okRes.json());
        setLike(!like);
        scrollDispatch({ type: 'UPDATE_FEED', nextLike: { feedId, like: !like ? 1 : 0 } });
      },
      (failRes) => {},
      (err) => {},
      getAuthOption(like ? 'DELETE' : 'POST', userState.data?.accessToken)
    );
  };

  return [like, toggleLike, syncNumberOfHeart];
};

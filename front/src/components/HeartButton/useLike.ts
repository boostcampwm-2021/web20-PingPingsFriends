import { Dispatch, SetStateAction, useState } from 'react';
import { getAuthOption } from '@lib/utils/fetch';
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

export const useLike: UseLikeType = (isHeartString, feedId, setTotalPosts, setFeeds) => {
  const isHeart = isHeartString !== 0;
  const [like, setLike] = useState(isHeart);
  const userState = useUserState();

  const toggleLike = async () => {
    if (like) {
      await fetch(`/api/hearts/${feedId}`, getAuthOption('DELETE', userState.data?.accessToken));

      setLike(false);
      if (setTotalPosts) {
        setTotalPosts((posts) =>
          posts.map((post) => {
            if (post.post_id === feedId) {
              return { ...post, is_heart: 0 };
            }
            return post;
          })
        );
      }
      if (setFeeds) {
        setFeeds((feeds) =>
          feeds.map((feed) => {
            if (feed.post_id === feedId) {
              return { ...feed, is_heart: 0 };
            }
            return feed;
          })
        );
      }

      return;
    }
    await fetch(`/api/hearts/${feedId}`, getAuthOption('POST', userState.data?.accessToken));

    setLike(true);
    if (setTotalPosts) {
      setTotalPosts((posts) =>
        posts.map((post) => {
          if (post.post_id === feedId) {
            return { ...post, is_heart: 1 };
          }
          return post;
        })
      );
    }
    if (setFeeds) {
      setFeeds((feeds) =>
        feeds.map((feed) => {
          if (feed.post_id === feedId) {
            console.log(feed);
            return { ...feed, is_heart: 1 };
          }
          return feed;
        })
      );
    }
    return;
  };

  return [like, toggleLike];
};

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Posts, PostsResponse } from '@src/types/Post';
import { getAuthOption } from '@lib/utils/fetch';
import { useUserState } from '@src/contexts/UserContext';

const useFetchTotalFeeds = (curHabitatId: number | undefined): [Posts, Dispatch<SetStateAction<number | null>>, Dispatch<SetStateAction<Posts>>] => {
  const [feeds, setFeeds] = useState<Posts>([] as Posts);
  const [lastFeedId, setLastFeedId] = useState<number | null>(null);
  const [totalFeed, setTotalFeed] = useState<Posts>([] as Posts);
  const userState = useUserState();

  useEffect(() => {
    setTotalFeed([]);
    setLastFeedId(null);
  }, [curHabitatId]);

  useEffect(() => {
    if (curHabitatId === undefined) return;
    fetchData();

    async function fetchData() {
      try {
        const response: Response = await fetch(`/api/posts/habitats/${curHabitatId}${lastFeedId ? `?lastPostId=${lastFeedId}` : ''}`, getAuthOption('GET', userState.data?.accessToken));
        const data: PostsResponse = await response.json();

        if (!data.posts.length) {
          setFeeds([]);
          return;
        }
        data.posts.forEach((v) => {
          console.log(v.is_heart);
        });

        const postsData = data.posts.map((post) => ({ ...post, contents_url_array: post.post_contents_urls.split(',').map((url) => url.replace('.webp', '-feed.webp')) }));

        setFeeds(postsData);
      } catch (e) {
        console.log(e);
      }
    }
  }, [lastFeedId, curHabitatId]);

  useEffect(() => {
    setTotalFeed([...totalFeed, ...feeds]);
  }, [feeds]);

  return [totalFeed, setLastFeedId, setTotalFeed];
};

export default useFetchTotalFeeds;

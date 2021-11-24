import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Posts, PostsResponse } from '@src/types/Post';

const useFetchTotalFeeds = (curHabitatId: number): [Posts, Dispatch<SetStateAction<number | null>>] => {
  const [feeds, setFeeds] = useState<Posts>([] as Posts);
  const [lastFeedId, setLastFeedId] = useState<number | null>(null);
  const [totalFeed, setTotalFeed] = useState<Posts>([] as Posts);

  useEffect(() => {
    setTotalFeed([]);
    setLastFeedId(null);
  }, [curHabitatId]);

  useEffect(() => {
    fetchData();

    async function fetchData() {
      try {
        const response: Response = await fetch(`/api/posts/habitats/${curHabitatId}${lastFeedId ? `?lastPostId=${lastFeedId}` : ''}`);
        const data: PostsResponse = await response.json();

        if (!data.posts.length) {
          setFeeds([]);
          return;
        }

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

  return [totalFeed, setLastFeedId];
};

export default useFetchTotalFeeds;

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
        // post에 이미지가 null인 경우가 존재해서 임시로 아래의 로직 사용 중
        // const postsData = data.posts.map((post) => ({ ...post, contents_url_array: post.post_contents_urls.split(',') }));
        const postsData = data.posts.map((post) => ({ ...post, contents_url_array: post.post_contents_urls ? post.post_contents_urls.split(',') : ['/default_avatar.png'] }));
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

import { useEffect, useState } from 'react';
import { Post, Posts } from '@src/types/Post';
import { useLocation } from 'react-router-dom';

const useDetailFeed = (feeds: Posts) => {
  const [detail, setDetail] = useState<Post | null>(null);
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;
    if (!pathname.includes('detail')) {
      setDetail(null);
      return;
    }
    const id = +pathname
      .split('/')
      .filter((str) => str)
      .reverse()[0];

    const targetFeed = feeds.find(({ post_id }) => post_id === id);
    if (targetFeed) setDetail(targetFeed);
    else getFeed(id);

    async function getFeed(id: number) {
      const response: Response = await fetch(`/api/posts/${id}`);
      const detailFeed: Post = await response.json();
      detailFeed.contents_url_array = detailFeed.post_contents_urls.split(',').map((url) => url.replace('.webp', '-feed.webp'));
      setDetail(detailFeed);
      return detailFeed;
    }
  }, [location]);

  return detail;
};

export default useDetailFeed;

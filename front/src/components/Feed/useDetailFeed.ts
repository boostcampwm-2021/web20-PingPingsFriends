import { useEffect, useState } from 'react';
import { Post, Posts } from '@src/types/Post';
import { useLocation } from 'react-router-dom';
import { getAuthOption, fetchAPI } from '@lib/utils/fetch';
import { useUserState } from '@src/contexts/UserContext';

const useDetailFeed = (feeds: Posts) => {
  const [detail, setDetail] = useState<Post | null>(null);
  const userState = useUserState();
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
    else
      fetchAPI(
        `/api/posts/${id}`,
        async (okRes) => {
          const detailFeed: Post = await okRes.json();
          detailFeed.contents_url_array = detailFeed.post_contents_urls.split(',').map((url) => url.replace('.webp', '-feed.webp'));
          setDetail(detailFeed);
        },
        (failRes) => {},
        (err) => {},
        getAuthOption('GET', userState.data?.accessToken)
      );
  }, [location]);

  return detail;
};

export default useDetailFeed;

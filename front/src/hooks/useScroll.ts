import React, { useEffect, useState } from 'react';
import makeThrottle from '@lib/utils/makeThrottle';
import { fetchPost, useScrollDispatch, useScrollState } from '@src/contexts/ScrollContext';
import { useUserState } from '@src/contexts/UserContext';

const useScroll: any = (curHabitatId: number) => {
  const dispatch = useScrollDispatch();
  const scrollState = useScrollState();
  const { data: userData } = useUserState();
  const throttleScroll = makeThrottle(350);
  const [wait, setWait] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as Element;

    throttleScroll(() => {
      dispatch({ type: 'CHANGE_SCROLL', payload: { scrollTop: target.scrollTop } });
    });
  };
  useEffect(() => {
    if (curHabitatId === undefined) {
      return;
    }
    dispatch({ type: 'RESET_FEEDS' });

    dispatchPostFetch();

    async function dispatchPostFetch() {
      const payload = await fetchPost(curHabitatId, undefined, userData?.accessToken);
      dispatch({ type: 'FETCH_POSTS', payload });
    }
  }, [curHabitatId]);

  useEffect(() => {
    const { feeds, totalFeeds } = scrollState;
    if (!(feeds.length && totalFeeds.length)) {
      return;
    }
    if (!wait) {
      dispatchPostFetch();
    }

    async function dispatchPostFetch() {
      setWait(true);
      if (feeds[feeds.length - 1].post_id === totalFeeds[totalFeeds.length - 1].post_id) {
        const payload = await fetchPost(curHabitatId, feeds[feeds.length - 1].post_id, userData?.accessToken);
        dispatch({ type: 'FETCH_POSTS', payload });
        setWait(false);
      }
      setWait(false);
    }
  }, [scrollState.feeds, scrollState.totalFeeds]);

  return { handleScroll };
};

export default useScroll;

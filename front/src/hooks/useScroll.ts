import React, { useEffect } from 'react';
import makeThrottle from '@lib/utils/makeThrottle';
import { fetchPost, useScrollDispatch, useScrollState } from '@src/contexts/ScrollContext';
import { useUserState } from '@src/contexts/UserContext';

const useScroll: any = (curHabitatId: number) => {
  const dispatch = useScrollDispatch();
  const scrollState = useScrollState();
  const { data: userData } = useUserState();
  const throttleScroll = makeThrottle(350);

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
      await dispatch(await fetchPost(curHabitatId, undefined, userData?.accessToken));
    }
  }, [curHabitatId]);

  useEffect(() => {
    const { feeds, totalFeeds } = scrollState;
    if (!(feeds.length && totalFeeds.length)) {
      return;
    }
    dispatchPostFetch();

    async function dispatchPostFetch() {
      if (feeds[feeds.length - 1].post_id === totalFeeds[totalFeeds.length - 1].post_id) {
        await dispatch(await fetchPost(curHabitatId, feeds[feeds.length - 1].post_id, userData?.accessToken));
      }
    }
  }, [scrollState.feeds, scrollState.totalFeeds]);

  return { handleScroll };
};

export default useScroll;

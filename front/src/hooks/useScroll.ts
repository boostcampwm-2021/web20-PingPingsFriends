import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Posts } from '@src/types/Post';
import useFetchTotalFeeds from '@hooks/useFetchTotalFeeds';
import makeThrottle from '@lib/utils/makeThrottle';

type UseScrollType = (curHabitatId: number) => {
  offset: number;
  height: number;
  feeds: Posts;
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  setTotalPosts: Dispatch<SetStateAction<Posts>>;
  setFeeds: Dispatch<SetStateAction<Posts>>;
};

const ITEM_HEIGHT = 650;
const FIX_FEED = 5;

const useScroll: UseScrollType = (curHabitatId: number) => {
  const throttleScroll = makeThrottle(350);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as Element;

    throttleScroll(() => {
      setScroll((state) => ({ ...state, top: target.scrollTop }));
    });
  };

  const [startIndex, setStartIndex] = useState(0);
  const [feeds, setFeeds] = useState<Posts>([]);
  const [scroll, setScroll] = useState({
    top: 0,
    offset: 0,
    height: 0,
  });
  const [totalPosts, setLastFeedId, setTotalPosts] = useFetchTotalFeeds(curHabitatId);
  const { top, offset, height } = scroll;

  useEffect(() => {
    setScroll({ top: 0, offset: 0, height: 0 });
  }, [curHabitatId]);

  useEffect(() => {
    const startIndex = Math.floor(top / ITEM_HEIGHT);

    setScroll({ ...scroll, height: totalPosts.length * ITEM_HEIGHT });
    const nextFeeds = totalPosts.slice(startIndex, startIndex + FIX_FEED);

    setFeeds(nextFeeds);
  }, [totalPosts]);

  useEffect(() => {
    setStartIndex(Math.floor(top / ITEM_HEIGHT));
  }, [top]);

  useEffect(() => {
    const nextOffset = startIndex * ITEM_HEIGHT;
    setFeeds(totalPosts.slice(startIndex, startIndex + FIX_FEED));

    setScroll({
      ...scroll,
      offset: nextOffset < 0 ? 0 : nextOffset,
    });
  }, [startIndex]);

  useEffect(() => {
    if (!(feeds.length && totalPosts.length)) {
      return;
    }
    if (feeds[feeds.length - 1].post_id === totalPosts[totalPosts.length - 1].post_id) {
      setLastFeedId(feeds[feeds.length - 1].post_id);
    }
  }, [feeds]);

  return { feeds, offset, height, handleScroll, setTotalPosts, setFeeds };
};

export default useScroll;

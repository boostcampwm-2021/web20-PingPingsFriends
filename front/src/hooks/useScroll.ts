import React, { useEffect, useState } from 'react';
import { Posts } from '@src/types/Post';
import useFetchTotalFeeds from '@hooks/useFetchTotalFeeds';

type UseScrollType = (curHabitatId: number) => {
  offset: number;
  height: number;
  feeds: Posts;
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
};

const ITEM_HEIGHT = 650;
const FIX_FEED = 5;
const PAD_NUMBER = 2;

const useScroll: UseScrollType = (curHabitatId: number) => {
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as Element;
    setScroll({ ...scroll, top: target.scrollTop });
  };
  const [startIndex, setStartIndex] = useState(0);
  const [feeds, setFeeds] = useState<Posts>([]);
  const [scroll, setScroll] = useState({
    top: 0,
    offset: 0,
    height: 0,
  });

  const [totalPosts, setLastFeedId] = useFetchTotalFeeds(curHabitatId);
  const { top, offset, height } = scroll;

  useEffect(() => {
    const startIndex = Math.floor(top / ITEM_HEIGHT);

    setScroll({ ...scroll, height: totalPosts.length * ITEM_HEIGHT });

    const nextFeeds = totalPosts.slice(startIndex, startIndex + FIX_FEED);

    setFeeds(nextFeeds);
  }, [totalPosts]);

  useEffect(() => {
    if (top + ITEM_HEIGHT * PAD_NUMBER >= height && feeds.length > 0) {
      setLastFeedId(feeds[feeds.length - 1].post_id);
      return;
    }

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

  return { feeds, offset, height, handleScroll };
};

export default useScroll;

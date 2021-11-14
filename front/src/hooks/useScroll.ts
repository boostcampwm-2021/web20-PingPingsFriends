import React, { useEffect, useState } from 'react';
import { Unsplash } from '@components/Feed/FeedContainer';
import { FeedProps } from '@components/Feed/Feed';
import useFetch from '@hooks/useFetch';

type UseScrollType = () => {
  offset: number;
  height: number;
  feeds: any[];
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
};

const ITEM_HEIGHT = 650;
const PER_PAGE = 10;
const FIX_FEED = 5;
const PAD_NUMBER = 2;
const ACCESS_TOKEN = `Hl6SQlzsn3yn4aDN6Q5nDsLLWczZWb0-seXlNQ3TZHs`;

const useScroll: UseScrollType = () => {
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as Element;
    setScroll({ ...scroll, top: target.scrollTop });
  };
  const [startIndex, setStartIndex] = useState(0);
  const [feeds, setFeeds] = useState<FeedProps[]>([]);
  const [scroll, setScroll] = useState({
    top: 0,
    offset: 0,
    height: 0,
  });
  const [pageNumber, setPageNumber] = useState(1);
  const [data] = useFetch<Unsplash>(`https://api.unsplash.com/photos?client_id=${ACCESS_TOKEN}&page=${pageNumber}&per_page=${PER_PAGE}`, [pageNumber]);
  const { top, offset, height } = scroll;

  useEffect(() => {
    const startIndex = Math.floor(top / ITEM_HEIGHT);

    setScroll({ ...scroll, height: data.length * ITEM_HEIGHT });

    // todo: 백 API완성시 바꿔야함
    const nextFeeds: FeedProps[] = data.slice(startIndex, startIndex + FIX_FEED).map((data) => ({
      id: data.id,
      nickname: data.user.username,
      imageURLs: [data.urls.small],
      text: data.description,
    }));

    setFeeds(nextFeeds);
  }, [data]);

  useEffect(() => {
    if (top + ITEM_HEIGHT * PAD_NUMBER >= height) {
      setPageNumber(pageNumber + 1);
      return;
      //todo: 마지막 노드일때
      // setData([...data, ...(await useFetch<MockData>(data[data.length-1]])));
      // return;
    }

    setStartIndex(Math.floor(top / ITEM_HEIGHT));
  }, [top]);

  useEffect(() => {
    const nextOffset = startIndex * ITEM_HEIGHT;

    setFeeds(
      data.slice(startIndex, startIndex + FIX_FEED).map((data) => ({
        id: data.id,
        nickname: data.user.username,
        imageURLs: [data.urls.small],
        text: data.description,
      }))
    );

    setScroll({
      ...scroll,
      offset: nextOffset < 0 ? 0 : nextOffset,
    });
  }, [startIndex]);

  return { feeds, offset, height, handleScroll };
};

export default useScroll;

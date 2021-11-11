import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Feed, { FeedProps } from './Feed';
import { HabitatInfo } from '../../hooks/useHabitatInfo';
import { flexBox } from '../../lib/styles/mixin';
import { Palette } from '../../lib/styles/Palette';
import { useGetDiv } from '../../hooks/useGetDiv';

const ScrollableDiv = styled.div<Partial<HabitatInfo>>`
  ${flexBox(null, null, 'column')};
  width: 500px;
  background-color: ${(props) => (props.color !== undefined ? props.color : Palette.PINK)};
  transition: background-color 0.5s ease-out 0s;
  height: 100%;
  margin: auto;
  padding: 10px 10px 10px 10px;
  box-sizing: border-box;
  gap: 20px;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;
const ACCESS_TOKEN = `Hl6SQlzsn3yn4aDN6Q5nDsLLWczZWb0-seXlNQ3TZHs`;
const PER_PAGE = 8;

export interface Unsplash {
  id: string;
  created_at: string;
  urls: {
    raw: string;
    regular: string;
    full: string;
    thumb: string;
    small: string;
  };
  description: string;
  user: {
    username: string;
    profile_image: {
      small: string;
    };
  };
}

interface FeedScrollBoxProps {
  habitatInfo: HabitatInfo | undefined;
}

const FeedScrollBox = ({ habitatInfo }: FeedScrollBoxProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [lastFeed, ref] = useGetDiv();

  const [feeds, setFeeds] = useState<FeedProps[]>([] as FeedProps[]);

  const [pageNumber, setPageNumber] = useState(1);

  const fetchAPI = async () => {
    const response: Response = await fetch(`https://api.unsplash.com/photos?client_id=${ACCESS_TOKEN}&page=${pageNumber}&per_page=${PER_PAGE}`);
    const data: Unsplash[] = await response.json();

    const nextFeeds: FeedProps[] = data.map((data) => ({
      id: data.id,
      nickname: data.user.username,
      imageURLs: [data.urls.raw, data.urls.raw, data.urls.raw, data.urls.raw],
      text: data.description,
    }));

    setFeeds([...feeds, ...nextFeeds]);
  };

  useEffect(() => {
    fetchAPI();
  }, [pageNumber]);

  useEffect(() => {
    if ('id' in lastFeed) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setPageNumber(pageNumber + 1);
            observer.unobserve(lastFeed);
          }
        },
        {
          rootMargin: '200px 0px',
        }
      );
      observer.observe(lastFeed);
    }
  }, [lastFeed]);

  return (
    <ScrollableDiv color={habitatInfo?.color} ref={scrollRef}>
      {feeds
        ? feeds.map((feed, index) => {
            return feeds.length - 1 === index ? (
              <Feed key={feed.id} nickname={feed.nickname} imageURLs={feed.imageURLs} text={feed.text} lastFeed={ref} scrollRef={scrollRef} />
            ) : (
              <Feed key={feed.id} nickname={feed.nickname} imageURLs={feed.imageURLs} text={feed.text} scrollRef={scrollRef} />
            );
          })
        : null}
    </ScrollableDiv>
  );
};

export default FeedScrollBox;

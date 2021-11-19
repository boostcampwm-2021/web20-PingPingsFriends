import React from 'react';
import styled from 'styled-components';
import Feed from './Feed';
import { HabitatInfo } from '@src/types/Habitat';
import { flexBox, prettyScroll } from '@lib/styles/mixin';
import { Palette } from '@lib/styles/Palette';
import useScroll from '@hooks/useScroll';
import ScrollContainer from '@components/Feed/ScrollBoxContainer';
import ViewPort from '@components/Feed/ViewPort';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import { useGetDiv } from '@hooks/useGetDiv';

const FeedContainerDiv = styled.div<Partial<HabitatInfo>>`
  ${flexBox(null, null, 'column')};
  ${prettyScroll()};
  width: 500px;
  background-color: ${(props) => (props.color !== undefined ? props.color : Palette.PINK)};
  transition: background-color 0.5s ease-out 0s;
  height: 100%;
  margin: auto;
  padding: 10px 10px 10px 10px;
  box-sizing: border-box;
  gap: 20px;
  overflow-y: scroll;
  z-index: 1;
`;

interface FeedScrollBoxProps {
  habitatInfo: HabitatInfo | undefined;
  curHabitatId: number;
}

const callback: IntersectionObserverCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const target = entry.target.firstChild as HTMLImageElement;
      target.src = target.dataset.src as string;
      observer.unobserve(target);
    }
  });
};

const FeedContainer = ({ habitatInfo, curHabitatId }: FeedScrollBoxProps) => {
  const { feeds, offset, height, handleScroll } = useScroll(curHabitatId);
  const [root, rootRef] = useGetDiv();
  const lazy = useIntersectionObserver(callback, {
    root: root,
    rootMargin: '300px 0px',
  });
  return (
    <FeedContainerDiv color={habitatInfo?.habitat.color} onScroll={handleScroll} ref={rootRef}>
      <ScrollContainer height={height}>
        <ViewPort offset={offset}>
          {feeds.map((feed) => (
            <Feed
              key={feed.post_id}
              feedId={feed.user_id}
              nickname={feed.nickname}
              imageURLs={feed.contents_url_array}
              text={feed.human_content}
              createdTime={feed.created_at}
              numOfHearts={feed.numOfHearts}
              is_heart={feed.is_heart}
              lazy={lazy}
            />
          ))}
        </ViewPort>
      </ScrollContainer>
    </FeedContainerDiv>
  );
};

export default FeedContainer;

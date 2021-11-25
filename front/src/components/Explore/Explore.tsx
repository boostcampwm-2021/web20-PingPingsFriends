import React, { useRef, useState } from 'react';
import { HabitatInfo } from '@src/types/Habitat';
import styled from 'styled-components';
import { Palette } from '@lib/styles/Palette';
import useFetchTotalFeeds from '@hooks/useFetchTotalFeeds';
import Cell from './Cell';
import { prettyScroll } from '@src/lib/styles/mixin';

const Explore = ({ habitatInfo }: { habitatInfo: HabitatInfo | undefined | null }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [totalFeed, setLastFeedId] = useFetchTotalFeeds(habitatInfo?.habitat.id);
  const [isReady, setReady] = useState(false);

  return (
    <ExploreDiv ref={divRef} color={habitatInfo?.habitat.color} onAnimationEnd={() => setReady(true)}>
      {isReady &&
        habitatInfo &&
        totalFeed.map((feedInfo) => {
          return feedInfo.contents_url_array.map((url, idx) => {
            return <Cell feedInfo={feedInfo} url={url} key={idx} />;
          });
        })}
    </ExploreDiv>
  );
};

export default Explore;

const ExploreDiv = styled.div<{ color: string | undefined }>`
  ${prettyScroll()};
  width: 100%;
  margin: auto;
  background-color: ${(props) => (props.color !== undefined ? props.color : Palette.PINK)};
  z-index: 1;
  height: 100%;
  text-align: center;
  overflow-y: scroll;
  padding: 5px 5px;
  animation-duration: 1s;
  animation-name: zoomout;
  @keyframes zoomout {
    from {
      width: 300px;
    }
    to {
      width: 100%;
    }
  }
`;

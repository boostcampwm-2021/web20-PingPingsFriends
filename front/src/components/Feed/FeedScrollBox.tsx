import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Feed, { FeedJson } from './Feed';
import useHabitatInfo from '../_common/Hooks/useHabitatInfo';
import { flexBox } from '../../lib/styles/mixin';
import { Palette } from '../../lib/styles/Palette';

const ScrollableDiv = styled.div<{ color: string | undefined }>`
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

const FeedScrollBox = ({ habitat }: { habitat: number }) => {
  const [feedList, setFeedList] = useState<FeedJson[] | null>(null);
  const { habitatInfo } = useHabitatInfo(habitat);
  useEffect(() => {
    fetch('dummy_feed.json')
      .then((res) => res.json())
      .then((res) => setFeedList(res));
  }, []);

  return <ScrollableDiv color={habitatInfo?.color}>{feedList !== null ? feedList.map((json) => <Feed key={json.id} json={json} />) : <div>loading</div>}</ScrollableDiv>;
};

export default FeedScrollBox;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Feed, { FeedJson } from './Feed';
import { flexBox } from '../../lib/styles/mixin';

const ScrollableDiv = styled.div`
  ${flexBox(null, null, 'column')};
  width: 500px;
  background-color: #ffb1b9;
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
  useEffect(() => {
    fetch('dummy_feed.json')
      .then((res) => res.json())
      .then((res) => setFeedList(res));
  }, []);

  return <ScrollableDiv>{feedList !== null ? feedList.map((json) => <Feed key={json.id} json={json} />) : <div>loading</div>}</ScrollableDiv>;
};

export default FeedScrollBox;

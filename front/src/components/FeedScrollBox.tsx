import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Feed, { t_FeedJson } from './Feed';

const ScrollBox = styled.div`
  width: 500px;
  background-color: #ffb1b9;
  height: 100%;
  margin: auto;
  padding: 10px 10px 10px 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const FeedScrollBox = () => {
  const [feedList, setFeedList] = useState<t_FeedJson[] | null>(null);
  useEffect(() => {
    fetch('dummy_feed.json')
      .then((res) => res.json())
      .then((res) => setFeedList(res));
  }, []);

  return <ScrollBox>{feedList !== null ? feedList.map((json) => <Feed key={json.id} json={json} />) : <div>loading</div>}</ScrollBox>;
};

export default FeedScrollBox;

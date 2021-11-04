import React from 'react';
import styled from 'styled-components';
import FeedScrollBox from '../components/FeedScrollBox';
import FeedFAB from '../components/FeedFAB';

const ViewPort = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #eeeeee;
`;

const FeedTestPage = () => {
  return (
    <ViewPort>
      <FeedScrollBox />
      <FeedFAB />
    </ViewPort>
  );
};

export default FeedTestPage;

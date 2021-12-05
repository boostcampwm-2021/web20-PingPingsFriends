import React from 'react';
import styled from 'styled-components';
import { flexBox } from '@lib/styles/mixin';

const _ = Array(5).fill(null);

const SkeletonFeeds = () => {
  return (
    <div>
      {_.map((v, i) => (
        <FakeFeed key={i}>
          <Header>
            <Avatar />
            <FakeBox />
          </Header>
          <ImageBox />
          <Blank />
          <FakeContents />
        </FakeFeed>
      ))}
    </div>
  );
};

export default SkeletonFeeds;

const FakeFeed = styled.div`
  border-radius: 30px;
  width: 470px;
  height: 650px;
  background: white;
  margin: 10px 0;
  flex-shrink: 0;
`;

const Header = styled.div`
  ${flexBox(null, 'center', 'row')};
  height: 50px;
  padding-left: 10px;
`;
const FakeBox = styled.div`
  width: 80px;
  height: 16px;
  background: #a5a0a2;
  margin-left: 3px;
`;
const Avatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #a5a0a2;
`;

const ImageBox = styled.div`
  width: 100%;
  height: 500px;
  background: #a5a0a2;
`;

const Blank = styled.div`
  height: 33px;
`;

const FakeContents = styled.div`
  width: 300px;
  height: 16px;
  background: #a5a0a2;
  margin-left: 10px;
`;

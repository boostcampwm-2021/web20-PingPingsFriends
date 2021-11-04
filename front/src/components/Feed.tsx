import React from 'react';
import styled from 'styled-components';
import { ReactComponent as VertBtnSvg } from '../assets/icons/more_vert_btn.svg';
import { ReactComponent as HeartBtnSvg } from '../assets/icons/empty_heart_btn.svg';
import { ReactComponent as CommentBtnSvg } from '../assets/icons/comment_btn.svg';

export type t_FeedJson = {
  id: number;
  nickname: string;
  imageURL: string;
  text: string;
};

const FeedContainer = styled.div`
  background-color: white;
  width: 100%;
  height: 650px;
  flex-shrink: 0;
  border-radius: 30px;
  position: relative;
`;

const FeedHeader = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  gap: 2px;

  .vert_btn {
    position: absolute;
    right: 10px;
  }
`;

const Avatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: black;
`;

const FeedContents = styled.div<Pick<t_FeedJson, 'imageURL'>>`
  width: 100%;
  position: relative;
  background-color: aliceblue;

  &::after {
    padding-bottom: 100%;
    content: '';
    background-image: ${(props) => `url(${props.imageURL})`};
    background-position: center;
    background-size: cover;
    display: block;
  }
`;

const FeedInfo = styled.div`
  display: flex;
  position: relative;
  gap: 5px;
  padding: 3px 10px;
  .time {
    position: absolute;
    right: 10px;
    color: #c4c4c4;
  }
`;

const FeedText = styled.div`
  padding: 0 10px;
`;

const Feed = ({ json }: { json: t_FeedJson }) => {
  return (
    <FeedContainer>
      <FeedHeader>
        <Avatar />
        <span>{json.nickname}</span>
        <VertBtnSvg className="vert_btn" />
      </FeedHeader>
      <FeedContents imageURL={json.imageURL} />
      <FeedInfo>
        <HeartBtnSvg />
        <CommentBtnSvg />
        <span>13</span>
        <span className="time">2시간 전</span>
      </FeedInfo>
      <FeedText>{json.text}</FeedText>
    </FeedContainer>
  );
};

export default Feed;

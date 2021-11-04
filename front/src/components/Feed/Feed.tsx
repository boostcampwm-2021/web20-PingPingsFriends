import React from 'react';
import styled from 'styled-components';
import { ReactComponent as VertBtnSvg } from '../../assets/icons/more_vert_btn.svg';
import { ReactComponent as HeartBtnSvg } from '../../assets/icons/empty_heart_btn.svg';
import { ReactComponent as CommentBtnSvg } from '../../assets/icons/comment_btn.svg';
import Avatar from '../_common/Avatar/Avatar';
import { flexBox } from '../../lib/styles/mixin';

export interface FeedJson {
  id: number;
  nickname: string;
  imageURL: string;
  text: string;
}

const FeedContainerDiv = styled.div`
  background-color: white;
  width: 100%;
  height: 650px;
  flex-shrink: 0;
  border-radius: 30px;
  position: relative;
`;

const FeedHeaderDiv = styled.div`
  ${flexBox(null, 'center')};
  height: 50px;
  padding-left: 10px;
  gap: 2px;

  .vert_btn {
    position: absolute;
    right: 10px;
  }
`;

const FeedContents = styled.div<Pick<FeedJson, 'imageURL'>>`
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

const FeedInfoDiv = styled.div`
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

const FeedTextDiv = styled.div`
  padding: 0 10px;
`;

const Feed = ({ json }: { json: FeedJson }) => {
  return (
    <FeedContainerDiv>
      <FeedHeaderDiv>
        <Avatar />
        <span>{json.nickname}</span>
        <VertBtnSvg className="vert_btn" />
      </FeedHeaderDiv>
      <FeedContents imageURL={json.imageURL} />
      <FeedInfoDiv>
        <HeartBtnSvg />
        <CommentBtnSvg />
        <span>13</span>
        <span className="time">2시간 전</span>
      </FeedInfoDiv>
      <FeedTextDiv>{json.text}</FeedTextDiv>
    </FeedContainerDiv>
  );
};

export default Feed;

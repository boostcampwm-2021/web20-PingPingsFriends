import React from 'react';
import styled from 'styled-components';
// import {} from 'styled-components/cssprop';
import { ReactComponent as VertBtnSvg } from '../assets/icons/more_vert_btn.svg';
import { ReactComponent as HeartBtnSvg } from '../assets/icons/empty_heart_btn.svg';
import { ReactComponent as CommentBtnSvg } from '../assets/icons/comment_btn.svg';

export type t_FeedJson = {
  id: number;
  nickname: string;
  imageURL: string;
  text: string;
};

const FeedContainer = styled.div<{ imageURL: string }>`
  background-color: white;
  width: 100%;
  height: 650px;
  flex-shrink: 0;
  border-radius: 30px;
  position: relative;
  .header {
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    gap: 2px;

    .vert_btn {
      position: absolute;
      right: 10px;
    }
  }
  .Avatar {
    width: 30px;
    height: 30px;
    border-radius: 100%;
    background-color: black;
  }
  .contents_container {
    width: 100%;
    position: relative;
    background-color: aliceblue;
  }
  .contents_container::after {
    padding-bottom: 100%;
    content: '';
    background-image: ${(props) => 'url(' + props.imageURL + ')'};
    background-position: center;
    background-size: cover;
    display: block;
  }
  .info_container {
    display: flex;
    position: relative;
    gap: 5px;
    padding: 3px 10px;
    .time {
      position: absolute;
      right: 10px;
      color: #c4c4c4;
    }
  }
  .text_container {
    padding: 0 10px;
  }
`;

const Feed = ({ json }: { json: t_FeedJson }) => {
  return (
    <FeedContainer imageURL={json.imageURL}>
      <div className="header">
        <div className="Avatar"></div>
        <span>{json.nickname}</span>
        <VertBtnSvg className="vert_btn" />
      </div>
      <div className="contents_container"></div>
      <div className="info_container">
        <HeartBtnSvg />
        <CommentBtnSvg />
        <span>13</span>
        <span className="time">2시간 전</span>
      </div>
      <div className="text_container">{json.text}</div>
    </FeedContainer>
  );
};

export default Feed;

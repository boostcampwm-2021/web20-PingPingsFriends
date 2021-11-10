import React from 'react';
import styled from 'styled-components';
import { ReactComponent as VertBtnSvg } from '../../assets/icons/more_vert_btn.svg';
import { ReactComponent as CommentBtnSvg } from '../../assets/icons/comment_btn.svg';
import Avatar from '../_common/Avatar/Avatar';
import DropBox from '../_common/DropBox/DropBox';
import Carousel from '../_common/Carousel/Carousel';
import HeartButton from '../HeartButton/HeartButton';
import { flexBox } from '../../lib/styles/mixin';
import { useLike } from '../HeartButton/useLike';
import { makeDropBoxMenu } from '../_common/DropBox/makeDropBoxMenu';
import Modal from '../_common/Modal/Modal';
import DeleteModal from '../DeleteModal/DeleteModal';
import useModal from '../_common/Modal/useModal';

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

const FeedContents = styled.div`
  width: 100%;
  height: 500px;
  position: relative;
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

export interface FeedProps {
  id?: string;
  nickname: string;
  imageURLs: string[];
  text: string;
  lastFeed?: (node: HTMLDivElement) => void;
  scrollRef?: any;
}

const Feed = ({ nickname, imageURLs, text, lastFeed, scrollRef }: FeedProps) => {
  const { isShowing, toggle } = useModal();
  const [like, toggleLike] = useLike();

  const test = makeDropBoxMenu([{ text: '글 삭제' }, { text: '글 수정', handler: toggle }]);

  return (
    <FeedContainerDiv ref={lastFeed}>
      <FeedHeaderDiv>
        <Avatar />
        <span>{nickname}</span>
        <DropBox start="right" offset={10} top={55} width={150} items={test}>
          <VertBtnSvg className="vert_btn button" />
        </DropBox>
      </FeedHeaderDiv>
      <FeedContents>
        <Carousel imageURLs={imageURLs} scrollRef={scrollRef} />
      </FeedContents>
      <FeedInfoDiv>
        <HeartButton like={like} toggleLike={toggleLike} />
        <CommentBtnSvg />
        <span>13</span>
        <span className="time">2시간 전</span>
      </FeedInfoDiv>
      <FeedTextDiv>{text}</FeedTextDiv>
      <Modal isShowing={isShowing} hide={toggle}>
        <DeleteModal hide={toggle} />
      </Modal>
    </FeedContainerDiv>
  );
};

export default Feed;

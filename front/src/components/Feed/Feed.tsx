import React from 'react';
import styled from 'styled-components';
import { ReactComponent as VertBtnSvg } from '@assets/icons/more_vert_btn.svg';
import { ReactComponent as CommentBtnSvg } from '@assets/icons/comment_btn.svg';
import Avatar from '@common/Avatar/Avatar';
import DropBox from '@common/DropBox/DropBox';
import Carousel from '@common/Carousel/Carousel';
import HeartButton from '@components/HeartButton/HeartButton';
import { flexBox } from '@lib/styles/mixin';
import { useLike } from '@components/HeartButton/useLike';
import { makeDropBoxMenu } from '@common/DropBox/makeDropBoxMenu';
import Modal from '@common/Modal/Modal';
import DeleteModal from '@components/DeleteModal/DeleteModal';
import DetailModal from '@components/DetailModal/DetailModal';
import useModal from '@common/Modal/useModal';

const FeedContainerDiv = styled.div`
  background-color: white;
  width: 100%;
  height: 650px;
  flex-shrink: 0;
  border-radius: 30px;
  position: relative;
  margin: 10px 0;
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
}

const Feed = ({ nickname, imageURLs, text }: FeedProps) => {
  const { isShowing: isDeleteShowing, toggle: toggleDeleteModal } = useModal();
  const { isShowing: isDetailShowing, toggle: toggleDetailModal } = useModal();
  const [like, toggleLike] = useLike();
  const test = makeDropBoxMenu([{ text: '글 수정' }, { text: '글 삭제', handler: toggleDeleteModal }]);

  return (
    <FeedContainerDiv>
      <FeedHeaderDiv>
        <Avatar size={'30px'} />
        <span>{nickname}</span>
        <DropBox start="right" offset={10} top={55} width={150} items={test}>
          <VertBtnSvg className="vert_btn button" />
        </DropBox>
      </FeedHeaderDiv>
      <FeedContents>
        <Carousel imageURLs={imageURLs} />
      </FeedContents>
      <FeedInfoDiv>
        <HeartButton like={like} toggleLike={toggleLike} />
        <CommentBtnSvg className={'button'} onClick={toggleDetailModal} />
        <span>13</span>
        <span className="time">2시간 전</span>
      </FeedInfoDiv>
      <FeedTextDiv>{text}</FeedTextDiv>
      <Modal isShowing={isDeleteShowing} hide={toggleDeleteModal}>
        <DeleteModal hide={toggleDeleteModal} />
      </Modal>
      <Modal isShowing={isDetailShowing} hide={toggleDetailModal}>
        <DetailModal imageURLs={imageURLs} hide={toggleDetailModal} />
      </Modal>
    </FeedContainerDiv>
  );
};

// export default Feed;
export default React.memo(Feed);

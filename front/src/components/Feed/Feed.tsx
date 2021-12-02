import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as VertBtnSvg } from '@assets/icons/more_vert_btn.svg';
import { ReactComponent as CommentBtnSvg } from '@assets/icons/comment_btn.svg';
import { ReactComponent as TranslateBtnSvg } from '@assets/icons/pet_btn.svg';
import Avatar from '@common/Avatar/Avatar';
import DropBox from '@common/DropBox/DropBox';
import Carousel from '@common/Carousel/Carousel';
import HeartButton from '@components/HeartButton/HeartButton';
import { flexBox } from '@lib/styles/mixin';
import { useLike } from '@components/HeartButton/useLike';
import { makeDropBoxMenu } from '@common/DropBox/makeDropBoxMenu';
import Modal from '@common/Modal/Modal';
import DeleteModal from '@components/DeleteModal/DeleteModal';
import useModal from '@common/Modal/useModal';
import { formatDate } from '@lib/utils/time';
import { useUserState } from '@src/contexts/UserContext';
import { Palette } from '@src/lib/styles/Palette';
import { useHistory, useLocation } from 'react-router';
import queryString from '@src/lib/utils/queryString';
import AlertDiv from '@common/Alert/AlertDiv';
import WriteModal from '@components/Write/WriteModal';

export interface FeedProps {
  feedId: number;
  userId: number;
  nickname: string;
  imageURLs: string[];
  humanText: string;
  animalText: string;
  createdTime: string;
  numOfHearts: number;
  numOfComments: number;
  is_heart: 0 | 1;
  avatarImage: string | null;
  contentIds: string;
  lazy?: (node: HTMLDivElement) => void;
}

const Feed = ({ contentIds, feedId, userId, nickname, imageURLs, humanText, animalText, lazy, createdTime, is_heart, avatarImage, numOfComments }: FeedProps) => {
  const { isShowing: isDeleteShowing, toggle: toggleDeleteModal } = useModal();
  const { toggle: toggleEditModal, isShowing: isEditShowing } = useModal();
  const { isShowing: isHeartErrorShowing, toggle: toggleErrorModal } = useModal();
  const [like, toggleLike] = useLike(is_heart, feedId);
  const ago = formatDate(createdTime);
  const items = makeDropBoxMenu([
    { text: '글 수정', handler: toggleEditModal },
    { text: '글 삭제', handler: toggleDeleteModal },
  ]);
  const userState = useUserState();
  const [isTranslate, setTranslate] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const handleClick = () => {
    history.push(`/modal/detail/${feedId}/?habitat=${queryString(location.search)['habitat']}`);
  };

  return (
    <FeedContainerDiv>
      <FeedHeaderDiv>
        <Avatar size={'30px'} imgSrc={avatarImage} userId={userId} />
        <span>{nickname}</span>
        {userState.data?.userId === userId && (
          <DropBox start="right" offset={10} top={55} width={150} items={items}>
            <VertBtnSvg className="vert_btn button" />
          </DropBox>
        )}
      </FeedHeaderDiv>
      <FeedContents>
        <Carousel imageURLs={imageURLs} lazy={lazy} />
      </FeedContents>
      <FeedInfoDiv isTranslate={isTranslate}>
        <HeartButton like={like} toggleLike={userState.data?.userId !== -1 ? toggleLike : toggleErrorModal} />
        <CommentBtnSvg className={'button'} onClick={handleClick} />
        <span>{numOfComments}</span>
        <TranslateBtnSvg className={'button translate'} onClick={() => setTranslate(!isTranslate)} />
        <span className="time">{ago}</span>
      </FeedInfoDiv>
      <FeedTextDiv>{isTranslate ? humanText : animalText}</FeedTextDiv>
      <Modal isShowing={isDeleteShowing} hide={toggleDeleteModal}>
        <DeleteModal hide={toggleDeleteModal} feedId={feedId} />
      </Modal>
      <Modal isShowing={isEditShowing} hide={toggleEditModal}>
        <WriteModal hide={toggleEditModal} initState={{ contents: imageURLs, contentIds: contentIds.split(',').map((str) => parseInt(str)), feedId: feedId, text: humanText }} />
      </Modal>
      <Modal isShowing={isHeartErrorShowing} hide={toggleErrorModal}>
        <AlertDiv>먼저 로그인 해주세요!</AlertDiv>
      </Modal>
    </FeedContainerDiv>
  );
};

export default React.memo(Feed);

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

const FeedInfoDiv = styled.div<{ isTranslate: boolean }>`
  display: flex;
  position: relative;
  gap: 5px;
  padding: 3px 10px;
  .time {
    position: absolute;
    right: 10px;
    color: #c4c4c4;
  }
  .translate {
    fill: ${(props) => (props.isTranslate ? Palette.RED : Palette.PINK)};
    border: 2px solid ${(props) => (props.isTranslate ? Palette.RED : Palette.PINK)};
    border-radius: 100%;
  }
  .translate:hover {
    transform: scale(120%);
  }
`;

const FeedTextDiv = styled.div`
  padding: 0 10px;
  overflow: hidden;
  height: 60px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  /* background-color: #afafaf; */
`;

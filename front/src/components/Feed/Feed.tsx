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
import DetailModal from '@components/DetailModal/DetailModal';
import WriteModal from '@components/Write/WriteModal';
import useModal from '@common/Modal/useModal';
import { formatDate } from '@lib/utils/time';
import { useUserState } from '@src/contexts/UserContext';
import { Palette } from '@src/lib/styles/Palette';

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
  is_heart: number;
  avatarImage: string | null;
  contentIds: number[];
  lazy?: (node: HTMLDivElement) => void;
}

const Feed = ({ feedId, userId, nickname, imageURLs, contentIds, humanText, animalText, lazy, createdTime, numOfHearts, is_heart, avatarImage, numOfComments }: FeedProps) => {
  const { isShowing: isDeleteShowing, toggle: toggleDeleteModal } = useModal();
  const { isShowing: isEditShowing, toggle: toggleEditModal } = useModal();
  const [like, toggleLike] = useLike(is_heart, feedId);
  const ago = formatDate(createdTime);
  const items = makeDropBoxMenu([
    { text: '글 수정', handler: toggleEditModal },
    { text: '글 삭제', handler: toggleDeleteModal },
  ]);
  const { toggle, routePath } = useModal(`detail/${feedId}`);
  const userState = useUserState();
  const [isTranslate, setTranslate] = useState(false);

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
        <HeartButton like={like} toggleLike={toggleLike} />
        <CommentBtnSvg className={'button'} onClick={toggle} />
        <span>{numOfComments}</span>
        <TranslateBtnSvg className={'button translate'} onClick={() => setTranslate(!isTranslate)} />
        <span className="time">{ago} 전</span>
      </FeedInfoDiv>
      <FeedTextDiv>{isTranslate ? humanText : animalText}</FeedTextDiv>
      <Modal isShowing={isDeleteShowing} hide={toggleDeleteModal}>
        <DeleteModal hide={toggleDeleteModal} feedId={feedId} />
      </Modal>
      <Modal isShowing={isEditShowing} hide={toggleEditModal}>
        <WriteModal hide={toggleEditModal} initState={{ contents: imageURLs, contentIds: contentIds, feedId: feedId, text: humanText }} />
      </Modal>
      <Modal hide={toggle} routePath={routePath}>
        <DetailModal
          userId={userId}
          userImgURL={avatarImage ?? null}
          feedId={feedId}
          nickname={nickname}
          text={humanText}
          imageURLs={imageURLs}
          hide={toggle}
          ago={ago}
          like={like}
          toggleLike={toggleLike}
          numOfHearts={numOfHearts}
        />
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
    fill: ${(props) => (props.isTranslate ? Palette.PINK : Palette.LIGHT_GRAY)};
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

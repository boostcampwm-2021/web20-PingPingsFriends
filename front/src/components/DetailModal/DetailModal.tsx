import React from 'react';
import styled from 'styled-components';
import { flexBox, prettyScroll } from '@lib/styles/mixin';
import { Palette } from '@lib/styles/Palette';
import Carousel from '../_common/Carousel/Carousel';
import PreviewBox from './PreviewBox';
import useModal, { ToggleHandler } from '@common/Modal/useModal';
import Avatar from '../_common/Avatar/Avatar';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import HeartSection from './HeartSection';
import { useLike } from '@components/HeartButton/useLike';
import useCommentList from './useCommentList';
import { useUserState } from '@src/contexts/UserContext';
import Modal from '@common/Modal/Modal';
import AlertDiv from '@common/Alert/AlertDiv';

interface DetailModalProps {
  hide?: ToggleHandler;
  imageURLs: string[];
  nickname: string;
  text: string;
  feedId: number;
  userId: number;
  ago: string;
  numOfHearts: number;
  userImgURL: string | null;
  isHeart: 0 | 1;
}

const DetailModal = ({ feedId, userId, userImgURL, imageURLs, nickname, text, ago, isHeart, numOfHearts }: DetailModalProps) => {
  const userState = useUserState();
  const { commentState, commentDispatch, inputMode, inputModeDispatch } = useCommentList();
  const [like, toggleLike, syncNumberOfHeart] = useLike(isHeart, feedId);
  const { isShowing, toggle } = useModal();
  return (
    <DetailModalDiv>
      <ContentsDiv>
        <MainContentsDiv>
          <Carousel children={<PreviewBox controller={undefined} imageURLs={undefined} />} imageURLs={imageURLs} />
        </MainContentsDiv>
      </ContentsDiv>
      <VertLineDiv />
      <CommunicateDiv>
        <FeedInfoDiv>
          <FeedAuthorDiv>
            <Avatar size={'35px'} userId={userId} imgSrc={userImgURL ?? undefined} />
            <span className={'nickname'}>{nickname}</span>
            <span className={'time'}>{ago}</span>
          </FeedAuthorDiv>
          <p className={'text'}>{text}</p>
        </FeedInfoDiv>
        <CommentList commentState={commentState} commentDispatch={commentDispatch} inputMode={inputMode} inputModeDispatch={inputModeDispatch} feedId={feedId} />
        <HeartSection like={like!} toggleLike={userState.data?.userId !== -1 ? toggleLike : () => {}} numOfHearts={numOfHearts} syncNumberOfHeart={syncNumberOfHeart} />
        <CommentForm commentDispatch={commentDispatch} inputMode={inputMode} inputModeDispatch={inputModeDispatch} feedId={feedId} />
      </CommunicateDiv>
      <Modal isShowing={isShowing} hide={toggle}>
        <AlertDiv>먼저 로그인 해주세요!</AlertDiv>
      </Modal>
    </DetailModalDiv>
  );
};

export default DetailModal;

const DetailModalDiv = styled.div`
  ${flexBox()};
  width: 80vw;
  height: 600px;
  background: ${Palette.WHITE};
  box-shadow: 0 4px 10px rgba(51, 51, 51, 1), 0 0 4px rgba(51, 51, 51, 0.5);
  border-radius: 10px;
  min-height: 500px;
  min-width: 800px;
  max-width: 1200px;
`;

const ContentsDiv = styled.div`
  ${flexBox('center', 'center', 'column')};
  width: 50%;
  height: 100%;
`;

const MainContentsDiv = styled.div`
  width: 400px;
  height: 400px;
  margin: auto;
  transform: translateY(-50px);
  @media screen and (max-width: 1300px) {
    & {
      width: 300px;
      height: 300px;
    }
  }
`;

const VertLineDiv = styled.div`
  height: 90%;
  border-right: 2px solid ${Palette.LIGHT_GRAY};
`;

const CommunicateDiv = styled.div`
  width: 50%;
  height: 100%;
  padding: 30px 20px;
  position: relative;
`;

const FeedInfoDiv = styled.div`
  width: 100%;

  .text {
    ${prettyScroll()};
    margin: 10px 0;
    height: 100px;
    overflow-y: scroll;
    padding: 0 5px;
  }
`;

const FeedAuthorDiv = styled.div`
  ${flexBox('flex-start')};
  position: relative;

  .time {
    position: absolute;
    right: 0;
    font-size: 14px;
  }
  .nickname {
    font-size: 16px;
    margin-left: 5px;
  }
`;

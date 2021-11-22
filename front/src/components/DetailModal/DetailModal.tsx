import React, { useState } from 'react';
import styled from 'styled-components';
import { flexBox, prettyScroll } from '@lib/styles/mixin';
import { Palette } from '@lib/styles/Palette';
import Carousel from '../_common/Carousel/Carousel';
import PreviewBox from './PreviewBox';
import { ToggleHandler } from '@common/Modal/useModal';
import Avatar from '../_common/Avatar/Avatar';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import HeartSection from './HeartSection';
import { LikeProps } from '@components/HeartButton/useLike';

interface DetailModalProps extends LikeProps {
  hide?: ToggleHandler;
  imageURLs: string[];
  nickname: string;
  text: string;
  feedId: number;
  ago: string;
  numOfHearts: string;
}

const DetailModal = ({ feedId, imageURLs, nickname, text, ago, like, toggleLike, numOfHearts }: DetailModalProps) => {
  const [editMode, setEditMode] = useState(false);
  const [inputText, setInputText] = useState('');
  const toggleEditMode = (text: string) => {
    if (editMode) {
      setEditMode(false);
      setInputText('');
    } else {
      setEditMode(true);
      setInputText(text);
    }
  };

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
            <Avatar size={'35px'} />
            <span className={'nickname'}>{nickname}</span>
            <span className={'time'}>{ago} 전</span>
          </FeedAuthorDiv>
          <p className={'text'}>
            {text
              ? text
              : `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}
          </p>
        </FeedInfoDiv>
        <CommentList toggleEditMode={toggleEditMode} feedId={feedId} />
        <HeartSection like={like} toggleLike={toggleLike} numOfHearts={numOfHearts} />
        <CommentForm inputText={inputText} setInputText={setInputText} editMode={editMode} feedId={feedId} />
      </CommunicateDiv>
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
  }
  .nickname {
    font-size: 20px;
    margin-left: 5px;
  }
`;

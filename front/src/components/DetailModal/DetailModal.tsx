import React, { useRef } from 'react';
import styled from 'styled-components';
import { flexBox } from '@lib/styles/mixin';
import { Palette } from '@lib/styles/Palette';
import Carousel from '../_common/Carousel/Carousel';
import PreviewBox from './PreviewBox';
import { ToggleHandler } from '@common/Modal/useModal';

interface DetailModalProps {
  hide: ToggleHandler;
  imageURLs: string[];
}

const DetailModalDiv = styled.div`
  ${flexBox()};
  width: 80vw;
  height: 80vh;
  background: ${Palette.WHITE};
  box-shadow: 0 4px 10px rgba(51, 51, 51, 1), 0 0 4px rgba(51, 51, 51, 0.5);
  border-radius: 10px;
  min-height: 500px;
`;

const ContentsDiv = styled.div`
  width: 50%;
  height: 100%;
`;

const MainContentsDiv = styled.div`
  width: 70%;
  height: 50%;
  margin: auto;
  transform: translateY(30%);
`;

const CommunicateDiv = styled.div`
  width: 50%;
  height: 100%;
  background-color: aliceblue;
`;

const DetailModal = ({ hide, imageURLs }: DetailModalProps) => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <DetailModalDiv ref={ref}>
      <ContentsDiv>
        <MainContentsDiv>
          <Carousel children={<PreviewBox controller={undefined} imageURLs={undefined} />} imageURLs={imageURLs} />
        </MainContentsDiv>
      </ContentsDiv>
      <CommunicateDiv>hi</CommunicateDiv>
    </DetailModalDiv>
  );
};

export default DetailModal;

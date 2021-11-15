import React from 'react';
import styled from 'styled-components';
import { CarouselControl } from '@common/Carousel/Carousel';
import SwipeBox from '@common/SwipeBox/SwipeBox';

const PreviewDiv = styled.div`
  width: 100%;
  height: 35%;
  margin-top: 30px;
  padding: 10px 0;
  background-color: aliceblue;
`;

const ImgDiv = styled.div`
  width: 30%;
  height: 100%;
  flex-shrink: 0;
`;

const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PreviewBox = ({ controller, imageURLs }: { controller: CarouselControl | undefined; imageURLs: string[] | undefined }) => {
  const handleImgClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const idx = (e.target as HTMLImageElement).dataset.idx;
    controller?.certainSlide(Number(idx));
  };

  return (
    <PreviewDiv>
      <SwipeBox gap={'10px'} height={'100%'} width={'100%'}>
        {imageURLs?.map((url, idx) => (
          <ImgDiv className={'button'} key={(idx.toString() + 'pre' + url).toString()}>
            <PreviewImg src={url} alt="test" data-idx={idx} onClick={handleImgClick} />
          </ImgDiv>
        ))}
      </SwipeBox>
    </PreviewDiv>
  );
};

export default PreviewBox;

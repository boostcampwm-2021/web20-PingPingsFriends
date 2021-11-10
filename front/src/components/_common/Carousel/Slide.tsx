import React from 'react';
import styled from 'styled-components';
import { rectType } from '../../../lib/hooks/useClientRect';

const SlideImg = styled.img<Pick<SlideProps, 'rect'>>`
  width: ${({ rect }) => rect.width}px;
  height: ${({ rect }) => rect.height}px;
  object-fit: cover;
`;
const Video = styled.video<Pick<SlideProps, 'rect'>>`
  width: ${({ rect }) => rect.width}px;
  height: ${({ rect }) => rect.height}px;
  object-fit: cover;
`;

interface SlideProps {
  src: string;
  rect: rectType;
}

const Slide = ({ src, rect }: SlideProps) => {
  return src.includes('mp4') ? (
    <Video rect={rect} controls autoPlay>
      <source src={src} type={'video/mp4'} />
    </Video>
  ) : (
    <SlideImg src={src} rect={rect} alt="피드 이미지" />
  );
};

export default Slide;

import React from 'react';
import styled from 'styled-components';
import { rectType } from '@hooks/useClientRect';

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
  lazy?: (node: HTMLDivElement) => void;
}

const Slide = ({ src, rect, lazy }: SlideProps) => {
  const handleErrorImg = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = '/default_avatar.png';
  };

  return (
    <div ref={lazy}>
      {src.includes('mp4') ? (
        <Video rect={rect} controls autoPlay>
          <source src={src} type={'video/mp4'} />
        </Video>
      ) : (
        <SlideImg src={lazy ? '/default_avatar.png' : src.replace('.webp', '-feed.webp')} onError={handleErrorImg} data-src={src.replace('.webp', '-feed.webp')} rect={rect} alt="피드 이미지" />
      )}
    </div>
  );
};

export default Slide;

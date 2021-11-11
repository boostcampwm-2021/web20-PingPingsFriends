import React, { useEffect } from 'react';
import styled from 'styled-components';
import { rectType } from '../../../hooks/useClientRect';
import { useGetDiv } from '../../../hooks/useGetDiv';

const SlideImg = styled.img<Pick<SlideProps, 'rect'>>`
  width: ${({ rect }) => rect.width}px;
  height: 100%;
  object-fit: cover;
`;
const Video = styled.video<Pick<SlideProps, 'rect'>>`
  width: ${({ rect }) => rect.width}px;
  height: 100%;
  object-fit: cover;
`;

interface SlideProps {
  src: string;
  rect: rectType;
  scrollRef?: React.MutableRefObject<HTMLDivElement>;
}

const Slide = ({ src, rect, scrollRef }: SlideProps) => {
  const [feedContent, ref] = useGetDiv();

  useEffect(() => {
    if ('id' in feedContent && scrollRef) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            const target = entries[0].target.firstChild as HTMLImageElement;
            target.src = target.dataset.lazy as string;

            observer.unobserve(feedContent);
          }
        },
        {
          root: scrollRef.current,
          rootMargin: `500px 0px`,
        }
      );
      observer.observe(feedContent);
    }
  }, [feedContent]);

  return (
    <div ref={ref}>
      {src.includes('mp4') ? (
        <Video rect={rect} controls autoPlay>
          <source src={src} type={'video/mp4'} />
        </Video>
      ) : (
        <SlideImg src={scrollRef ? `default_avatar.png` : src} data-lazy={src} rect={rect} alt="피드 이미지" />
      )}
    </div>
  );
};

export default Slide;

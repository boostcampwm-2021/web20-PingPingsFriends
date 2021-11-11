import React from 'react';
import styled from 'styled-components';
import CarouselContents from './CarouselContents';
import { useClientRect } from '../../../hooks/useClientRect';
import Slide from './Slide';
import Arrow from './Arrow';
import Dots from './Dots';
import { useMoveSlide } from './useMoveSlide';

const CarouselDiv = styled.div`
  position: relative;
  margin: auto;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

interface CarouselProps {
  imageURLs: string[];
  scrollRef: React.MutableRefObject<HTMLDivElement>;
}

const Carousel = ({ imageURLs, scrollRef }: CarouselProps) => {
  const [rect, ref] = useClientRect();
  const [translateStyle, slideIndex, nextSlide, prevSlide] = useMoveSlide({ slideCount: imageURLs.length, rect });

  return (
    <CarouselDiv ref={ref}>
      <CarouselContents trans={translateStyle} width={rect.width * imageURLs.length}>
        {imageURLs.map((src, index) => (
          <Slide key={index} rect={rect} src={src} scrollRef={scrollRef} />
        ))}
      </CarouselContents>

      {imageURLs.length > 1 ? (
        <>
          <Arrow direction={'right'} handleClick={nextSlide} />
          <Arrow direction={'left'} handleClick={prevSlide} />
          <Dots slides={imageURLs} slideIndex={slideIndex} />
        </>
      ) : null}
    </CarouselDiv>
  );
};

export default Carousel;

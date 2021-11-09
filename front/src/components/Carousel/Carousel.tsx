import React from 'react';
import styled from 'styled-components';
import CarouselContents from './CarouselContents';
import { useClientRect } from './useClientRect';
import Slide from './Slide';
import Arrow from './Arrow';
import Dots from './Dots';
import { FeedJson } from '../Feed/Feed';
import { useCarousel } from './useCarousel';

const CarouselDiv = styled.div`
  position: relative;
  margin: auto;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Carousel = ({ imageURLs }: Pick<FeedJson, 'imageURLs'>) => {
  const [rect, ref] = useClientRect();
  const [translateStyle, slideIndex, nextSlide, prevSlide] = useCarousel({ slideCount: imageURLs.length, rect });

  return (
    <CarouselDiv ref={ref}>
      <CarouselContents trans={translateStyle} width={rect.width * imageURLs.length}>
        {imageURLs.map((src, index) => (
          <Slide key={index} rect={rect} src={src} />
        ))}
      </CarouselContents>
      <Arrow direction={'right'} handleClick={nextSlide} />
      <Arrow direction={'left'} handleClick={prevSlide} />
      <Dots slides={imageURLs} slideIndex={slideIndex} />
    </CarouselDiv>
  );
};

export default Carousel;

import React from 'react';
import styled from 'styled-components';
import CarouselContents from './CarouselContents';
import { useClientRect } from '@hooks/useClientRect';
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

export interface CarouselControl {
  translateStyle: number;
  slideIndex: number;
  nextSlide: () => void;
  prevSlide: () => void;
  certainSlide: (idx: number) => void;
}

interface CarouselProps {
  imageURLs: string[];
  children?: React.ReactElement;
  lazy?: (node: HTMLDivElement) => void;
}

const Carousel = ({ imageURLs, children, lazy }: CarouselProps) => {
  const [rect, ref] = useClientRect();
  const [translateStyle, slideIndex, nextSlide, prevSlide, certainSlide] = useMoveSlide({ slideCount: imageURLs.length, rect });

  return (
    <>
      <CarouselDiv ref={ref}>
        <CarouselContents trans={translateStyle} width={rect.width * imageURLs.length}>
          {imageURLs.map((src, index) => (
            <Slide key={index.toString() + 'slide' + src} rect={rect} src={src} lazy={lazy} />
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
      {children !== undefined ? React.cloneElement(children, { controller: { translateStyle, slideIndex, nextSlide, prevSlide, certainSlide }, imageURLs: imageURLs }) : null}
    </>
  );
};

export default Carousel;

import { useState } from 'react';
import { rectType } from '@hooks/useClientRect';

type useCarouselType = [number, number, () => void, () => void, (idx: number) => void];

interface useCarouselProps {
  slideCount: number;
  rect: rectType;
}

export const useMoveSlide = ({ slideCount, rect }: useCarouselProps): useCarouselType => {
  const [state, setState] = useState({
    slideIndex: 0,
    translateStyle: 0,
  });

  const { translateStyle, slideIndex } = state;

  const nextSlide = () => {
    if (slideIndex === slideCount - 1) {
      return;
    }
    setState({ ...state, slideIndex: slideIndex + 1, translateStyle: (slideIndex + 1) * rect.width });
  };

  const prevSlide = () => {
    if (slideIndex === 0) {
      return;
    }
    setState({ ...state, slideIndex: slideIndex - 1, translateStyle: (slideIndex - 1) * rect.width });
  };

  const certainSlide = (idx: number) => {
    setState({ ...state, slideIndex: idx, translateStyle: idx * rect.width });
  };

  return [translateStyle, slideIndex, nextSlide, prevSlide, certainSlide];
};

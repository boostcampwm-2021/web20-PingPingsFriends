import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

type SlideDirection = 'right' | 'left' | '';

const usePageSlide = () => {
  const history = useHistory();
  const [direction, setDirection] = useState<SlideDirection>('');

  const handleAccountClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;

    if (target.classList.contains('next-button') && target.classList.contains('active')) {
      setDirection('right');
      return;
    }
    if (target.classList.contains('back-button')) {
      history.push('/');
    }
  };

  const handleMoreInfoClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;
    if (target.classList.contains('back-button')) {
      setDirection('left');
      return;
    }

    if (target.classList.contains('next-button') && target.classList.contains('active')) {
      history.push(`/register/set-profile`);
    }
  };

  const movePage = useCallback(() => {
    if (direction === 'right') {
      history.push(`/register/more-info`);
      return;
    }
    if (direction === 'left') {
      history.goBack();
      return;
    }
  }, [history, direction]);

  useEffect(() => {
    //todo: 추상화를 권유하셔서 해봤는데 이렇게 하는게 맞을까..?
    movePage();
  }, [movePage]);

  return { direction, handleAccountClick, handleMoreInfoClick };
};

export default usePageSlide;

import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const TEXT = {
  NEXT: '다음',
  BACK: '뒤로 가기',
  REGISTER: '가입',
};
type SlideDirection = 'right' | 'left' | '';

const usePageSlide = (accountFlag: boolean, moreInfoFlag: boolean) => {
  const history = useHistory();
  const location = useLocation();
  const [direction, setDirection] = useState<SlideDirection>('');

  const handleAccountClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;

    if (target.innerHTML === TEXT.NEXT && accountFlag) {
      setDirection('right');
      return;
    }
    if (target.innerHTML === TEXT.BACK) {
      history.goBack();
    }
  };

  const handleMoreInfoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;
    if (target.innerHTML === TEXT.BACK) {
      setDirection('left');
      return;
    }
    if (target.innerHTML === TEXT.REGISTER && moreInfoFlag) {
      // todo: something
      return;
    }
  };

  const movePage = useCallback(() => {
    if (direction === 'right') {
      history.push(`${location.pathname}/more-info`);
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

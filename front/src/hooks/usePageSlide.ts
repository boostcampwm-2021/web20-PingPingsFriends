import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRegisterState } from '@src/contexts/RegisterContext';

type SlideDirection = 'right' | 'left' | '';

const usePageSlide = () => {
  const history = useHistory();
  const [direction, setDirection] = useState<SlideDirection>('');
  const registerState = useRegisterState();

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

    if (target.classList.contains('register-button') && target.classList.contains('active')) {
      const body: BodyInit = JSON.stringify(registerState);

      const headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');

      const response: Response = await fetch(`/api/users/register`, {
        method: 'POST',
        headers,
        body,
      });

      console.log(response);

      if (response) {
        history.push(`/register/set-profile`);
        return;
      }
      history.push(`/register`);
      return;
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

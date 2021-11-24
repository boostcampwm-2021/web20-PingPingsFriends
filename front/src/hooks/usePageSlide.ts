import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { InfoData, UserData } from '@components/Register/Register';

enum TEXT {
  NEXT = '다음',
  BACK = '뒤로 가기',
  REGISTER = '가입',
}
type SlideDirection = 'right' | 'left' | '';

const usePageSlide = (accountFlag: boolean, moreInfoFlag: boolean, userData: UserData, infoData: InfoData) => {
  const history = useHistory();
  const [direction, setDirection] = useState<SlideDirection>('');

  const handleAccountClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;

    if (target.innerHTML === TEXT.NEXT && accountFlag) {
      setDirection('right');
      return;
    }
    if (target.innerHTML === TEXT.BACK) {
      history.push('/');
    }
  };

  const handleMoreInfoClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;
    if (target.innerHTML === TEXT.BACK) {
      setDirection('left');
      return;
    }

    if (target.innerHTML === TEXT.REGISTER && moreInfoFlag) {
      const body: BodyInit = JSON.stringify({
        username: userData.username,
        password: userData.password,
        nickname: infoData.nickname,
        habitatId: 1,
        speciesId: 1,
      });

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

import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { flexBox, boxShadow } from '@lib/styles/mixin';
import { Palette } from '@lib/styles/Palette';
import { ToggleHandler } from '@common/Modal/useModal';
import { useHistory } from 'react-router-dom';
import { useUserDispatch, useUserState, initialState, User } from '@src/contexts/UserContext';
import Config from '@lib/constants/config';

const LoginModal = ({ hide }: { hide: ToggleHandler }) => {
  const history = useHistory();
  const userState = useUserState();
  const userDispatch = useUserDispatch();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [isFail, setFail] = useState(false);

  const handleClick = () => {
    history.push('/register');
  };

  const handleLoginFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    userDispatch({ type: 'GET_USER' });
    try {
      const bodyJson = {
        username: nameInputRef.current?.value,
        password: passwordInputRef.current?.value,
      };
      const res = await fetch(Config.BACK_HOST + '/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyJson),
      });
      const data = await res.json();
      const newState: User = {
        userId: data.user.id,
        username: data.user.username,
        nickname: data.user.nickname,
        habitatId: data.user.habitatId,
        speciesId: data.user.speciesId,
        url: data.user.content.url,
        accessToken: data.accessToken,
      };
      if (data.accessToken) {
        userDispatch({ type: 'GET_USER_SUCCESS', data: newState });
        hide('off');
      } else {
        setFail(true);
        userDispatch({ type: 'GET_USER_SUCCESS', data: initialState.data! });
      }
    } catch (e) {
      userDispatch({ type: 'GET_USER_ERROR', error: e });
    }
  };

  return (
    <LoginDiv>
      {userState.data?.userId === -1 ? (
        <>
          <LoginForm action={Config.BACK_HOST + '/api/users/login'} method={'POST'} onSubmit={handleLoginFormSubmit}>
            <LoginLabel htmlFor={'userId'}>아이디</LoginLabel>
            <LoginInput ref={nameInputRef} id={'userId'} name={'userId'} type={'text'} placeholder={'username@mail'} required />
            <LoginLabel htmlFor={'password'}>비밀번호</LoginLabel>
            <LoginInput ref={passwordInputRef} id={'password'} name={'password'} type={'password'} placeholder={'비밀번호'} required />
            <LoginBtnDiv>
              <LoginBtn className={'modal-close-button'} type={'button'} color={Palette.RED} onClick={hide}>
                취소
              </LoginBtn>
              <LoginBtn type={'submit'} color={Palette.ACTIVE}>
                로그인
              </LoginBtn>
            </LoginBtnDiv>
          </LoginForm>
          <p>{isFail && '실패했습니다ㅠㅜ'}</p>
          <AuthBtnDiv>
            <AuthBtn onClick={handleClick} color={Palette.GREEN}>
              회원가입
            </AuthBtn>
          </AuthBtnDiv>
        </>
      ) : (
        <div>이미 로그인 중입니다</div>
      )}
    </LoginDiv>
  );
};

export default LoginModal;

const LoginDiv = styled.div`
  ${flexBox('center', 'center', 'column')};
  ${boxShadow('20px')};
  background-color: white;
  width: 300px;
  height: 400px;
  padding: 15px 15px;
`;

const LoginForm = styled.form`
  height: 50%;
  width: 100%;
`;

const LoginInput = styled.input`
  height: 40px;
  border-radius: 5px;
  width: 100%;
  outline: none;
  border: 1px solid gray;
  padding: 0 3px;
  font-size: 15px;
  margin-bottom: 10px;
`;

const LoginLabel = styled.label`
  font-size: 20px;
`;

const LoginBtnDiv = styled.div`
  ${flexBox('space-between')};
  height: 60px;
`;

const DefaultBtn = styled.button<{ color: string }>`
  background-color: ${(props) => props.color};
  color: white;
  text-align: center;
  border-radius: 5px;
`;

const LoginBtn = styled(DefaultBtn)`
  width: 50px;
  height: 20px;
`;

const AuthBtnDiv = styled.div`
  ${flexBox()};
  height: 50%;
  width: 100%;
`;

const AuthBtn = styled(DefaultBtn)`
  width: 100%;
  height: 40px;
  font-size: 20px;
`;

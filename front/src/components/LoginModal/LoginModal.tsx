import React from 'react';
import styled from 'styled-components';
import { flexBox, boxShadow } from '@lib/styles/mixin';
import { Palette } from '@lib/styles/Palette';
import { ToggleHandler } from '@common/Modal/useModal';

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

const LoginModal = ({ hide }: { hide: ToggleHandler }) => {
  return (
    <LoginDiv>
      <LoginForm>
        <LoginLabel htmlFor={'userId'}>아이디</LoginLabel>
        <LoginInput id={'userId'} name={'userId'} type={'text'} placeholder={'username@mail'} required />
        <LoginLabel htmlFor={'password'}>비밀번호</LoginLabel>
        <LoginInput id={'password'} name={'password'} type={'password'} placeholder={'비밀번호'} required />
        <LoginBtnDiv>
          <LoginBtn className={'modal-close-button'} type={'button'} color={Palette.RED} onClick={hide}>
            취소
          </LoginBtn>
          <LoginBtn type={'submit'} color={Palette.ACTIVE}>
            로그인
          </LoginBtn>
        </LoginBtnDiv>
      </LoginForm>
      <AuthBtnDiv>
        <AuthBtn color={Palette.GREEN}>회원가입</AuthBtn>
      </AuthBtnDiv>
    </LoginDiv>
  );
};

export default LoginModal;

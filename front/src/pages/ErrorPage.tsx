import React from 'react';
import styled from 'styled-components';
import logo from '@assets/images/logo2.png';
import { flexBox } from '@src/lib/styles/mixin';

const ErrorPage = () => {
  return (
    <ViewportDiv>
      <img src={logo} alt={'logo'} />
      <h1>페이지가 존재하지 않습니다</h1>
      <p>링크를 잘못 입력하셨거나 페이지가 삭제/이동 되었을 수 있습니다.</p>
    </ViewportDiv>
  );
};

export default ErrorPage;

const ViewportDiv = styled.div`
  ${flexBox('center', 'center', 'column')};
  width: 100vw;
  height: 100vh;
  text-align: center;
`;

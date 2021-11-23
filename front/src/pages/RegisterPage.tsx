import React from 'react';
import styled from 'styled-components';
import Register from '@components/Register/Register';
import { flexBox } from '@lib/styles/mixin';
import { RegisterInfoProvider } from '@src/contexts/RegisterContext';

const RegisterPageDiv = styled.div`
  width: 100vw;
  height: 100vh;
  ${flexBox('center', 'center')};
`;

const RegisterPage = () => {
  return (
    <RegisterPageDiv>
      <RegisterInfoProvider>
        <Register />
      </RegisterInfoProvider>
    </RegisterPageDiv>
  );
};

export default RegisterPage;

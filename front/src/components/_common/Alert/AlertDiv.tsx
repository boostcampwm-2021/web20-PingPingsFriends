import React from 'react';
import styled from 'styled-components';
import { boxShadow } from '@lib/styles/mixin';
import { Palette } from '@lib/styles/Palette';

const AlertDivBlock = styled.div`
  ${boxShadow('20px')};
  background-color: ${Palette.WHITE};
  width: 300px;
  height: 200px;
  text-align: center;
  line-height: 200px;
`;

const AlertDiv = ({ children }: { children: React.ReactNode }) => {
  return <AlertDivBlock>{children}</AlertDivBlock>;
};

export default AlertDiv;

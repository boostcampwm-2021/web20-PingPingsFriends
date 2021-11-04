import { Palette } from '../../lib/styles/palette';
import React from 'react';
import styled from 'styled-components';
import Place from './Place';
import UserInfo from './UserInfo';
import { flexBox } from '../../lib/styles/mixin';

const LOGO: string = '핑핑이 친구들';

const HeaderBlock = styled.div`
  ${flexBox('space-between', 'center')};
  width: 100%;
  height: 54px;
  padding: 0 12px;
  border-bottom: solid ${Palette.gray} 1px;
  ${flexBox('space-between', 'center')}
`;

const Header = () => {
  return (
    <HeaderBlock>
      <div className={'Logo'}>{LOGO}</div>
      <Place />
      <UserInfo />
    </HeaderBlock>
  );
};

export default Header;

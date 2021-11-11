import React from 'react';
import styled from 'styled-components';
import Avatar from '../_common/Avatar/Avatar';
import { flexBox } from '../../lib/styles/mixin';
import { ReactComponent as HamburgerMenuSvg } from '../../assets/icons/hamburger_menu.svg';

const UserInfoBlock = styled.div`
  ${flexBox('center', 'center')}
  .username {
    margin-right: 5px;
  }
`;

interface UserInfoProps {
  username?: string;
}

const UserInfo = ({ username = '핑핑이' }: UserInfoProps) => {
  return (
    <UserInfoBlock>
      <div className={'username'}>{username}</div>
      <Avatar size={'30px'} />
      <HamburgerMenuSvg />
    </UserInfoBlock>
  );
};

export default UserInfo;

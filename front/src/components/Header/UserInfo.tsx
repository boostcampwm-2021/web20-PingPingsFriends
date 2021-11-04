import React from 'react';
import styled from 'styled-components';
import Avatar from '../_common/Avatar/Avatar';
import { flexBox } from '../../lib/styles/mixin';
import { ReactComponent as BottomArrow } from '../../assets/icons/bottom_arrow.svg';

const UserInfoBlock = styled.div`
  ${flexBox('center', 'flex-end')}
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
      <Avatar />
      <BottomArrow />
    </UserInfoBlock>
  );
};

export default UserInfo;

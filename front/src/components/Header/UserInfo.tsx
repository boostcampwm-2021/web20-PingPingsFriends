import React from 'react';
import styled from 'styled-components';
import Avatar from '../_common/Avatar/Avatar';
import { flexBox } from '../../lib/styles/mixin';

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
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 10L12 15L17 10H7Z" fill="black" />
      </svg>
    </UserInfoBlock>
  );
};

export default UserInfo;

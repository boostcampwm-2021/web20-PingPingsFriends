import React from 'react';
import styled from 'styled-components';
import Avatar from '@common/Avatar/Avatar';
import Modal from '@common/Modal/Modal';
import useModal from '@common/Modal/useModal';
import LoginModal from '@components/LoginModal/LoginModal';
import DropBox from '@common/DropBox/DropBox';
import { makeDropBoxMenu } from '@common/DropBox/makeDropBoxMenu';
import { flexBox } from '@lib/styles/mixin';
import { ReactComponent as HamburgerMenuSvg } from '@assets/icons/hamburger_menu.svg';
import MagicNumber from '@src/lib/styles/magic';
import { useHistory } from 'react-router-dom';

const UserInfoBlock = styled.div`
  ${flexBox('center', 'center')}
  .username {
    margin-right: 5px;
  }
  position: relative;
`;

interface UserInfoProps {
  username?: string;
}

const UserInfo = ({ username = '핑핑이' }: UserInfoProps) => {
  const history = useHistory();
  const { isShowing, toggle } = useModal();

  const moveRegisterPage = () => history.push('/register');

  const dropboxMenu = makeDropBoxMenu([
    { text: '로그인', handler: toggle },
    { text: '회원가입', handler: moveRegisterPage },
  ]);
  return (
    <UserInfoBlock>
      <div className={'username'}>{username}</div>
      <Avatar size={'30px'} />
      <DropBox start={'right'} offset={0} top={parseInt(MagicNumber.HEADER_HEIGHT)} width={150} items={dropboxMenu}>
        <HamburgerMenuSvg className={'button'} />
      </DropBox>
      <Modal isShowing={isShowing} hide={toggle}>
        <LoginModal hide={toggle} />
      </Modal>
    </UserInfoBlock>
  );
};

export default UserInfo;

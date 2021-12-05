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
import { useUserState, useUserDispatch } from '@src/contexts/UserContext';
import { fetchAPI, getAuthOption } from '@lib/utils/fetch';

const UserInfoBlock = styled.div`
  ${flexBox('center', 'center')}
  .username {
    margin-right: 5px;
    font-size: 0.5em;
  }

  position: relative;
  .button {
    margin-left: 5px;
  }
`;

const UserInfo = () => {
  const history = useHistory();
  const { isShowing, toggle, routePath } = useModal('login');
  const userState = useUserState();
  const userDispatch = useUserDispatch();

  const moveRegisterPage = () => history.push('/register');

  const dropboxMenu = makeDropBoxMenu([
    { text: '로그인', handler: toggle },
    { text: '회원가입', handler: moveRegisterPage },
  ]);
  const loginedDropboxMenu = makeDropBoxMenu([
    {
      text: '로그아웃',
      handler: () => {
        fetchAPI(
          `/api/users/logout`,
          () => {
            userDispatch({ type: 'LOGOUT_USER' });
            history.push('/');
          },
          (failResponse) => {
            console.log(failResponse);
          },
          (err) => {
            console.log(err);
          },
          getAuthOption('DELETE', userState.data?.accessToken)
        );
      },
    },
  ]);

  return (
    <UserInfoBlock>
      <div className={'username'}>{userState.data?.nickname}</div>
      <Avatar size={'30px'} imgSrc={userState.data?.url} userId={userState.data?.userId} />
      <DropBox start={'right'} offset={0} top={parseInt(MagicNumber.HEADER_HEIGHT)} width={150} items={userState.data?.userId === -1 ? dropboxMenu : loginedDropboxMenu}>
        <HamburgerMenuSvg className={'button'} />
      </DropBox>
      <Modal isShowing={isShowing} hide={toggle} routePath={routePath}>
        <LoginModal hide={toggle} />
      </Modal>
    </UserInfoBlock>
  );
};

export default UserInfo;

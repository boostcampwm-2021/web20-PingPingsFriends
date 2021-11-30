import React from 'react';
import styled from 'styled-components';
import HabitatModal from '@components/HabitatModal/HabitatModal';
import Place from './Place';
import UserInfo from './UserInfo';
import { flexBox } from '@lib/styles/mixin';
import { Palette } from '@lib/styles/Palette';
import MagicNumber from '@lib/styles/magic';
import Modal from '@common/Modal/Modal';
import useModal from '@common/Modal/useModal';
import { HabitatInfo } from '@src/types/Habitat';
import logo from '@assets/images/logo2.png';
import { useHistory } from 'react-router-dom';

const HeaderBlock = styled.div`
  ${flexBox('space-between', 'center')};
  flex-shrink: 0;
  width: 100%;
  height: ${MagicNumber.HEADER_HEIGHT};
  padding: 0 12px;
  border-bottom: solid ${Palette.GRAY} 1px;
  background: ${Palette.WHITE};
  .logo {
    height: 50px;
    object-fit: cover;
    &:hover {
      cursor: pointer;
    }
  }
`;

interface HeaderProps {
  habitatInfo: HabitatInfo | undefined | null;
}

const Header = ({ habitatInfo }: HeaderProps) => {
  const { isShowing, toggle, routePath } = useModal('habitats');
  const history = useHistory();

  const handleClick = () => {
    history.push('/');
  };

  return (
    <HeaderBlock>
      <img className={'logo'} src={logo} alt={'로고'} onClick={handleClick} />
      <Place habitatInfo={habitatInfo} toggle={toggle} />
      <UserInfo />
      <Modal isShowing={isShowing} hide={toggle} routePath={routePath}>
        <HabitatModal hide={toggle} />
      </Modal>
    </HeaderBlock>
  );
};

export default Header;

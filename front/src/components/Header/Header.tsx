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
  & > * {
    flex-basis: 33%;
  }
  .place-container {
    ${flexBox('center', 'center')};
  }
  .user-info-container {
    ${flexBox('flex-end', 'center')};
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
      <div>
        <img className={'logo'} src={logo} alt={'로고'} onClick={handleClick} />
      </div>
      <div className={'place-container'}>
        <Place habitatInfo={habitatInfo} toggle={toggle} />
      </div>
      <div className={'user-info-container'}>
        <UserInfo />
      </div>
      <Modal isShowing={isShowing} hide={toggle} routePath={routePath}>
        <HabitatModal hide={toggle} />
      </Modal>
    </HeaderBlock>
  );
};

export default Header;

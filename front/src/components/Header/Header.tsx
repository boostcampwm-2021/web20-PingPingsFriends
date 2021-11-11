import { Palette } from '../../lib/styles/Palette';
import React from 'react';
import styled from 'styled-components';
import Place from './Place';
import UserInfo from './UserInfo';
import { flexBox } from '../../lib/styles/mixin';
import useModal from '../_common/Modal/useModal';
import Modal from '../_common/Modal/Modal';
import HabitatModal from '../HabitatModal/HabitatModal';
import { HabitatInfo } from '../../hooks/useHabitatInfo';

const LOGO: string = '핑핑이 친구들';

const HeaderBlock = styled.div`
  ${flexBox('space-between', 'center')};
  flex-shrink: 0;
  width: 100%;
  height: 54px;
  padding: 0 12px;
  border-bottom: solid ${Palette.GRAY} 1px;
  background: ${Palette.WHITE};
`;

interface HeaderProps {
  habitatInfo: HabitatInfo | undefined;
}

const Header = ({ habitatInfo }: HeaderProps) => {
  const { isShowing, toggle } = useModal();

  return (
    <HeaderBlock>
      <div className={'Logo'}>{LOGO}</div>
      <Place habitat={habitatInfo?.name} toggle={toggle} />
      <UserInfo />
      <Modal children={<HabitatModal />} isShowing={isShowing} hide={toggle} />
    </HeaderBlock>
  );
};

export default Header;

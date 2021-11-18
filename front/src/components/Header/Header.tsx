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
import { HabitatInfo } from '@hooks/useHabitatInfo';

const LOGO: string = '핑핑이 친구들';

const HeaderBlock = styled.div`
  ${flexBox('space-between', 'center')};
  flex-shrink: 0;
  width: 100%;
  height: ${MagicNumber.HEADER_HEIGHT};
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
      <Modal isShowing={isShowing} hide={toggle}>
        <HabitatModal hide={toggle} />
      </Modal>
    </HeaderBlock>
  );
};

export default Header;

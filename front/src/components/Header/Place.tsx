import React from 'react';
import styled from 'styled-components';
import { Palette } from '@lib/styles/Palette';
import { flexBox } from '@lib/styles/mixin';
import { ToggleHandler } from '@common/Modal/useModal';
import { HabitatInfo } from '@src/types/Habitat';

const PlaceBlock = styled.div<{ color: string | undefined }>`
  ${flexBox()}
  font-size:30px;
  border-radius: 10px;
  border: 2px solid ${Palette.LIGHT_GRAY};
  width: 200px;
  background-color: ${(props) => props.color ?? 'white'};
  &:hover {
    cursor: pointer;
  }
`;

interface PlaceProps {
  habitatInfo: HabitatInfo | null | undefined;
  toggle: ToggleHandler;
}

const Place = ({ habitatInfo, toggle }: PlaceProps) => {
  return (
    <PlaceBlock color={habitatInfo?.habitat.color} onClick={toggle}>
      {' '}
      {habitatInfo?.habitat.name ?? '공허'}{' '}
    </PlaceBlock>
  );
};

export default Place;

import React from 'react';
import styled from 'styled-components';
import { flexBox } from '@lib/styles/mixin';
import { ToggleHandler } from '@common/Modal/useModal';
import { HabitatInfo } from '@src/types/Habitat';

const PlaceBlock = styled.div<{ color: string | undefined }>`
  ${flexBox()}
  font-size: 20px;
  border-radius: 10px;
  padding: 8px;
  width: 200px;
  height: 40px;
  background-color: ${(props) => props.color ?? 'white'};
  //border: 1px solid black;
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
      {habitatInfo?.habitat.name ?? '이동 중...'}
    </PlaceBlock>
  );
};

export default Place;

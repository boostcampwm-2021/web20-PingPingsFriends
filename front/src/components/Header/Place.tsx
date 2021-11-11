import React from 'react';
import styled from 'styled-components';
import { Palette } from '../../lib/styles/Palette';
import { flexBox } from '../../lib/styles/mixin';
import { ToggleHandler } from '../_common/Modal/useModal';

const PlaceBlock = styled.div`
  ${flexBox()}

  border-radius: 10px;
  border: 1px solid ${Palette.GRAY};
  width: 200px;
  padding: 12px;
  &:hover {
    cursor: pointer;
  }
`;

interface PlaceProps {
  habitat: string | undefined;
  toggle: ToggleHandler;
}

const Place = ({ habitat, toggle }: PlaceProps) => {
  return <PlaceBlock onClick={toggle}> {habitat} </PlaceBlock>;
};

export default Place;

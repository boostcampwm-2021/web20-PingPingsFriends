import React from 'react';
import styled from 'styled-components';
import { Palette } from '../../lib/styles/palette';
import { flexBox } from '../../lib/styles/mixin';

const PlaceBlock = styled.div`
  ${flexBox()}

  border-radius: 10px;
  border: 1px solid ${Palette.gray};
  width: 200px;
  padding: 12px;
  &:hover {
    cursor: pointer;
  }
`;

interface PlaceProps {
  habitat?: string;
}

const Place = ({ habitat = '서식지' }: PlaceProps) => {
  return <PlaceBlock> {habitat} </PlaceBlock>;
};

export default Place;

import { css } from 'styled-components';
import { Palette } from './Palette';

type FlexOption = 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' | null;
type Direction = 'column' | 'row' | null;

export const flexBox = (justify: FlexOption = 'center', align: FlexOption = 'center', direction: Direction = 'row') => css`
  display: flex;
  justify-content: ${justify};
  align-items: ${align};
  flex-direction: ${direction};
`;

export const boxShadow = (borderRadius: string) => css`
  border-radius: ${borderRadius};
  box-shadow: 0 4px 10px rgba(51, 51, 51, 1), 0 0 4px rgba(51, 51, 51, 0.5);
`;

export const prettyScroll = () => css`
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${Palette.GRAY};
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: ${Palette.LIGHT_GRAY};
    border-radius: 10px;
  }
`;

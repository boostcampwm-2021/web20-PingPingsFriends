import { css } from 'styled-components';

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

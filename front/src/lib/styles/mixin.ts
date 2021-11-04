import { css } from 'styled-components';

type FlexOption = 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' | null;
type Direction = 'column' | 'row' | null;

export const flexBox = (justify: FlexOption = 'center', align: FlexOption = 'center', direction: Direction = 'row') => css`
  display: flex;
  justify-content: ${justify};
  align-items: ${align};
  flex-direction: ${direction};
`;

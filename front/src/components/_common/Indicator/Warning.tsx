import React from 'react';
import { ReactComponent as WarningSvg } from '@assets/icons/warning.svg';
import styled, { css } from 'styled-components';
import { Palette } from '@src/lib/styles/Palette';

interface SizeProps {
  width: string;
  height: string;
}

const Warning = ({ width, height }: SizeProps) => {
  return (
    <WarningDiv width={width} height={height}>
      <WarningSvg />
    </WarningDiv>
  );
};

export default Warning;

const WarningDiv = styled.div<SizeProps>`
  margin: auto;
  ${(props) => css`
    height: ${props.height};
    width: ${props.width};
  `}
  svg {
    fill: ${Palette.RED};
    width: 100%;
    height: 100%;
  }
`;

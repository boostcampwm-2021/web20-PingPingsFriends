import React from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as LoadingSvg } from '@assets/icons/loading.svg';

interface SizeProps {
  width: string;
  height: string;
}

const Loading = ({ width, height }: SizeProps) => {
  return (
    <LoadingDiv width={width} height={height}>
      <LoadingSvg />
    </LoadingDiv>
  );
};

export default Loading;

const LoadingDiv = styled.div<SizeProps>`
  margin: auto;

  svg {
    @keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }
    animation: rotate 3s linear infinite;
    fill: white;
    ${(props) => css`
      width: ${props.width};
      height: ${props.height};
    `};
  
`;

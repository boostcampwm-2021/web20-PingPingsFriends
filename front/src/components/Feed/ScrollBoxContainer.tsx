import React from 'react';
import styled from 'styled-components';

const ScrollContainerBlock = styled.div<Partial<ScrollContainerProps>>`
  width: 100%;
  height: ${(props) => props.height}px;
  position: relative;
`;

interface ScrollContainerProps {
  height?: number;
  children: React.ReactNode;
}

const ScrollContainer = ({ children, height }: ScrollContainerProps) => {
  return <ScrollContainerBlock children={children} height={height} />;
};

export default ScrollContainer;

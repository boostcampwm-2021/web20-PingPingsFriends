import React from 'react';
import styled from 'styled-components';

const ViewPortBlock = styled.div<Partial<ViewPortProps>>`
  transform: translateY(${(props) => props.offset}px);
  width: 100%;
  position: absolute;
`;

interface ViewPortProps {
  offset: number;
  children: React.ReactNode;
}

const ViewPort = ({ offset, children }: ViewPortProps) => {
  return <ViewPortBlock offset={offset}>{children}</ViewPortBlock>;
};

export default ViewPort;

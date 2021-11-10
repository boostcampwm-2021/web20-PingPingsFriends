import React from 'react';
import styled from 'styled-components';

const CarouselContentsDiv = styled.div<Partial<CarouselContentsProps>>`
  display: flex;
  transform: translateX(-${(props) => props.trans}px);
  transition: 0.45s;
  width: ${(props) => props.width};
  height: 100%;
`;

interface CarouselContentsProps {
  trans: number;
  width: number;
  children: React.ReactNode;
}

const CarouselContents = ({ children, trans, width }: CarouselContentsProps) => {
  return (
    <CarouselContentsDiv trans={trans} width={width}>
      {children}
    </CarouselContentsDiv>
  );
};

export default CarouselContents;

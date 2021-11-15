import React from 'react';
import styled from 'styled-components';
import { ReactComponent as LeftArrowSvg } from '@assets/icons/left_arrow.svg';
import { ReactComponent as RightArrowSvg } from '@assets/icons/right_arrow.svg';

const ArrowDiv = styled.div<Partial<ArrowProps>>`
  position: absolute;
  top: calc(50% - 24px);
  width: 24px;
  height: 24px;
  ${({ direction }) => (direction === 'right' ? `right:5px` : `left:5px`)};
  svg {
    box-shadow: 0 0 3px 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.35);
  }

  &:hover {
    cursor: pointer;
  }
`;

interface ArrowProps {
  direction: string;
  handleClick: () => void;
}

const Arrow = ({ direction, handleClick }: ArrowProps) => {
  return (
    <ArrowDiv direction={direction} onClick={handleClick}>
      {direction === 'right' ? <RightArrowSvg /> : <LeftArrowSvg />}
    </ArrowDiv>
  );
};

export default Arrow;

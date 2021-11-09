import React from 'react';
import styled from 'styled-components';
import { ReactComponent as LeftArrowSvg } from '../../assets/icons/left_arrow.svg';
import { ReactComponent as RightArrowSvg } from '../../assets/icons/right_arrow.svg';

const ArrowBlock = styled.div<Partial<ArrowProps>>`
  position: absolute;
  top: calc(50% - 24px);
  width: 24px;
  height: 24px;
  ${({ direction }) => (direction === 'right' ? `right:0` : `left:0`)};
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
    <ArrowBlock direction={direction} onClick={handleClick}>
      {direction === 'right' ? <RightArrowSvg /> : <LeftArrowSvg />}
    </ArrowBlock>
  );
};

export default Arrow;

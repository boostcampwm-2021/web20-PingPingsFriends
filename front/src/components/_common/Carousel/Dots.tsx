import React from 'react';
import styled from 'styled-components';
import { Palette } from '@lib/styles/Palette';
import { flexBox } from '@lib/styles/mixin';

const DotsDiv = styled.div`
  ${flexBox('center', 'center')};
  position: absolute;
  width: 100%;
`;
const DotsUl = styled.ul`
  ${flexBox('space-evenly', 'center')};
  width: 30%;
  height: 10px;
  position: absolute;
  bottom: 5px;
`;

interface DotStyledProps {
  active: boolean;
}

const DotLi = styled.li<DotStyledProps>`
  border-radius: 50%;
  width: 6px;
  height: 6px;
  background: ${({ active }) => (active ? Palette.ACTIVE : Palette.GRAY)};
`;
interface DotsProps {
  slides: string[];
  slideIndex: number;
}

const Dots = ({ slides, slideIndex }: DotsProps) => {
  return (
    <DotsDiv>
      <DotsUl>
        {slides.map((v, index) => (
          <DotLi key={index.toString() + 'dot' + v} active={slideIndex === index} />
        ))}
      </DotsUl>
    </DotsDiv>
  );
};

export default Dots;

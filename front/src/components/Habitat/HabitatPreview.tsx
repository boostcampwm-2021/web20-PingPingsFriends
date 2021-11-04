import React from 'react';
import styled from 'styled-components';
import { flexBox } from '../../lib/styles/mixin';

const HabitatPreviewBlock = styled.div<HabitatPreviewProps>`
  ${flexBox('center', null, 'column')}

  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  top: 25vh;
  background: ${({ color }) => color};
  padding: 100px;

  ${({ side }) => {
    const leftTemplate = `
      left: -250px;
      align-items: flex-end;
    `;
    const rightTemplate = `
      right: -250px;
      align-items: flex-start;
    `;
    return side === 'right' ? rightTemplate : leftTemplate;
  }};
`;

interface HabitatPreviewProps {
  side: string;
  color: string;
}

const HabitatPreview = ({ side, color }: HabitatPreviewProps) => {
  return (
    <HabitatPreviewBlock side={side} color={color}>
      <div>avatars</div>
      <div>마리의 동물들</div>
      <div>의 게시글</div>
      <div>최근 활동: </div>
      <div>우두머리</div>
      <div>장소</div>
    </HabitatPreviewBlock>
  );
};

export default HabitatPreview;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { flexBox } from '../../lib/styles/mixin';
import MagicNumber from '../../lib/styles/magic';

const HabitatPreviewBlock = styled.div<HabitatPreviewProps>`
  ${flexBox('center', null, 'column')}

  position: absolute;
  border-radius: 50%;
  top: 0;
  transform: translateY(50vh) ${(props) => `translateY(-${props.radius - parseInt(MagicNumber.HEADER_HEIGHT) / 2}px)`};
  background: ${({ color }) => color};

  ${({ side, radius }) => {
    const commonTemplate = `
      width: ${radius * 2}px;
      height: ${radius * 2}px;
      padding: ${radius / 3}px;
      ${radius < 100 ? 'display:none' : ''}
    `;
    const leftTemplate = `
      left: -${radius}px;
      align-items: flex-end;
    `;
    const rightTemplate = `
      right: -${radius}px;
      align-items: flex-start;
    `;
    return side === 'right' ? rightTemplate + commonTemplate : leftTemplate + commonTemplate;
  }};
`;

interface HabitatPreviewProps {
  side: string;
  color: string;
  radius: number;
}

const HabitatPreview = ({ side, color }: Omit<HabitatPreviewProps, 'radius'>) => {
  const HABITAT_OFFSET = 50;
  const getResponsiveRadius = () => Math.min((window.innerWidth - parseInt(MagicNumber.FEED_SECTION_WIDTH) - HABITAT_OFFSET) / 2, parseInt(MagicNumber.MAX_PREVIEW_RADIUS));
  const [radius, setRadius] = useState(getResponsiveRadius());
  const changeResponsiveRadius = () => {
    setRadius(getResponsiveRadius());
  };

  useEffect(() => {
    window.addEventListener('resize', changeResponsiveRadius);
    return () => {
      window.removeEventListener('resize', changeResponsiveRadius);
    };
  }, []);

  return (
    <HabitatPreviewBlock side={side} color={color} radius={radius}>
      {radius > 150 ? (
        <>
          <div>avatars</div>
          <div>마리의 동물들</div>
          <div>의 게시글</div>
          <div>최근 활동: </div>
          <div>우두머리</div>
        </>
      ) : null}

      <div>장소</div>
    </HabitatPreviewBlock>
  );
};

export default HabitatPreview;

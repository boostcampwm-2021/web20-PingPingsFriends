import React from 'react';
import { ReactComponent as HeartSvg } from '@assets/icons/empty_heart_btn.svg';
import styled from 'styled-components';
import { flexBox } from '@src/lib/styles/mixin';

const HeartDiv = styled.div`
  ${flexBox('flex-start')};
  margin-top: 10px;
`;

interface HeartSectionProps {
  feedId: string | undefined;
}

const HeartSection = ({ feedId }: HeartSectionProps) => {
  return (
    <HeartDiv>
      <HeartSvg />
      <span>{34} likes</span>
    </HeartDiv>
  );
};

export default HeartSection;

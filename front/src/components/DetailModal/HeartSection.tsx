import React from 'react';
import styled from 'styled-components';
import { flexBox } from '@src/lib/styles/mixin';
import HeartButton from '@components/HeartButton/HeartButton';
import { LikeProps } from '@components/HeartButton/useLike';

const HeartDiv = styled.div`
  ${flexBox('flex-start')};
  margin-top: 10px;
`;

interface HeartSectionProps extends LikeProps {
  numOfHearts: number;
}

const HeartSection = ({ like, toggleLike, numOfHearts }: HeartSectionProps) => {
  return (
    <HeartDiv>
      <HeartButton like={like} toggleLike={toggleLike} />
      <span>{numOfHearts + (like ? 1 : 0)} likes</span>
    </HeartDiv>
  );
};

export default HeartSection;

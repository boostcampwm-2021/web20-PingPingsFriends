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
  syncNumberOfHeart: number | null;
}

const HeartSection = ({ like, toggleLike, numOfHearts, syncNumberOfHeart }: HeartSectionProps) => {
  return (
    <HeartDiv>
      <HeartButton like={like} toggleLike={toggleLike} />
      <span>{syncNumberOfHeart !== null ? syncNumberOfHeart : numOfHearts} likes</span>
    </HeartDiv>
  );
};

export default HeartSection;

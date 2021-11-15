import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { ReactComponent as EmptyHeartSvg } from '@assets/icons/empty_heart_btn.svg';
import { ReactComponent as FillHeartSvg } from '@assets/icons/fill_heart_btn.svg';
import { LikeProps } from './useLike';

const ButtonScale = keyframes`
  0% {
    transform:  scale(1);
  }
  50% {
    transform:  scale(1.3);
  }
  100% {
    transform:  scale(1);
  }
`;
const animation = () =>
  css`
    ${ButtonScale} 0.45s ease-in-out;
  `;

const HeartButtonDiv = styled.div<Partial<LikeProps>>`
  position: relative;
  animation: ${({ like }) => like && animation};
  &:hover {
    cursor: pointer;
  }
`;

const HeartButton = ({ like, toggleLike }: LikeProps) => {
  return (
    <HeartButtonDiv onClick={toggleLike} like={like}>
      {like ? <FillHeartSvg /> : <EmptyHeartSvg />}
    </HeartButtonDiv>
  );
};

export default HeartButton;

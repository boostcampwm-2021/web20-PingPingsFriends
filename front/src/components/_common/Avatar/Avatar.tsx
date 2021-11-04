import React from 'react';
import styled from 'styled-components';

export const DEFAULT_AVATAR = `default_avatar.png`;

const AvatarBlock = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
  }
`;

interface AvatarProps {
  imgSrc?: string;
}

const Avatar = ({ imgSrc = DEFAULT_AVATAR }: AvatarProps) => {
  return (
    <AvatarBlock>
      <img src={imgSrc} alt="아바타 이미지" />
    </AvatarBlock>
  );
};

export default Avatar;

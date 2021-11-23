import React from 'react';
import styled from 'styled-components';
export const DEFAULT_AVATAR = `/default_avatar.png`;

const AvatarBlock = styled.div<Omit<AvatarProps, 'imgSrc'>>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

interface AvatarProps {
  imgSrc?: string;
  size: string;
}

const Avatar = ({ imgSrc = DEFAULT_AVATAR, size }: AvatarProps) => {
  return (
    <AvatarBlock size={size}>
      <img src={imgSrc} alt="아바타 이미지" />
    </AvatarBlock>
  );
};

export default Avatar;

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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
  userId?: number;
}

const Avatar = ({ imgSrc = DEFAULT_AVATAR, size, userId }: AvatarProps) => {
  return (
    <AvatarBlock size={size}>
      <Link to={userId && userId !== -1 ? `/user/${userId}` : ''}>
        <img src={imgSrc} alt="아바타 이미지" />
      </Link>
    </AvatarBlock>
  );
};

export default Avatar;

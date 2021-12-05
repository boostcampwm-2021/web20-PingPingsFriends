import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
export const DEFAULT_AVATAR = `/default_avatar.png`;

const AvatarBlock = styled.div<Omit<AvatarProps, 'imgSrc'>>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 50%;
  flex-shrink: 0;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

interface AvatarProps {
  imgSrc?: string | null;
  size: string;
  userId?: number;
  preventLink?: boolean;
}

const Avatar = ({ imgSrc, size, userId, preventLink }: AvatarProps) => {
  return (
    <AvatarBlock size={size}>
      {preventLink ? (
        <img src={imgSrc?.replace('.webp', '-profile.webp') ?? DEFAULT_AVATAR} alt="아바타 이미지" />
      ) : (
        <Link to={userId && userId !== -1 ? `/user/${userId}` : '#'}>
          <img src={imgSrc?.replace('.webp', '-profile.webp') ?? DEFAULT_AVATAR} alt="아바타 이미지" />
        </Link>
      )}
    </AvatarBlock>
  );
};

export default Avatar;

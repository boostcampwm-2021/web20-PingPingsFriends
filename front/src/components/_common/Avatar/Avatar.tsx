import React from 'react';
import styled from 'styled-components';

export const DEFAULT_IMG_SRC = `https://user-images.githubusercontent.com/45571631/140061082-73c5bc5a-4505-4bc2-a03e-debeb693e74f.png`;

const AvatarBlock = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
  }
`;

interface AvatarProps {
  imgSrc?: string;
}

const Avatar = ({ imgSrc }: AvatarProps) => {
  return <AvatarBlock>{imgSrc ? <img src={imgSrc} alt="로그인 이미지" /> : <img src={DEFAULT_IMG_SRC} alt="로그아웃 이미지" />}</AvatarBlock>;
};

export default Avatar;

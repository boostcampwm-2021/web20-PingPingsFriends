import React, { useState } from 'react';
import styled from 'styled-components';
import { Post } from '@src/types/Post';
import { Palette } from '@src/lib/styles/Palette';
import Avatar from '../_common/Avatar/Avatar';
import { flexBox } from '@src/lib/styles/mixin';
import { formatDate } from '@lib/utils/time';
import { ReactComponent as HeartSvg } from '@assets/icons/fill_heart_btn.svg';

const Cell = ({ feedInfo, url }: { feedInfo: Post; url: string }) => {
  const [isHover, setHover] = useState(false);
  return (
    <CellDiv
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <ExploreImg src={url.replace('.webp', '-feed.webp')} alt={feedInfo.post_id.toString()} />
      <HoverDiv isHover={isHover}>
        <Avatar imgSrc={feedInfo.user_image_url ?? undefined} size={'50px'} />
        <p>{feedInfo.nickname}</p>
        <p>{formatDate(feedInfo.created_at)} 전</p>
        <div>
          <HeartSvg />
          <span>{feedInfo.numOfHearts}</span>
        </div>
      </HoverDiv>
    </CellDiv>
  );
};

export default Cell;

const CellDiv = styled.div`
  width: 300px;
  height: 300px;
  display: inline-block;
  margin: 5px 5px;
  border: 1px solid ${Palette.GRAY};
  position: relative;
`;

const ExploreImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HoverDiv = styled.div<{ isHover: boolean }>`
  ${flexBox('center', 'center', 'column')};
  font-size: 30px;
  color: white;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  opacity: ${(props) => (props.isHover ? 1 : 0)};
`;

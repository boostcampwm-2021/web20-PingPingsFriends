import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import Avatar from '../_common/Avatar/Avatar';
import useHabitatInfo from '../../hooks/useHabitatInfo';
import { flexBox } from '../../lib/styles/mixin';
import MagicNumber from '../../lib/styles/magic';
import { Palette } from '../../lib/styles/Palette';
import { compareTime } from '../../lib/utils/time';

const HabitatPreviewBlock = styled.div<Pick<HabitatPreviewProps, 'side'> & { radius: number }>`
  ${flexBox('center', null, 'column')}
  position: absolute;
  border-radius: 50%;
  transform: translateY(50vh) ${(props) => `translateY(-${props.radius - parseInt(MagicNumber.HEADER_HEIGHT) / 2}px)`};
  background: ${({ color }) => color ?? Palette.GRAY};
  cursor: pointer;
  transition: background-color 0.5s ease-out 0s;
  font-size: min(1.5vw, 18px);

  ${({ side, radius }) => {
    const commonTemplate = `
      width: ${radius * 2}px;
      height: ${radius * 2}px;
    `;
    const leftTemplate = `
      left: -${radius}px;
      align-items: flex-start;
      padding-left: ${radius}px;
      text-align: left;
    `;
    const rightTemplate = `
      right: -${radius}px;
      align-items: flex-end;
      padding-right: ${radius}px;
      text-align: right;
    `;
    return side === 'right' ? rightTemplate + commonTemplate : leftTemplate + commonTemplate;
  }};
`;

const TitleDiv = styled.div<{ radius: number }>`
  transform: translateY(${(props) => props.radius * 0.2}px);
  white-space: nowrap;
  .habitat_name {
    font-weight: bold;
    font-size: 2em;
  }
  .habitat_king {
    font-size: 1em;
  }
`;

const ShrinkTitleDiv = styled.div`
  font-size: 2em;
  font-weight: bold;
  word-break: keep-all;
`;

const DetailDiv = styled.div<{ radius: number }>`
  text-align: center;
  font-size: 1.3em;
  width: ${(props) => props.radius}px;
  p {
    margin-bottom: 0.5em;
  }
`;

const AvatarDiv = styled.div<Pick<HabitatPreviewProps, 'side'> & { radius: number }>`
  ${flexBox('space-evenly', 'center')};
  width: ${(props) => props.radius}px;
  margin-bottom: 1.5em;
  ${(props) => {
    if (props.side === 'left')
      return css`
        padding-right: 1em;
      `;
    else
      return css`
        padding-left: 1em;
      `;
  }}
`;

interface HabitatPreviewProps {
  side: string;
  habitat: number;
  onClick: () => void;
}

const HabitatPreview = ({ side, habitat, onClick }: HabitatPreviewProps) => {
  const HABITAT_OFFSET = 50;
  const getResponsiveRadius = () => Math.min((window.innerWidth - parseInt(MagicNumber.FEED_SECTION_WIDTH) - HABITAT_OFFSET) / 2, parseInt(MagicNumber.MAX_PREVIEW_RADIUS));
  const [radius, setRadius] = useState(getResponsiveRadius());
  const changeResponsiveRadius = () => {
    setRadius(getResponsiveRadius());
  };
  const { habitatInfo } = useHabitatInfo(habitat);

  useEffect(() => {
    window.addEventListener('resize', changeResponsiveRadius);
    return () => {
      window.removeEventListener('resize', changeResponsiveRadius);
    };
  }, []);

  return (
    <>
      {radius > 100 && (
        <HabitatPreviewBlock side={side} color={habitatInfo?.color} radius={radius} onClick={onClick}>
          {habitatInfo !== undefined ? (
            <>
              {radius > 150 ? (
                <>
                  <AvatarDiv radius={radius} side={side}>
                    {habitatInfo.recentUser.map((imageURL, idx) => (
                      <Avatar imgSrc={imageURL} key={idx} size={'3em'} />
                    ))}
                  </AvatarDiv>
                  <DetailDiv radius={radius}>
                    <p>{habitatInfo.totalUser} 마리의 동물들</p>
                    <p>{habitatInfo.totalPost}개의 게시글</p>
                    <p>최근 활동 {compareTime(new Date(), new Date(habitatInfo.recentUpload))}</p>
                  </DetailDiv>
                  <TitleDiv radius={radius}>
                    <p className="habitat_king">우두머리: {habitatInfo.king}</p>
                    <p className="habitat_name">{habitatInfo.name}</p>
                  </TitleDiv>
                </>
              ) : (
                <ShrinkTitleDiv>{habitatInfo.name}</ShrinkTitleDiv>
              )}
            </>
          ) : (
            'Loading...'
          )}
        </HabitatPreviewBlock>
      )}
    </>
  );
};

export default HabitatPreview;

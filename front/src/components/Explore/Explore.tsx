import React, { RefObject, useEffect, useRef } from 'react';
import { HabitatInfo } from '@hooks/useHabitatInfo';
import styled from 'styled-components';
import { Palette } from '@lib/styles/Palette';

const ExploreDiv = styled.div<{ color: string | undefined }>`
  width: 300px;
  margin: auto;
  background-color: ${(props) => (props.color !== undefined ? props.color : Palette.PINK)};
  z-index: 1;
  transition: width 1s ease;
  height: 100%;
`;

const Explore = ({ habitatInfo }: { habitatInfo: HabitatInfo | undefined }) => {
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (divRef.current) divRef.current.style.width = '100%';
  }, []);
  return (
    <ExploreDiv ref={divRef} color={habitatInfo?.color}>
      adafds
    </ExploreDiv>
  );
};

export default Explore;

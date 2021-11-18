import React, { RefObject, useEffect, useRef } from 'react';
import { HabitatInfo } from '@src/types/Habitat';
import styled from 'styled-components';
import { Palette } from '@lib/styles/Palette';

const ExploreDiv = styled.div<{ color: string | undefined }>`
  width: 100%;
  margin: auto;
  background-color: ${(props) => (props.color !== undefined ? props.color : Palette.PINK)};
  z-index: 1;
  height: 100%;
  animation-duration: 1s;
  animation-name: zoomout;
  @keyframes zoomout {
    from {
      width: 300px;
    }
    to {
      width: 100%;
    }
  }
`;

const Explore = ({ habitatInfo }: { habitatInfo: HabitatInfo | undefined }) => {
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <ExploreDiv ref={divRef} color={habitatInfo?.habitat.color}>
      adafds
    </ExploreDiv>
  );
};

export default Explore;

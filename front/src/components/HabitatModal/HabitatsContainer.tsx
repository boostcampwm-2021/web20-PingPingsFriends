import React from 'react';
import styled from 'styled-components';
import { flexBox } from '../../lib/styles/mixin';
import { HabitatInfo } from '../../hooks/useHabitatInfo';

const HabitatsContainerDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-content: space-between;
  width: 650px;
  height: 320px;
  border: 1px black solid;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  padding: 20px;
`;
const HabitatBlockDiv = styled.div<Partial<HabitatInfo>>`
  ${flexBox('center', 'center')}
  width: 250px;
  height: 55px;
  border-radius: 30px;
  margin: 20px;
  background: ${({ color }) => color};
`;

interface HabitatsContainerProps {
  habitatInfos: HabitatInfo[];
}

const HabitatsContainer = ({ habitatInfos }: HabitatsContainerProps) => {
  return (
    <HabitatsContainerDiv>
      {habitatInfos.map((habitatInfo) => (
        <HabitatBlockDiv key={habitatInfo.name} color={habitatInfo.color}>
          {habitatInfo.name}
        </HabitatBlockDiv>
      ))}
      {habitatInfos.map((habitatInfo) => (
        <HabitatBlockDiv key={habitatInfo.name} color={habitatInfo.color}>
          {habitatInfo.name}
        </HabitatBlockDiv>
      ))}
      {habitatInfos.map((habitatInfo) => (
        <HabitatBlockDiv key={habitatInfo.name} color={habitatInfo.color}>
          {habitatInfo.name}
        </HabitatBlockDiv>
      ))}
    </HabitatsContainerDiv>
  );
};

export default HabitatsContainer;

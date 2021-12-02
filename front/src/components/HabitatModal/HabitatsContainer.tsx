import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { flexBox, prettyScroll } from '@lib/styles/mixin';
import { useHistory } from 'react-router-dom';
import { ToggleHandler } from '@common/Modal/useModal';
import { HabitatList } from '@src/types/Habitat';
import useDebounce from '@hooks/useDebounce';

interface HabitatsContainerProps {
  habitatInfos: HabitatList;
  hide: ToggleHandler;
  keyword: string;
}

const HabitatsContainer = ({ habitatInfos, keyword }: HabitatsContainerProps) => {
  const history = useHistory();
  const [arr, setArr] = useState<HabitatList>(habitatInfos);
  const text = useDebounce(keyword, 500);
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    history.push(`/?habitat=${target.dataset.id}`);
  };
  useEffect(() => {
    setArr(habitatInfos.filter((info) => info.name.includes(text)));
  }, [text]);

  return (
    <HabitatsContainerDiv>
      {arr.length
        ? arr.map((habitatInfo) => (
            <HabitatBlockDiv key={habitatInfo.name} color={habitatInfo.color} data-id={habitatInfo.id} onClick={handleClick}>
              {habitatInfo.name}
            </HabitatBlockDiv>
          ))
        : habitatInfos.map((habitatInfo) => (
            <HabitatBlockDiv key={habitatInfo.name} color={habitatInfo.color} data-id={habitatInfo.id} onClick={handleClick}>
              {habitatInfo.name}
            </HabitatBlockDiv>
          ))}
      <div />
    </HabitatsContainerDiv>
  );
};

export default HabitatsContainer;

const HabitatsContainerDiv = styled.div`
  ${prettyScroll()};
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-content: space-between;
  width: 650px;
  height: 320px;
  overflow-y: scroll;
  padding: 20px;
`;
const HabitatBlockDiv = styled.div<{ color: string }>`
  ${flexBox('center', 'center')}
  width: 250px;
  height: 55px;
  border-radius: 30px;
  margin: 20px;
  background: ${({ color }) => color};
`;

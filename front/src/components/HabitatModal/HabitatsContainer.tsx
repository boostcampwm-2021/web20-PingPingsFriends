import React from 'react';
import styled from 'styled-components';
import { flexBox, prettyScroll } from '@lib/styles/mixin';
import { useHistory } from 'react-router-dom';
import { ToggleHandler } from '@common/Modal/useModal';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import { useGetDiv } from '@hooks/useGetDiv';
import { HabitatLists } from '@src/types/Habitat';

interface HabitatsContainerProps {
  habitatInfos: HabitatLists;
  hide: ToggleHandler;
}

const HabitatsContainer = ({ habitatInfos, hide }: HabitatsContainerProps) => {
  const history = useHistory();
  const [root, rootRef] = useGetDiv();

  const observeHabitats: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        //todo: habitat 메뉴 증가
        console.log('todo');
      }
    });
  };

  const options = {
    root: root,
    rootMargin: '200px 0px',
  };

  const observerRef = useIntersectionObserver(observeHabitats, options);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    history.push(`/?habitat=${target.dataset.id}`);
    hide('off');
  };

  return (
    <HabitatsContainerDiv ref={rootRef}>
      {habitatInfos.map((habitatInfo) => (
        <HabitatBlockDiv key={habitatInfo.name} color={habitatInfo.color} data-id={habitatInfo.id} onClick={handleClick} className={'modal-close-button'}>
          {habitatInfo.name}
        </HabitatBlockDiv>
      ))}
      <div ref={observerRef} />
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

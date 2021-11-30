import React, { createRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Palette } from '@lib/styles/Palette';
import HabitatsContainer from './HabitatsContainer';
import { flexBox, boxShadow } from '@lib/styles/mixin';
import { ToggleHandler } from '@common/Modal/useModal';
import { HabitatList } from '@src/types/Habitat';

interface HabitatModalProps {
  hide: ToggleHandler;
}

const HabitatModal = ({ hide }: HabitatModalProps) => {
  const [habitatInfos, setHabitatInfos] = useState<HabitatList | any>([] as any);
  const [keyword, setKeyword] = useState('');
  const test = createRef<HTMLInputElement>();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    fetchHabitats();

    async function fetchHabitats() {
      const response: Response = await fetch(`/api/habitat`);
      const habitats: HabitatList = await response.json();
      setHabitatInfos(habitats);
    }
  }, []);

  return (
    <HabitatModalDiv>
      <HabitatSearchDiv>
        <input type="text" value={keyword} onChange={handleChange} placeholder={'검색어를 입력하세요.'} ref={test} />
      </HabitatSearchDiv>
      <HabitatsContainer habitatInfos={habitatInfos} hide={hide} keyword={test} />
    </HabitatModalDiv>
  );
};

export default HabitatModal;

const HabitatModalDiv = styled.div`
  ${flexBox('center', 'center', 'column')};
  ${boxShadow('8px')};
  width: 700px;
  height: 450px;
  background: ${Palette.WHITE};
`;

const HabitatSearchDiv = styled.div`
  width: 550px;
  height: 45px;
  border-radius: 8px;
  margin-bottom: 20px;
  input {
    font-size: 30px;
    width: 100%;
    height: 100%;
    padding-left: 10px;
    border: 1px solid black;
    border-radius: 8px;
  }
`;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Palette } from '@lib/styles/Palette';
import HabitatsContainer from './HabitatsContainer';
import { flexBox, boxShadow } from '@lib/styles/mixin';
import { ToggleHandler } from '@common/Modal/useModal';
import Config from '@lib/constants/config';
import { HabitatLists } from '@src/types/Habitat';

interface HabitatModalProps {
  hide: ToggleHandler;
}

const HabitatModal = ({ hide }: HabitatModalProps) => {
  //todo: 검색로직에 대해서
  // 1. HabitatModal이 열릴 때 모든 서식지 이름을 다 받아오고 키워드 입력시에 그 데이터를 필터링하기
  // 2. 페이징으로 받아오다가 키워드 입력시 패치 보내기
  const [habitatInfos, setHabitatInfos] = useState<HabitatLists | any>([] as any);
  const [keyword, setKeyword] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const fetchHabitats = async () => {
    const response: Response = await fetch(`${Config.BACK_HOST}/api/habitat`);
    const habitats: HabitatLists = await response.json();
    setHabitatInfos(habitats);
    return Promise;
  };

  useEffect(() => {
    fetchHabitats();
    // todo: fetch로 서식지 목록 받아와야함
    // const habtatis = fetchHabitats();
    const responseFetch = [
      { name: '강남역 뒷골목', color: '#FACBBA', id: 1 },
      { name: '서울숲', color: '#B5E8E2', id: 2 },
      { name: '부산 해운대', color: '#ffb1b9', id: 0 },
      { name: '부산 해운대1', color: '#ffb1b9', id: 0 },
      { name: '부산 해운대2', color: '#8f111e', id: 0 },
      { name: '부산 해운대3', color: '#164125', id: 0 },
      { name: '부산 해운대4', color: '#7a6768', id: 0 },
      { name: '부산 해운대5', color: 'rgba(39,138,199,0.77)', id: 0 },
      { name: '부산 해운대6', color: '#a320b2', id: 0 },
      { name: '부산 해운대7', color: '#a320b2', id: 0 },
      { name: '부산 해운대8', color: '#a320b2', id: 0 },
      { name: '부산 해운대9', color: '#a320b2', id: 0 },
      { name: '부산 해운대10', color: '#a320b2', id: 0 },
      { name: '부산 해운대11', color: '#a320b2', id: 0 },
    ];

    // if (keyword.length) {
    //   setHabitatInfos(responseFetch.filter((v) => v.name.includes(keyword)));
    // } else {
    //   setHabitatInfos(responseFetch);
    // }
  }, [keyword]);

  return (
    <HabitatModalDiv>
      <HabitatSearchDiv>
        <input type="text" value={keyword} onChange={handleChange} placeholder={'검색어를 입력하세요.'} />
      </HabitatSearchDiv>
      <HabitatsContainer habitatInfos={habitatInfos} hide={hide} />
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

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Palette } from '@lib/styles/Palette';
import HabitatsContainer from './HabitatsContainer';
import { flexBox } from '@lib/styles/mixin';
import { HabitatInfo } from '@hooks/useHabitatInfo';

const HabitatModalDiv = styled.div`
  ${flexBox('center', 'center', 'column')};
  width: 700px;
  height: 450px;
  background: ${Palette.WHITE};
  border-radius: 8px;
  box-shadow: 0 4px 10px rgb(51 51 51), 0 0 4px rgb(51 51 51 / 50%);
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
    padding: 0;
  }
`;

const HabitatModal = () => {
  //todo: 검색로직에 대해서
  // 1. HabitatModal이 열릴 때 모든 서식지 이름을 다 받아오고 키워드 입력시에 그 데이터를 필터링하기
  // 2. 페이징으로 받아오다가 키워드 입력시 패치 보내기
  const [habitatInfos, setHabitatInfos] = useState<HabitatInfo[]>([] as HabitatInfo[]);
  const [keyword, setKeyword] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    // todo: fetch로 서식지 목록 받아와야함
    const responseFetch = [
      // @ts-ignore
      { name: '강남역 뒷골목', color: '#FACBBA' },
      // @ts-ignore
      { name: '서울숲', color: '#ffb1b9' },
      // @ts-ignore
      { name: '부산 해운대', color: '#B5E8E2' },
    ];

    if (keyword.length) {
      // @ts-ignore
      setHabitatInfos(responseFetch.filter((v) => v.name.includes(keyword)));
      responseFetch.forEach((v) => {
        console.log(v.name);
      });
    } else {
      // @ts-ignore
      setHabitatInfos(responseFetch);
    }
  }, [keyword]);

  return (
    <HabitatModalDiv>
      <HabitatSearchDiv>
        <input type="text" value={keyword} onChange={handleChange} />
      </HabitatSearchDiv>
      <HabitatsContainer habitatInfos={habitatInfos} />
    </HabitatModalDiv>
  );
};

export default HabitatModal;

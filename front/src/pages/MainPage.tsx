import React, { useState } from 'react';
import Header from '@components/Header/Header';
import FeedContainer from '@components/Feed/FeedContainer';
import FeedFAB from '@components/Feed/FeedFAB';
import styled from 'styled-components';
import HabitatPreview from '@components/Habitat/HabitatPreview';
import useHistory from '@hooks/useHistory';
import { Palette } from '@lib/styles/Palette';
import { flexBox } from '@lib/styles/mixin';
import useHabitatInfo from '@hooks/useHabitatInfo';

const MainPageBlock = styled.div`
  ${flexBox(null, null, 'column')};
  overflow: hidden;
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: ${Palette.BACKGROUND_GRAY};
`;

const MainPage = () => {
  // 비로그인시 userHabitatId == -1
  const [userHabitatId, setUserHabitatId] = useState(-1);

  const { curHabitatId, handleNextHabitat, handlePrevHabitat, habitatList, historyIdx } = useHistory(userHabitatId);

  const { habitatInfo } = useHabitatInfo(curHabitatId);
  return (
    <MainPageBlock>
      <Header habitatInfo={habitatInfo} />
      <FeedContainer habitatInfo={habitatInfo} />
      <FeedFAB />
      <HabitatPreview habitat={habitatList.current[historyIdx.current + 1]} onClick={handleNextHabitat} side={'right'} />
      <HabitatPreview habitat={habitatList.current[historyIdx.current - 1]} onClick={handlePrevHabitat} side={'left'} />
    </MainPageBlock>
  );
};

export default MainPage;

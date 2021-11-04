import React from 'react';
import Header from '../components/Header/Header';
import FeedScrollBox from '../components/Feed/FeedScrollBox';
import FeedFAB from '../components/Feed/FeedFAB';
import styled from 'styled-components';
import HabitatPreview from '../components/Habitat/HabitatPreview';
import { Palette } from '../lib/styles/Palette';
import { flexBox } from '../lib/styles/mixin';

const MainPageBlock = styled.div`
  ${flexBox(null, null, 'column')};
  overflow: hidden;
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: ${Palette.BACKGROUND_GRAY};
`;

const MainPage = () => {
  return (
    <MainPageBlock>
      <Header />
      <FeedScrollBox />
      <FeedFAB />
      <HabitatPreview side={'right'} color={Palette.SKYBLUE} />
      <HabitatPreview side={'left'} color={Palette.APRICOT} />
    </MainPageBlock>
  );
};

export default MainPage;

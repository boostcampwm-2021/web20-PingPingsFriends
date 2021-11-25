import React, { useRef, useState } from 'react';
import Header from '@components/Header/Header';
import FeedContainer from '@components/Feed/FeedContainer';
import FeedFAB from '@components/Feed/FeedFAB';
import Explore from '@components/Explore/Explore';
import styled from 'styled-components';
import HabitatPreview from '@components/Habitat/HabitatPreview';
import useSideNavi from '@src/hooks/useSideNavi';
import { Palette } from '@lib/styles/Palette';
import { flexBox } from '@lib/styles/mixin';
import useHabitatInfo from '@hooks/useHabitatInfo';
import MagicNumber from '@src/lib/styles/magic';
import { useUserState } from '@src/contexts/UserContext';
import useValidateUser from '@src/hooks/useValidateUser';

const MainPage = () => {
  const userState = useUserState();
  useValidateUser(userState);

  const [mode, setMode] = useState<'feed' | 'explore'>('feed');
  const feedModeRef = useRef<HTMLDivElement>(null);

  // const { curHabitatId, handleNextHabitat, handlePrevHabitat, habitatList, historyIdx } = useSideNavi(userState.data?.habitatId as number);
  const { getCurHabitat, handleNextHabitat, handlePrevHabitat, historyState } = useSideNavi(userState.data?.habitatId ?? 2);
  const { habitatInfo } = useHabitatInfo(getCurHabitat());

  const toggleMode = () => {
    if (feedModeRef.current) {
      feedModeRef.current.style.opacity = '0';
      feedModeRef.current.style.zIndex = '1';
      setTimeout(() => {
        setMode(mode === 'feed' ? 'explore' : 'feed');
        if (feedModeRef.current) {
          feedModeRef.current.style.opacity = '1';
        }
      }, 700);
    }
  };

  const getFeedFloatingPos = () => (window.innerWidth + parseInt(MagicNumber.FEED_SECTION_WIDTH)) / 2 + 10;
  const getExploreFloatingPos = () => 0;

  return (
    <MainPageBlock>
      <Header habitatInfo={habitatInfo} />
      <MainContentsDiv ref={feedModeRef}>
        {
          {
            feed: (
              <>
                <FeedContainer habitatInfo={habitatInfo} curHabitatId={getCurHabitat()} />
                <FeedFAB mode={mode} getPosFunc={getFeedFloatingPos} toggleMode={toggleMode} />
                <HabitatPreview habitat={getCurHabitat(1)} onClick={handleNextHabitat} side={'right'} />
                <HabitatPreview habitat={getCurHabitat(-1)} onClick={handlePrevHabitat} side={'left'} />
              </>
            ),
            explore: (
              <>
                <Explore habitatInfo={habitatInfo} />
                <FeedFAB mode={mode} getPosFunc={getExploreFloatingPos} toggleMode={toggleMode} />
              </>
            ),
          }[mode]
        }
      </MainContentsDiv>
      <EmptyStyleDiv color={habitatInfo?.habitat.color} />
    </MainPageBlock>
  );
};

export default MainPage;

const MainPageBlock = styled.div`
  ${flexBox(null, null, 'column')};
  overflow: hidden;
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: ${Palette.BACKGROUND_GRAY};
`;

const MainContentsDiv = styled.div`
  opacity: 1;
  transition: opacity 0.5s linear;
  position: relative;
  display: inherit;
  width: 100%;
  height: calc(100% - ${MagicNumber.HEADER_HEIGHT});
`;

const EmptyStyleDiv = styled.div<{ color: string | undefined }>`
  width: 500px;
  margin: auto;
  left: 0;
  right: 0;
  background-color: ${(props) => (props.color !== undefined ? props.color : Palette.PINK)};
  height: calc(100% - ${MagicNumber.HEADER_HEIGHT});
  top: ${MagicNumber.HEADER_HEIGHT};
  position: absolute;
  overflow-y: scroll;
`;

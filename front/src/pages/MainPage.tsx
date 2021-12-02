import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import UserArticle from '@src/pages/UserArticle';
import MainArticle from '@src/pages/MainArticle';
import Header from '@components/Header/Header';
import { useUserState } from '@src/contexts/UserContext';
import useValidateUser from '@hooks/useValidateUser';
import useSideNavi from '@hooks/useSideNavi';
import useHabitatInfo from '@hooks/useHabitatInfo';

const MainPageDiv = styled.div`
  overflow: hidden;
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const MainPage = () => {
  const userState = useUserState();
  useValidateUser(userState);
  const { getCurHabitat, handleNextHabitat, handlePrevHabitat, error } = useSideNavi(userState.data?.habitatId ?? 2);

  const { habitatInfo } = useHabitatInfo(getCurHabitat());

  return (
    <MainPageDiv>
      <Header habitatInfo={habitatInfo} />

      <Route exact path="/user/:id/(modal/.*)?">
        <UserArticle />
      </Route>

      <Route exact path="/(modal/.*)?">
        <MainArticle getCurHabitat={getCurHabitat} handleNextHabitat={handleNextHabitat} handlePrevHabitat={handlePrevHabitat} error={error} habitatInfo={habitatInfo} />
      </Route>
    </MainPageDiv>
  );
};

export default MainPage;

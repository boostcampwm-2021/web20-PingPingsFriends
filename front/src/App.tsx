import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import UserPage from './pages/UserPage';
import RegisterPage from './pages/RegisterPage';
import ExplorePage from './pages/ExplorePage';
import GlobalStyle from '@lib/styles/GlobalStyle';
import '@lib/styles/fonts.css';
import { UserProvider } from '@src/contexts/UserContext';

function App() {
  return (
    <>
      <GlobalStyle />
      <Switch>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/explore">
          <ExplorePage />
        </Route>
        <UserProvider>
          <Route path="/user">
            <UserPage />
          </Route>
          <Route path="/">
            <MainPage />
          </Route>
        </UserProvider>
      </Switch>
    </>
  );
}

export default App;

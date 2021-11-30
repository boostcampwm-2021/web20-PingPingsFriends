import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import UserPage from './pages/UserPage';
import RegisterPage from './pages/RegisterPage';
import ErrorPage from './pages/ErrorPage';
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
        <Route path="/user/:id">
          <UserProvider>
            <UserPage />
          </UserProvider>
        </Route>
        <Route exact path="/(modal/.*)?">
          <UserProvider>
            <MainPage />
          </UserProvider>
        </Route>
        <Route>
          <ErrorPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;

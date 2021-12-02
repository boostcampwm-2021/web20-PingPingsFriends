import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import ErrorPage from './pages/ErrorPage';
import GlobalStyle from '@lib/styles/GlobalStyle';
import '@lib/styles/fonts.css';
import { UserProvider } from '@src/contexts/UserContext';
import MainPage from '@src/pages/MainPage';

function App() {
  return (
    <>
      <GlobalStyle />
      <Switch>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route exact path={['/user/:id/(modal/.*)?', '/(modal/.*)?']}>
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

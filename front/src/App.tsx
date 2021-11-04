import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import UserPage from './pages/UserPage';
import RegisterPage from './pages/RegisterPage';
import ExplorePage from './pages/ExplorePage';
import TestPage from './pages/TestPage';

function App() {
  return (
    <>
      <Switch>
        <Route path="/test">
          <TestPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/explore">
          <ExplorePage />
        </Route>
        <Route path="/user">
          <UserPage />
        </Route>
        <Route path="/">
          <MainPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;

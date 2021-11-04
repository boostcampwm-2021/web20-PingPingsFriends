import React from 'react';

import './App.css';
import { Switch, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import UserPage from './pages/UserPage';
import RegisterPage from './pages/RegisterPage';
import ExplorePage from './pages/ExplorePage';

function App() {
  return (
    <>
      <Switch>
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
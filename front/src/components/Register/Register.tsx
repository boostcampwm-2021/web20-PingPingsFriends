import React from 'react';
import styled from 'styled-components';
import AccountInfo from '@components/Register/AccountInfo';
import { Route, Switch, useLocation, withRouter } from 'react-router-dom';
import MoreInfo from '@components/Register/MoreInfo';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './Transition.css';
import usePageSlide from '@hooks/usePageSlide';
import ProfileImage from '@components/Register/ProfileImage';
import LoadingBar from '@components/Register/LoadingBar';

const RegisterDiv = styled.div`
  position: relative;
  width: 450px;
  height: 550px;
  border: 1px solid #bebbbb;
  padding: 40px;
  border-radius: 8px;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const Register = () => {
  const { direction, handleAccountClick, handleMoreInfoClick } = usePageSlide();
  const location = useLocation();

  return (
    <RegisterDiv>
      <LoadingBar />
      <TransitionGroup className={'transition-group'}>
        <CSSTransition key={location.pathname} classNames={direction} timeout={500}>
          <Switch location={location}>
            <Route path="/register/set-profile">
              <ProfileImage />
            </Route>
            <Route path="/register/more-info">
              <MoreInfo handleMoreInfoClick={handleMoreInfoClick} />
            </Route>
            <Route path="/register">
              <AccountInfo handleAccountClick={handleAccountClick} />
            </Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </RegisterDiv>
  );
};

export default withRouter(Register);

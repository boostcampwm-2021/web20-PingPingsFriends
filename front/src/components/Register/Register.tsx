import React from 'react';
import styled from 'styled-components';
import AccountInfo from '@components/Register/AccountInfo';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import MoreInfo from '@components/Register/MoreInfo';
import useForm, { Validations } from '@hooks/useForm';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './Transition.css';
import usePageSlide from '@hooks/usePageSlide';
import ProfileImage from '@components/Register/ProfileImage';
import LoadingBar from '@components/Register/LoadingBar';

const RegisterDiv = styled.div`
  position: relative;
  width: 450px;
  height: 500px;
  border: 1px solid #bebbbb;
  padding: 40px;
  border-radius: 8px;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

export interface UserData {
  username: string;
  password: string;
  passwordConfirm: string;
}
const initialUserData = {
  username: '',
  password: '',
  passwordConfirm: '',
};
export interface InfoData {
  nickname: string;
  habitat: string;
  category: string;
}
const initialInfoData = {
  nickname: '',
  habitat: '강남역 뒷골목',
  category: '고양이',
};
const userDataValidations: Validations<UserData> = [
  { value: 'username', check: (values) => values['username'].length <= 4, message: '아이디는 4자를 넘어야합니다.' },
  { value: 'username', check: (values) => values['username'].length === 0, message: '아이디를 입력하세요.' },
  { value: 'password', check: (values) => values['password'].length < 8, message: '비밀번호는 8자 이상이어야합니다.' },
  { value: 'password', check: (values) => values['password'].length === 0, message: '비밀번호를 입력하세요.' },
  { value: 'passwordConfirm', check: (values) => values['passwordConfirm'] !== values['password'], message: '입력하신 비밀번호와 일치하지 않습니다' },
];

const infoDataValidations: Validations<InfoData> = [{ value: 'nickname', check: (values) => values['nickname'].length <= 4, message: '아이디는 4자를 넘어야합니다.' }];

interface RegisterProps extends RouteComponentProps {}

const Register = ({ location }: RegisterProps) => {
  const { values: accountValues, handleChange: handleAccountChange, errors: accountErrors, flag: accountFlag } = useForm<UserData>(initialUserData, userDataValidations);
  const { values: moreInfoValues, handleChange: handleMoreInfoChange, errors: moreInfoErrors, flag: moreInfoFlag } = useForm<InfoData>(initialInfoData, infoDataValidations);
  const { direction, handleAccountClick, handleMoreInfoClick } = usePageSlide(accountFlag, moreInfoFlag, accountValues, moreInfoValues);

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
              <MoreInfo values={moreInfoValues} handleChange={handleMoreInfoChange} errors={moreInfoErrors} flag={moreInfoFlag} handleMoreInfoClick={handleMoreInfoClick} />
            </Route>
            <Route path="/register">
              <AccountInfo values={accountValues} handleChange={handleAccountChange} errors={accountErrors} flag={accountFlag} handleAccountClick={handleAccountClick} />
            </Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </RegisterDiv>
  );
};

export default withRouter(Register);

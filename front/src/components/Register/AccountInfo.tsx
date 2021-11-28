import React from 'react';
import styled from 'styled-components';
import { flexBox } from '@lib/styles/mixin';
import Input from '@common/Input/Input';
import Button from '@components/Button/Button';
import logo from '@assets/images/logo2.png';
import { RegisterState } from '@src/contexts/RegisterContext';
import useForm, { Validation } from '@components/Register/useForm';
import useFetchDuplicate from '@components/Register/useFetchDuplicate';
import useFocus from '@hooks/useFocus';

interface AccountInfoProps {
  handleAccountClick: React.MouseEventHandler<HTMLButtonElement>;
}

const validations: Validation<RegisterState>[] = [
  { value: 'username', check: (values) => values['username'].length >= 19, message: '아이디는 20자보다 적어야합니다.' },
  { value: 'username', check: (values) => !new RegExp(/^[a-z]/gi).test(values['username']), message: '영문자로 시작해야합니다' },
  { value: 'username', check: (values) => values['username'].length <= 4, message: '아이디는 4자를 넘어야합니다.' },
  { value: 'username', check: (values) => values['username'].length === 0, message: '아이디를 입력하세요.' },
  { value: 'password', check: (values) => values['password'].length < 8, message: '비밀번호는 8자 이상이어야합니다.' },
  { value: 'password', check: (values) => values['password'].length === 0, message: '비밀번호를 입력하세요.' },
  { value: 'passwordConfirm', check: (values) => values['passwordConfirm'] !== values['password'], message: '입력하신 비밀번호와 일치하지 않습니다' },
];

const AccountInfo = ({ handleAccountClick }: AccountInfoProps) => {
  const { registerState, errors, handleChange, activeFlag } = useForm(validations);
  const { username, password, passwordConfirm } = registerState;
  const [isCheck, checkUsername] = useFetchDuplicate(`username`);
  const inputRef = useFocus();

  return (
    <AccountInfoBlock>
      <Header>
        <img className={'logo'} src={logo} alt={'로고'} />
        <div className={'title'}>계정 만들기</div>
      </Header>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Input name={'username'} placeholder={'아이디'} value={username} handleChange={handleChange} errorMessage={errors.username} check={checkUsername} isDuplicate={isCheck} focusRef={inputRef} />
        <Input name={'password'} type={'password'} placeholder={'비밀번호'} value={password} handleChange={handleChange} errorMessage={errors.password} />
        <Input name={'passwordConfirm'} type={'password'} placeholder={'비밀번호 확인'} value={passwordConfirm} handleChange={handleChange} errorMessage={errors.passwordConfirm} />
        <ButtonContainer>
          <Button type={'button'} borderColor={'none'} onClick={handleAccountClick} className={'back-button'}>
            뒤로 가기
          </Button>
          <Button className={`${activeFlag && !isCheck && 'active'} next-button`} onClick={handleAccountClick}>
            다음
          </Button>
        </ButtonContainer>
      </Form>
    </AccountInfoBlock>
  );
};

export default AccountInfo;

const AccountInfoBlock = styled.div`
  position: absolute;
  padding: 0 40px;
`;

const Header = styled.div`
  ${flexBox('space-between', 'flex-start', 'column')};
  .logo {
    height: 80px;
    object-fit: cover;
  }
  .title {
    margin: 15px 0;
    font-size: 24px;
  }
`;

const Form = styled.form`
  ${flexBox('center', 'center', 'column')};

  & > * {
    margin: 20px;
  }
`;
const ButtonContainer = styled.div`
  ${flexBox('space-between', 'center')};
  width: 100%;
`;

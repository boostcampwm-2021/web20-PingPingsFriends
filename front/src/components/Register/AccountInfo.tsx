import React from 'react';
import styled from 'styled-components';
import { flexBox } from '@lib/styles/mixin';
import Input from '@common/Input/Input';
import { UserData } from '@components/Register/Register';
import { ErrorType } from '@hooks/useForm';
import Button from '@components/Button/Button';

const AccountInfoBlock = styled.div`
  position: absolute;
  padding: 0 40px;
`;

const Header = styled.div`
  ${flexBox('space-between', 'flex-start', 'column')};
  .logo {
    font-size: 18px;
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

interface AccountInfoProps {
  values: UserData;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  errors: ErrorType<UserData>;
  flag: boolean;
  handleAccountClick: React.MouseEventHandler<HTMLButtonElement>;
}

const AccountInfo = ({ values, handleChange, errors, flag, handleAccountClick }: AccountInfoProps) => {
  const { id, password, passwordConfirm } = values;

  return (
    <AccountInfoBlock>
      <Header>
        <div className={'logo'}>핑핑이와 친구들</div>
        <div className={'title'}>계정 만들기</div>
      </Header>
      <Form>
        <Input name={'id'} placeholder={'아이디'} value={id} handleChange={handleChange} errorMessage={errors.id} />
        <Input name={'password'} type={'password'} placeholder={'비밀번호'} value={password} handleChange={handleChange} errorMessage={errors.password} />
        <Input name={'passwordConfirm'} type={'password'} placeholder={'비밀번호 확인'} value={passwordConfirm} handleChange={handleChange} errorMessage={errors.passwordConfirm} />
        <Button className={`${flag && 'active'}`} onClick={handleAccountClick}>
          다음
        </Button>
      </Form>
    </AccountInfoBlock>
  );
};

export default AccountInfo;

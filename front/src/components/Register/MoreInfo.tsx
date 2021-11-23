import React from 'react';
import styled from 'styled-components';
import { flexBox } from '@lib/styles/mixin';
import Input from '@common/Input/Input';
import { InfoData } from '@components/Register/Register';
import { ErrorType } from '@hooks/useForm';
import Select from '@common/Select/Select';
import Button from '@components/Button/Button';
import logo from '@assets/images/logo2.png';

interface MoreInfoProps {
  values: InfoData;
  handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  errors: ErrorType<InfoData>;
  flag: boolean;
  handleMoreInfoClick: React.MouseEventHandler<HTMLButtonElement>;
}

const habitatOptions = ['강남역 뒷골목', '부산 해운대', '서울숲'];
const animalOptions = ['고양이', '강아지', '돌멩이'];

const MoreInfo = ({ values, flag, handleMoreInfoClick, errors, handleChange }: MoreInfoProps) => {
  const { nickname } = values;

  return (
    <MoreInfoBlock>
      <Header>
        <img className={'logo'} src={logo} alt={'로고'} />
        <div className={'title'}>추가 정보 입력하기</div>
      </Header>
      <Form>
        <Input name={'nickname'} placeholder={'유저 아이디'} value={nickname} handleChange={handleChange} errorMessage={errors.nickname} />
        <Select name={'habitat'} id={'habitat'} options={habitatOptions} label={'서식지'} handleChange={handleChange} />
        <Select name={'category'} id={'category'} options={animalOptions} label={'동물 카테고리'} handleChange={handleChange} />
        <ButtonContainer>
          <Button borderColor={'none'} onClick={handleMoreInfoClick}>
            뒤로 가기
          </Button>
          <Button className={`${flag && 'active'}`} onClick={handleMoreInfoClick}>
            가입
          </Button>
        </ButtonContainer>
      </Form>
    </MoreInfoBlock>
  );
};

export default MoreInfo;

const MoreInfoBlock = styled.div`
  position: absolute;
  padding: 0 40px;
  width: 370px;
  height: 420px;
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
  margin-top: 0;
`;

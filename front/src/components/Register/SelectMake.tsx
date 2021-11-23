import React from 'react';
import styled from 'styled-components';
import Input from '@common/Input/Input';
import { boxShadow, flexBox } from '@lib/styles/mixin';
import Button from '@components/Button/Button';

const TestBlock = styled.div`
  ${flexBox('space-between', 'flex-start', 'column')};
  ${boxShadow('8px')};
  border: black solid 1px;
  width: 500px;
  height: 300px;
  margin: auto;
  padding: 40px;
  background: white;
  button {
    width: 80px;
    height: 45px;
  }
`;

const TitleContainer = styled.div`
  ${flexBox(null, 'center')};
  width: 100%;
  button {
    margin-left: 30px;
  }
`;

const ButtonContainer = styled.div`
  ${flexBox('space-between', 'center')};
  width: 100%;
`;

interface SelectMakeProps {
  title: string;
  placeholder: string;
}

const SelectMake = ({ title, placeholder }: SelectMakeProps) => {
  return (
    <TestBlock>
      <TitleContainer>
        <Input name={'name'} placeholder={'제목'} />
        <Button>중복 체크</Button>
      </TitleContainer>
      <Input name={'sound'} placeholder={'울음소리'} />

      <ButtonContainer>
        <Button>취소</Button>
        <Button>만들기</Button>
      </ButtonContainer>
    </TestBlock>
  );
};

export default SelectMake;

import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '@common/Input/Input';
import { boxShadow, flexBox } from '@lib/styles/mixin';
import Button from '@components/Button/Button';
import { ToggleHandler } from '@common/Modal/useModal';
import { useRegisterDispatch } from '@src/contexts/RegisterContext';

interface SpeciesMakeModalProps {
  hide: ToggleHandler;
}

const HabitatsMakeModal = ({ hide }: SpeciesMakeModalProps) => {
  const [habitat, setHabitat] = useState('');
  const [color, setColor] = useState('');
  const registerDispatch = useRegisterDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value[e.target.value.length - 1] === ' ') {
      return;
    }
    if (e.target.name === 'habitat') {
      setHabitat(e.target.value);
      return;
    }
    if (e.target.name === 'color') {
      setColor(e.target.value);
    }
  };

  const handleClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.innerHTML === '중복 체크' && target.classList.contains('active')) {
      // await fetch('/api/');
      return;
    }
    if (target.innerHTML === '만들기' && target.classList.contains('active')) {
      registerDispatch({ type: 'ADD_HABITAT', payload: { name: habitat, color } });
      hide('off');
      return;
    }
    if (target.innerHTML === '취소') {
      hide('off');
    }
  };

  return (
    <TestBlock onClick={handleClick}>
      <TitleContainer>
        <Input name={'habitat'} placeholder={'서식지 이름'} value={habitat} handleChange={handleChange} />
        <Button className={`${habitat.length ? 'active' : ''}`}>중복 체크</Button>
      </TitleContainer>
      <Input width={360} name={'color'} placeholder={'색상'} value={color} handleChange={handleChange} />
      <ButtonContainer>
        <Button>취소</Button>
        <Button className={`${habitat.length && color.length ? 'active' : ''}`}>만들기</Button>
      </ButtonContainer>
    </TestBlock>
  );
};

export default HabitatsMakeModal;

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

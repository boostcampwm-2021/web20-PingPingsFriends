import React, { useReducer, useState } from 'react';
import styled from 'styled-components';
import Input from '@common/Input/Input';
import { boxShadow, flexBox } from '@lib/styles/mixin';
import Button from '@components/Button/Button';
import { ToggleHandler } from '@common/Modal/useModal';
import { useRegisterDispatch } from '@src/contexts/RegisterContext';
import { Palette } from '@lib/styles/Palette';

interface SpeciesMakeModalProps {
  hide: ToggleHandler;
}
interface ErrorMessage {
  duplicateChecked: boolean;
  isDuplicate: boolean;
  errorMessage: string;
}
const initialState: ErrorMessage = {
  duplicateChecked: false,
  isDuplicate: false,
  errorMessage: '',
};

interface Action {
  type: 'SHOW_MESSAGE' | 'CHECK_DUPLICATE';
  payload?: Partial<ErrorMessage>;
}

const reducer = (state: ErrorMessage, { type, payload }: Action) => {
  switch (type) {
    case 'SHOW_MESSAGE':
      return { ...state, errorMessage: '중복 체크 해주세요!', duplicateChecked: false, isDuplicate: false };
    case 'CHECK_DUPLICATE':
      const isDuplicate = payload!.isDuplicate!;
      const nextErrorMessage = isDuplicate ? '사용 가능한 이름입니다!' : '중복된 이름입니다.';
      return { ...state, isDuplicate, errorMessage: nextErrorMessage, duplicateChecked: true };
    default:
      return state;
  }
};
const SpeciesMakeModal = ({ hide }: SpeciesMakeModalProps) => {
  const [species, setSpecies] = useState('');
  const [sound, setSound] = useState('');
  const [{ duplicateChecked, isDuplicate, errorMessage }, dispatch] = useReducer(reducer, initialState);
  const registerDispatch = useRegisterDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value[e.target.value.length - 1] === ' ') {
      return;
    }
    if (e.target.name === 'species') {
      setSpecies(e.target.value);
      dispatch({ type: 'SHOW_MESSAGE' });
      return;
    }
    if (e.target.name === 'sound') {
      setSound(e.target.value);
    }
  };

  const handleClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.classList.contains('duplicate-check-button') && target.classList.contains('active')) {
      const response: Response = await fetch(`/api/species/isDuplicated?name=${species}`);
      const result = await response.json();

      dispatch({ type: 'CHECK_DUPLICATE', payload: { isDuplicate: !result } });
      return;
    }
    if (target.classList.contains('make-button') && target.classList.contains('active')) {
      registerDispatch({ type: 'ADD_SPECIES', payload: { name: species, sound } });
      hide('off');
      return;
    }
    if (target.classList.contains('cancel-button')) {
      hide('off');
    }
  };

  return (
    <TestBlock onClick={handleClick}>
      <TitleContainer>
        <Input name={'species'} placeholder={'동물 종류'} value={species} handleChange={handleChange} />
        <Button className={`${species.length ? 'active' : ''} duplicate-check-button`}>중복 체크</Button>
        <ErrorMessageDiv isError={!(isDuplicate && duplicateChecked)}>{!species.length ? '' : errorMessage}</ErrorMessageDiv>
      </TitleContainer>
      <Input width={360} name={'sound'} placeholder={'울음소리'} value={sound} handleChange={handleChange} />

      <ButtonContainer>
        <Button className={'cancel-button'}>취소</Button>
        <Button className={`${species.length && sound.length ? 'active' : ''} make-button`}>만들기</Button>
      </ButtonContainer>
    </TestBlock>
  );
};

export default SpeciesMakeModal;

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

const ErrorMessageDiv = styled.div<{ isError: boolean }>`
  position: absolute;
  top: 50px;
  left: 10px;
  color: ${(props) => (props.isError ? Palette.RED : Palette.ACTIVE)}; ;
`;

const TitleContainer = styled.div`
  ${flexBox(null, 'center')};
  width: 100%;
  position: relative;
  button {
    margin-left: 30px;
  }
`;

const ButtonContainer = styled.div`
  ${flexBox('space-between', 'center')};
  width: 100%;
`;

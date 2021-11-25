import React, { useReducer, useState } from 'react';
import styled from 'styled-components';
import Input from '@common/Input/Input';
import { boxShadow, flexBox } from '@lib/styles/mixin';
import Button from '@components/Button/Button';
import { ToggleHandler } from '@common/Modal/useModal';
import { useRegisterDispatch } from '@src/contexts/RegisterContext';
import { Palette } from '@lib/styles/Palette';
import ColorPicker from '@components/Register/ColorPicker';

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

const HabitatsMakeModal = ({ hide }: SpeciesMakeModalProps) => {
  const [habitat, setHabitat] = useState('');
  const [color, setColor] = useState('');
  const [{ duplicateChecked, isDuplicate, errorMessage }, dispatch] = useReducer(reducer, initialState);
  const registerDispatch = useRegisterDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    if (target.value[target.value.length - 1] === ' ') {
      return;
    }
    if (target.name === 'habitat') {
      setHabitat(target.value);
      dispatch({ type: 'SHOW_MESSAGE' });
      return;
    }
    if (target.name === 'color') {
      setColor(target.value);
    }
  };

  const handleButtonClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.classList.contains('duplicate-check-button') && target.classList.contains('active')) {
      const response = await fetch(`/api/habitat/isDuplicated?name=${habitat}`);
      const result = await response.json();
      dispatch({ type: 'CHECK_DUPLICATE', payload: { isDuplicate: !result } });
      return;
    }
    if (target.classList.contains('make-button') && target.classList.contains('active')) {
      registerDispatch({ type: 'ADD_HABITAT', payload: { name: habitat, color } });
      hide('off');
      return;
    }
    if (target.classList.contains('cancel-button')) {
      hide('off');
    }
  };

  const handleColorClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (!target.dataset.color) {
      return;
    }
    setColor(target.dataset.color);
  };

  return (
    <TestBlock onClick={handleButtonClick}>
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <TitleContainer>
          <Input name={'habitat'} placeholder={'서식지 이름'} value={habitat} handleChange={handleChange} />
          <Button className={`${habitat.length ? 'active' : ''} duplicate-check-button`}>중복 체크</Button>
          <ErrorMessageDiv isError={!(isDuplicate && duplicateChecked)}>{!habitat.length ? '' : errorMessage}</ErrorMessageDiv>
        </TitleContainer>
      </form>

      <ColorPicker handleColorClick={handleColorClick} currentColor={color} />

      <ButtonContainer>
        <Button className={'cancel-button'}>취소</Button>
        <Button className={`${habitat.length && color.length && isDuplicate ? 'active' : ''} make-button`}>만들기</Button>
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
  height: 400px;
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
  position: relative;
  width: 100%;
  button {
    margin-left: 30px;
  }
`;

const ButtonContainer = styled.div`
  ${flexBox('space-between', 'center')};
  width: 100%;
`;

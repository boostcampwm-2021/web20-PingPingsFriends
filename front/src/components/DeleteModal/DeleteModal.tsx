import React from 'react';
import styled from 'styled-components';
import { Palette } from '../../lib/styles/Palette';
import { flexBox } from '../../lib/styles/mixin';
import { ToggleModal } from '../Modal/useModal';

const DeleteModalDiv = styled.div`
  ${flexBox('center', 'center', 'column')};
  width: 340px;
  height: 180px;
  background: ${Palette.WHITE};
  box-shadow: 0 4px 10px rgba(51, 51, 51, 1), 0 0 4px rgba(51, 51, 51, 0.5);
  border-radius: 10px;
`;

const ButtonContainerDiv = styled.div`
  ${flexBox('space-around', 'center')};
  width: 100%;
  margin-top: 40px;
  button {
    color: white;
    width: 70px;
    height: 25px;
    border-radius: 8px;
    &.cancel {
      background: ${Palette.RED};
    }
    &.confirm {
      background: ${Palette.GRAY};
    }
  }
`;

interface DeleteModalProps {
  hide: ToggleModal;
}

const DeleteModal = ({ hide }: DeleteModalProps) => {
  return (
    <DeleteModalDiv>
      <span>삭제하시겠습니까?</span>
      <ButtonContainerDiv>
        <button className={'cancel modal-close-button'} onClick={hide}>
          취소
        </button>
        <button className={'confirm modal-close-button'}>확인</button>
      </ButtonContainerDiv>
    </DeleteModalDiv>
  );
};

export default DeleteModal;

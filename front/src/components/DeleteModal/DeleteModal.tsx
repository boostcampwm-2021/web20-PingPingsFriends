import React, { useState } from 'react';
import styled from 'styled-components';
import { Palette } from '@lib/styles/Palette';
import { flexBox } from '@lib/styles/mixin';
import { ToggleHandler } from '@common/Modal/useModal';
import { useUserState } from '@src/contexts/UserContext';
import { useHistory } from 'react-router';
import { getAuthOption, fetchAPI } from '@src/lib/utils/fetch';

interface DeleteModalProps {
  hide: ToggleHandler;
  feedId: number;
}

const DeleteModal = ({ hide, feedId }: DeleteModalProps) => {
  const userState = useUserState();
  const [onDelete, setDelete] = useState(false);
  const history = useHistory();

  const handleDelete = async () => {
    if (!userState.data) {
      hide('off');
      return;
    }
    setDelete(true);
    fetchAPI(
      `/api/posts/${feedId}`,
      (okRes) => {
        history.go(0);
      },
      (failRes) => {
        setDelete(false);
      },
      (err) => {
        setDelete(false);
      },
      getAuthOption('DELETE', userState.data.accessToken)
    );
  };

  return (
    <DeleteModalDiv>
      {onDelete ? (
        '삭제중입니다...'
      ) : (
        <>
          <span>삭제하시겠습니까?</span>
          <ButtonContainerDiv>
            <button className={'cancel modal-close-button'} onClick={hide}>
              취소
            </button>
            <button className={'confirm'} onClick={handleDelete}>
              확인
            </button>
          </ButtonContainerDiv>
        </>
      )}
    </DeleteModalDiv>
  );
};

export default DeleteModal;

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

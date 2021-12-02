import React, { useState } from 'react';
import styled from 'styled-components';
import Avatar from '@common/Avatar/Avatar';
import { flexBox } from '@src/lib/styles/mixin';
import { ReactComponent as DeleteSvg } from '@assets/icons/delete.svg';
import { ReactComponent as EditSvg } from '@assets/icons/edit.svg';
import { ReactComponent as CancelBtnSvg } from '@assets/icons/cancel_btn3.svg';
import { ReactComponent as CheckBtnSvg } from '@assets/icons/check_circle.svg';
import { Palette } from '@src/lib/styles/Palette';
import { useUserState } from '@src/contexts/UserContext';
import { formatDate } from '@lib/utils/time';
import { InputModeState, InputModeAction, CommentAction } from './useCommentList';
import { getAuthOption, fetchAPI } from '@src/lib/utils/fetch';

interface CommentProps {
  nickname: string;
  comment: string;
  avatar: string | null;
  userId: number;
  createdAt: string;
  commentId: number;
  bottomRef?: (node: HTMLDivElement) => void;
  inputMode: InputModeState;
  inputModeDispatch: React.Dispatch<InputModeAction>;
  commentDispatch: React.Dispatch<CommentAction>;
}

const Comment = ({ nickname, comment, inputMode, inputModeDispatch, commentDispatch, avatar, userId, createdAt, bottomRef, commentId }: CommentProps) => {
  const userState = useUserState();
  const handleEditBtnClick = () => {
    if (inputMode.mode === 'edit' && inputMode.focusCommentId === commentId) inputModeDispatch({ type: 'INIT_NORMAL_MODE' });
    else inputModeDispatch({ type: 'SET_EDIT_MODE', data: { focusCommentId: commentId, inputText: comment } });
  };

  const handleDeleteBtnClick = () => {
    inputModeDispatch({ type: 'SET_DELETE_MODE', data: { focusCommentId: commentId } });
  };

  const handleConfirmCancel = () => {
    inputModeDispatch({ type: 'INIT_NORMAL_MODE' });
  };

  const handleConfirmDelete = () => {
    fetchAPI(
      `/api/comments/${commentId}`,
      (res) => {
        inputModeDispatch({ type: 'INIT_NORMAL_MODE' });
        commentDispatch({ type: 'REFRESH' });
      },
      (res) => {
        console.log(res.status);
      },
      (err) => {
        console.log(err);
      },
      getAuthOption('DELETE', userState.data?.accessToken)
    );
  };

  return (
    <CommentDiv isEdited={inputMode.mode === 'edit' && inputMode.focusCommentId === commentId} ref={bottomRef}>
      <Avatar size={'30px'} imgSrc={avatar} />
      <TextDiv>
        <TextHeader>
          <span>{nickname}</span>
          <span className={'time'}>{formatDate(createdAt)}</span>
        </TextHeader>
        <p>{comment}</p>
      </TextDiv>
      {userState.data?.userId === userId && (
        <ControlDiv>
          <EditSvg onClick={handleEditBtnClick} />
          <DeleteSvg onClick={handleDeleteBtnClick} />
        </ControlDiv>
      )}
      {inputMode.mode === 'delete' && inputMode.focusCommentId === commentId && (
        <DeleteHoverDiv>
          <span>삭제하시겠습니까?</span>
          <div>
            <CheckBtnSvg className={'button'} onClick={handleConfirmDelete} />
            <CancelBtnSvg className={'button'} onClick={handleConfirmCancel} />
          </div>
        </DeleteHoverDiv>
      )}
    </CommentDiv>
  );
};

export default Comment;

const CommentDiv = styled.div<{ isEdited: boolean }>`
  ${flexBox('flex-start', 'flex-start')};
  width: 100%;
  min-height: 50px;
  gap: 5px;
  padding: 5px;
  margin: 15px 0;
  position: relative;
  background-color: ${(props) => (props.isEdited ? Palette.ACTIVE : '')};
  border-radius: 8px;
  transition: background-color 0.3s ease;
`;

const TextDiv = styled.div`
  width: calc(100% - 30px);
  position: relative;

  span {
    font-size: 12px;
    font-weight: bold;
  }
  p {
    width: 100%;
    word-break: break-all;
  }
`;

const ControlDiv = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  svg {
    width: 15px;
    height: 15px;
    cursor: pointer;
    &:hover {
      fill: ${Palette.RED};
    }
  }
`;

const DeleteHoverDiv = styled.div`
  ${flexBox('center', 'center', 'column')};
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: ${Palette.RED};
  border-radius: 8px;
  animation-duration: 0.5s;
  animation-name: slidein;
  color: white;

  svg:hover {
    fill: white;
  }

  @keyframes slidein {
    from {
      transform: translateX(50px);
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const TextHeader = styled.div`
  ${flexBox('space-between', null)};
  .time {
    margin-right: 10px;
  }
`;

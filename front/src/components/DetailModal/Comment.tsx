import React, { useState } from 'react';
import styled from 'styled-components';
import Avatar from '@common/Avatar/Avatar';
import { flexBox } from '@src/lib/styles/mixin';
import { ReactComponent as DeleteSvg } from '@assets/icons/delete.svg';
import { ReactComponent as EditSvg } from '@assets/icons/edit.svg';
import { ReactComponent as CancelBtnSvg } from '@assets/icons/cancel_btn3.svg';
import { ReactComponent as CheckBtnSvg } from '@assets/icons/check_circle.svg';
import { Palette } from '@src/lib/styles/Palette';

const CommentDiv = styled.div<{ isEdited: boolean }>`
  ${flexBox('flex-start', 'flex-start')};
  width: 100%;
  min-height: 50px;
  gap: 5px;
  margin-bottom: 5px;
  position: relative;
  background-color: ${(props) => (props.isEdited ? Palette.PINK : '')};
  transition: background-color 0.3s ease;
`;

const TextDiv = styled.div`
  width: 100%;
  position: relative;
  top: -5px;

  span {
    font-size: 12px;
    font-weight: bold;
  }
`;

const ControlDiv = styled.div`
  position: absolute;
  right: 0;
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
  width: 100%;
  height: 100%;
  background-color: ${Palette.RED};
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

interface CommentProps {
  nickname: string;
  comment: string;
  avatar?: string;
  userId: string;
  toggleEditMode: (text: string) => void;
}

type Mode = 'edit' | 'delete' | 'normal';

const Comment = ({ nickname, comment, avatar, userId, toggleEditMode }: CommentProps) => {
  const myId = 'me';
  // const [editMode, setEditMode] = useState(false);
  // const [isConfirm, setConfirm] = useState(false);
  const [mode, setMode] = useState<Mode>('normal');

  const handleEditBtnClick = () => {
    setMode(mode === 'edit' ? 'normal' : 'edit');
    // setEditMode(!editMode);
    toggleEditMode(comment);
  };

  const handleDeleteBtnClick = () => {
    if (mode === 'edit') toggleEditMode('');
    setMode('delete');
  };

  const handleConfirmCancel = () => {
    setMode('normal');
  };

  return (
    <CommentDiv isEdited={mode === 'edit'}>
      <Avatar size={'30px'} />
      <TextDiv>
        <span>{nickname}</span>
        <p>{comment}</p>
      </TextDiv>
      {myId === userId && (
        <ControlDiv>
          <EditSvg onClick={handleEditBtnClick} />
          <DeleteSvg onClick={handleDeleteBtnClick} />
        </ControlDiv>
      )}
      {mode === 'delete' && (
        <DeleteHoverDiv>
          <span>삭제하시겠습니까?</span>
          <div>
            <CheckBtnSvg className={'button'} />
            <CancelBtnSvg className={'button'} onClick={handleConfirmCancel} />
          </div>
        </DeleteHoverDiv>
      )}
    </CommentDiv>
  );
};

export default Comment;

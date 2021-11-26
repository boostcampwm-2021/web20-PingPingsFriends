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

interface CommentProps {
  nickname: string;
  comment: string;
  avatar: string | null;
  userId: number;
  createdAt: string;
  commentId: number;
  toggleEditMode: (text: string) => void;
  bottomRef?: (node: HTMLDivElement) => void;
}

type Mode = 'edit' | 'delete' | 'normal';

const Comment = ({ nickname, comment, avatar, userId, toggleEditMode, createdAt, bottomRef }: CommentProps) => {
  const [mode, setMode] = useState<Mode>('normal');
  const { data } = useUserState();
  const handleEditBtnClick = () => {
    setMode(mode === 'edit' ? 'normal' : 'edit');
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
    <CommentDiv isEdited={mode === 'edit'} ref={bottomRef}>
      <Avatar size={'30px'} imgSrc={avatar} />
      <TextDiv>
        <TextHeader>
          <span>{nickname}</span>
          <span className={'time'}>{formatDate(createdAt)}</span>
        </TextHeader>
        <p>{comment}</p>
      </TextDiv>
      {data?.userId === userId && (
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

const TextHeader = styled.div`
  ${flexBox('space-between', null)};
  .time {
    margin-right: 10px;
  }
`;

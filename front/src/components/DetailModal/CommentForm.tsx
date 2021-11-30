import { flexBox } from '@src/lib/styles/mixin';
import { Palette } from '@src/lib/styles/Palette';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { getAuthOption, fetchAPI } from '@lib/utils/fetch';
import { useUserState } from '@src/contexts/UserContext';
import { CommentAction, InputModeState, InputModeAction } from './useCommentList';

interface CommentFormProps {
  feedId: number;
  commentDispatch: React.Dispatch<CommentAction>;
  inputMode: InputModeState;
  inputModeDispatch: React.Dispatch<InputModeAction>;
}

const CommentForm = ({ inputMode, inputModeDispatch, commentDispatch, feedId }: CommentFormProps) => {
  const [isActive, setActive] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const userState = useUserState();
  const handleInputChange = () => {
    const $input = inputRef.current;
    if ($input) inputModeDispatch({ type: 'SET_INPUT_TEXT', data: { inputText: $input.value ?? '' } });
  };

  useEffect(() => {
    if (inputRef.current !== null) inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = inputMode.inputText;
      if (inputMode.inputText.length) setActive(true);
      else setActive(false);
    }
  }, [inputMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isActive) {
      return;
    }
    switch (inputMode.mode) {
      case 'write':
        const writeBody = {
          post_id: feedId,
          content: inputRef.current?.value,
        };
        fetchAPI(
          `/api/comments`,
          (res) => {
            commentDispatch({ type: 'REFRESH' });
            inputModeDispatch({ type: 'INIT_NORMAL_MODE' });
          },
          (res) => {
            console.log(res.status);
          },
          (err) => {
            console.log(err);
          },
          getAuthOption('POST', userState.data?.accessToken, JSON.stringify(writeBody), { 'Content-Type': 'application/json' })
        );
        return;
      case 'delete':
        return;
      case 'edit':
        const editBody = {
          post_id: feedId,
          content: inputMode.inputText,
        };
        fetchAPI(
          `/api/comments/${inputMode.focusCommentId}`,
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
          getAuthOption('PATCH', userState.data?.accessToken, JSON.stringify(editBody), { 'Content-Type': 'application/json' })
        );
        return;
      default:
        throw new Error('unhandled mode');
    }
  };

  return (
    <UserForm onSubmit={handleSubmit}>
      <UserInput
        mode={inputMode.mode}
        onChange={handleInputChange}
        ref={inputRef}
        placeholder={userState.data?.accessToken ? '댓글을 입력하세요.' : '로그인이 필요합니다'}
        required
        disabled={userState.data?.accessToken ? false : true}
      />
      <SubmitBtn type={'submit'} isActive={isActive}>
        {isActive ? 'OK!' : 'X'}
      </SubmitBtn>
    </UserForm>
  );
};

export default CommentForm;

const UserForm = styled.form`
  ${flexBox('flex-start', 'center', 'row')};
  width: 100%;
`;

const UserInput = styled.textarea<{ mode: 'write' | 'edit' | 'delete' }>`
  height: 50px;
  width: 100%;
  resize: none;
  font-size: 15px;
  padding: 3px 3px;
  border: 1px solid ${(props) => (props.mode === 'edit' ? Palette.RED : Palette.LIGHT_GRAY)};
  border-radius: 5px;
`;

const SubmitBtn = styled.button<{ isActive: boolean }>`
  width: 50px;
  height: 50px;
  font-size: 20px;
  color: ${(props) => (props.isActive ? 'black' : Palette.LIGHT_GRAY)};
  font-weight: bold;
`;

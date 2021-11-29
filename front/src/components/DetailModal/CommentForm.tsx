import { flexBox } from '@src/lib/styles/mixin';
import { Palette } from '@src/lib/styles/Palette';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { getAuthOption } from '@lib/utils/fetch';
import { useUserState } from '@src/contexts/UserContext';
import { CommentAction } from './useCommentList';

const UserForm = styled.form`
  ${flexBox('flex-start', 'center', 'row')};
  width: 100%;
`;

const UserInput = styled.textarea<{ editMode: boolean }>`
  height: 50px;
  width: 100%;
  resize: none;
  font-size: 15px;
  padding: 3px 3px;
  border: 1px solid ${(props) => (props.editMode ? Palette.RED : Palette.LIGHT_GRAY)};
  border-radius: 5px;
`;

const SubmitBtn = styled.button<{ isActive: boolean }>`
  width: 50px;
  height: 50px;
  font-size: 20px;
  color: ${(props) => (props.isActive ? 'black' : Palette.LIGHT_GRAY)};
  font-weight: bold;
`;

interface CommentFormProps {
  feedId: number;
  editMode: boolean;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  inputText: string;
  commentDispatch: React.Dispatch<CommentAction>;
}

const CommentForm = ({ editMode, inputText, setInputText, commentDispatch, feedId }: CommentFormProps) => {
  const [isActive, setActive] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const userState = useUserState();
  const handleInputChange = () => {
    const $input = inputRef.current;
    if ($input) setInputText($input.value);
  };

  useEffect(() => {
    if (inputRef.current !== null) inputRef.current.focus();
  }, [editMode]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = inputText;
      if (inputText.length) setActive(true);
      else setActive(false);
    }
  }, [inputText]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isActive) {
      return;
    }
    if (editMode) {
      return;
    } else {
      const addComment = async () => {
        const data = {
          post_id: feedId,
          content: inputRef.current?.value,
        };
        const res: Response = await fetch(`/api/comments`, getAuthOption('POST', userState.data?.accessToken, JSON.stringify(data), { 'Content-Type': 'application/json' }));

        if (res.ok) {
          commentDispatch({ type: 'REFRESH' });
        } else {
          console.log(res.status);
        }
      };
      try {
        addComment();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <UserForm onSubmit={handleSubmit}>
      <UserInput editMode={editMode} onChange={handleInputChange} ref={inputRef} placeholder={'댓글을 입력하세요.'} required />
      <SubmitBtn type={'submit'} isActive={isActive}>
        {isActive ? 'OK!' : 'X'}
      </SubmitBtn>
    </UserForm>
  );
};

export default CommentForm;

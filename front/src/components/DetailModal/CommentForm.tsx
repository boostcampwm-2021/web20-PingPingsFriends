import { flexBox } from '@src/lib/styles/mixin';
import { Palette } from '@src/lib/styles/Palette';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

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
}

const CommentForm = ({ feedId, editMode, inputText, setInputText }: CommentFormProps) => {
  const [isActive, setActive] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const handleInputChange = () => {
    const $input = inputRef.current;
    if ($input) setInputText($input.value);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = inputText;
      if (inputText.length) setActive(true);
      else setActive(false);
    }
  }, [inputText]);

  return (
    <UserForm>
      <UserInput editMode={editMode} onChange={handleInputChange} ref={inputRef} placeholder={'댓글을 입력하세요.'} required />
      <SubmitBtn type={'submit'} isActive={isActive}>
        {isActive ? 'OK!' : 'x'}
      </SubmitBtn>
    </UserForm>
  );
};

export default CommentForm;

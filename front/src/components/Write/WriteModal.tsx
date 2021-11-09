import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Palette } from '../../lib/styles/Palette';
import SwipeBox from '../_common/SwipeBox/SwipeBox';
import Preview from './Preview';
import { ReactComponent as AddContentsSvg } from '../../assets/icons/add_contents.svg';
import { ReactComponent as PetBtnSvg } from '../../assets/icons/pet_btn.svg';
import { ReactComponent as CancelBtnSvg } from '../../assets/icons/cancel_btn3.svg';
import { flexBox } from '../../lib/styles/mixin';
import { ModalEvent } from '../Modal/useModal';

const WriteForm = styled.form`
  background-color: ${Palette.WHITE};
  width: 600px;
  height: 400px;
  border-radius: 20px;
  position: relative;
  padding: 30px;
  box-shadow: 0px 4px 10px rgba(51, 51, 51, 1), 0px 0px 4px rgba(51, 51, 51, 0.5);
`;

const DefaultBtn = styled.button`
  width: 50px;
  height: 30px;
  background-color: ${Palette.APRICOT};
  position: absolute;
  bottom: 20px;
`;

const SubmitBtn = styled(DefaultBtn)<{ valid: boolean }>`
  background-color: ${(props) => (props.valid ? Palette.APRICOT : Palette.GRAY)};
  right: 30px;
`;

const CancelBtn = styled(DefaultBtn)`
  background-color: ${Palette.ORANGE};
  right: 100px;
`;

const TextInput = styled.textarea`
  resize: none;
  width: 100%;
  height: 30%;
  margin: 0 auto;
  padding: 5px;
`;

const FileInput = styled.input`
  display: none;
`;

const FileInsertLabel = styled.label`
  width: 100px;
  height: 100px;
  line-height: 127px;
  border: 1px dashed black;
  border-radius: 20px;
  text-align: center;
  flex-shrink: 0;
  position: relative;
  svg {
    width: 50%;
    height: 50%;
  }
  p {
    position: absolute;
    top: 0;
    left: 0;
    height: 100px;
    width: 100px;
    line-height: 150px;
  }
`;

const TextIndicatorP = styled.p`
  font-size: 10px;
`;

const ValidInfoP = styled.p`
  color: red;
`;

const ContentsDiv = styled.div`
  ${flexBox('space-around', 'center', 'row')};
  width: 100%;
  height: 200px;
  margin-bottom: 10px;
`;

const WriteModal = ({ hide }: { hide: (e: ModalEvent, force: boolean) => void }) => {
  const MAX_CONTENTS = 8;
  const MAX_TEXT = 500;
  const [contents, setContents] = useState<File[]>([]);
  const [text, setText] = useState('');
  const [isValid, setValid] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const insertContents = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputContents = e.target.files as FileList;
    setContents([...contents, ...inputContents].slice(0, 8));
  };

  const removeHandler = (targetIdx: number) => {
    const newContents = contents.filter((file, idx) => idx !== targetIdx);
    setContents(newContents);
  };
  const textInputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 500) return;
    setText(e.target.value);
  };
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) return;
    const data = new FormData();
    data.append('text', text);
    contents.forEach((content) => data.append('contents', content));
    const form = e.target as HTMLFormElement;
    fetch(form.action, { method: 'POST', headers: { 'Content-Type': 'multipart/form-data' }, body: data }).then((res) => {
      console.log(res);
      window.location.href = '/';
    });
  };

  useEffect(() => {
    (fileInputRef.current as HTMLInputElement).value = '';
  }, [contents]);
  useEffect(() => {
    if (contents.length && text.length) setValid(true);
    else setValid(false);
  }, [contents, text]);

  return (
    <WriteForm method="post" action="/test" id="write" onSubmit={submitHandler}>
      <ContentsDiv>
        <FileInsertLabel htmlFor="input-contents">
          <AddContentsSvg />
          <p>
            {contents.length}/{MAX_CONTENTS}
          </p>
        </FileInsertLabel>
        <FileInput ref={fileInputRef} onChange={insertContents} id="input-contents" type="file" accept="image/*, video/*" name="contents" form="write" multiple />
        {contents.length ? (
          <SwipeBox width="80%" height="100%" gap="10px">
            <>
              {contents.map((file, idx) => (
                <Preview key={file.lastModified} file={file} idx={idx} removeHandler={removeHandler} />
              ))}
            </>
          </SwipeBox>
        ) : null}
      </ContentsDiv>
      <TextInput value={text} onChange={textInputHandler} name="text" form="write" placeholder="내용을 입력하세요" />
      <TextIndicatorP>
        ({text.length}/{MAX_TEXT})
      </TextIndicatorP>
      <ValidInfoP>{isValid ? '' : '사진과 글은 필수입니다!'}</ValidInfoP>
      <SubmitBtn type="submit" valid={isValid}>
        <PetBtnSvg />
        <p>Done</p>
      </SubmitBtn>
      <CancelBtn
        type="button"
        onClick={(e) => {
          hide(e, true);
        }}
      >
        <CancelBtnSvg />
        <p>Back</p>
      </CancelBtn>
    </WriteForm>
  );
};

export default WriteModal;

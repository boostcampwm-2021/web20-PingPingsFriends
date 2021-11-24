import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Palette } from '@lib/styles/Palette';
import SwipeBox from '@common/SwipeBox/SwipeBox';
import Preview from './Preview';
import { ReactComponent as AddContentsSvg } from '../../assets/icons/add_contents.svg';
import { ReactComponent as PetBtnSvg } from '../../assets/icons/pet_btn.svg';
import { ReactComponent as CancelBtnSvg } from '../../assets/icons/cancel_btn3.svg';
import { flexBox, boxShadow } from '@lib/styles/mixin';
import { ToggleHandler } from '@common/Modal/useModal';
import { useUserState } from '@src/contexts/UserContext';
import { useHistory } from 'react-router';

interface InitState {
  contents: string[];
  text: string;
  feedId: number;
}

interface WriteModalProps {
  hide: ToggleHandler;
  initState?: InitState;
}

type Content = File | string;

const WriteModal = ({ hide, initState }: WriteModalProps) => {
  const MAX_CONTENTS = 8;
  const MAX_TEXT = 500;
  const [contents, setContents] = useState<Content[]>([]);
  const [text, setText] = useState('');
  const [isValid, setValid] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputContents = e.target.files as FileList;
    setContents([...contents, ...inputContents].slice(0, 8));
  };
  const userState = useUserState();
  const history = useHistory();

  const removeContents = (targetIdx: number) => {
    const newContents = contents.filter((file, idx) => idx !== targetIdx);
    setContents(newContents);
  };
  const handleTextInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 500) return;
    setText(e.target.value);
  };
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) return;
    const data = new FormData();
    data.append('humanContent', text);
    data.append('animalContent', text);
    data.append('habitatId', (userState.data?.habitatId as number).toString());
    contents.forEach((content) => data.append('upload', content));
    const form = e.target as HTMLFormElement;

    try {
      if (!userState.data) {
        return;
      }
      let response: Response;
      if (initState) {
        response = await fetch(`/api/posts/${initState.feedId}`, { method: 'PATCH', headers: { Authorization: `Bearer ${userState.data.accessToken}` } });
      } else response = await fetch(form.action, { method: 'POST', headers: { Authorization: `Bearer ${userState.data.accessToken}` }, body: data });

      const result = await response.json();

      if (result) {
        // 글쓰기 성공
        if (initState) history.go(0);
        else hide('off');
      } else {
        // 글쓰기 실패
      }
    } catch (e) {
      console.log(e as Error);
    }
  };

  useEffect(() => {
    if (!initState) return;
    setContents(initState.contents);
    setText(initState.text);
  }, [initState]);
  useEffect(() => {
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [contents]);
  useEffect(() => {
    if (contents.length && text.length) setValid(true);
    else setValid(false);
  }, [contents, text]);

  if (userState.data?.userId !== -1) {
    return (
      <WriteForm method={'POST'} action={'/api/posts'} id={'write'} onSubmit={handleFormSubmit}>
        <ContentsDiv>
          <FileInsertLabel htmlFor="input-contents">
            <AddContentsSvg />
            <p>
              {contents.length}/{MAX_CONTENTS}
            </p>
          </FileInsertLabel>
          <FileInput ref={fileInputRef} onChange={handleFileInputChange} id="input-contents" type="file" accept="image/*, video/*" name="contents" form="write" multiple />
          {contents.length ? (
            <SwipeBox width="80%" height="100%" gap="10px">
              <>
                {contents.map((file, idx) => (
                  <Preview key={idx} file={file} idx={idx} removeContents={removeContents} />
                ))}
              </>
            </SwipeBox>
          ) : null}
        </ContentsDiv>
        <TextInput value={text} onChange={handleTextInputChange} name="text" form="write" placeholder="내용을 입력하세요" />
        <TextIndicatorP>
          ({text.length}/{MAX_TEXT})
        </TextIndicatorP>
        <ValidInfoP>{isValid ? '' : '사진과 글은 필수입니다!'}</ValidInfoP>
        <SubmitBtn type={'submit'} valid={isValid}>
          <PetBtnSvg />
          <p>Done</p>
        </SubmitBtn>
        <CancelBtn className="modal-close-button" type="button" onClick={hide}>
          <CancelBtnSvg />
          <p>Back</p>
        </CancelBtn>
      </WriteForm>
    );
  } else {
    return <AlertDiv>먼저 로그인 해주세요!</AlertDiv>;
  }
};

export default WriteModal;

const WriteForm = styled.form`
  ${boxShadow('20px')};
  background-color: ${Palette.WHITE};
  width: 600px;
  height: 400px;
  position: relative;
  padding: 30px;
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

const AlertDiv = styled.div`
  ${boxShadow('20px')};
  background-color: ${Palette.WHITE};
  width: 300px;
  height: 200px;
  text-align: center;
  line-height: 200px;
`;

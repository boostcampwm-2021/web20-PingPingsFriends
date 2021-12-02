import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { flexBox } from '@lib/styles/mixin';
import { ReactComponent as PhotoCameraSvg } from '@assets/icons/photo_camera.svg';
import defaultImage from '@assets/images/default_avatar.png';
import useReadFileURL from '@hooks/useReadFileURL';
import Button from '@components/Button/Button';
import useFlag from '@components/Register/useFlag';
import logo from '@assets/images/logo2.png';
import { RegisterState, useRegisterDispatch, useRegisterState } from '@src/contexts/RegisterContext';
import { useHistory } from 'react-router-dom';
import Modal from '@common/Modal/Modal';
import AlertDiv from '@common/Alert/AlertDiv';
import useFileInputAlert from '@hooks/useFileInputAlert';

const ProfileImage = () => {
  const [profile, setProfile] = useState<File | null>(null);
  const { loading, ref, checkIt, setLoading, handleClick: handleLabelClick } = useFileInputAlert();
  const imageURL = useReadFileURL({ file: profile });
  const flag = useFlag(imageURL);
  const registerState = useRegisterState();
  const registerDispatch = useRegisterDispatch();
  const history = useHistory();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.target.id === 'profile') {
      const target = e.target as HTMLInputElement;
      const file = target.files![0];
      setProfile(file);
      checkIt();
      return;
    }
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const data = new FormData();

    Object.keys(registerState).forEach((key) => {
      const value = registerState[key as keyof RegisterState];
      if (typeof value === 'string') {
        data.append(key, value);
      }
    });
    if (registerState.habitatInfo) {
      data.append('habitatName', registerState.habitatInfo.name);
      data.append('habitatColor', registerState.habitatInfo.color);
    }
    if (registerState.speciesInfo) {
      data.append('speciesName', registerState.speciesInfo.name);
      data.append('speciesSound', registerState.speciesInfo.sound);
    }

    if (target.classList.contains('cancel-button')) {
      try {
        setLoading('loading');
        const response = await fetch('/api/users/register', { method: 'POST', body: data });
        if (!response.ok) {
          throw new Error('회원가입 실패');
        }
        await response.json();

        setLoading('success');
      } catch (e) {
        setLoading('fail');
        registerDispatch({ type: 'RESET_VALUES' });
      }
      return;
    }
    if (flag && target.classList.contains('confirm-button')) {
      setLoading('loading');
      data.append('upload', profile!);

      try {
        const response = await fetch('/api/users/register', { method: 'POST', body: data });
        if (!response.ok) {
          throw new Error('회원가입 실패');
        }
        await response.json();
        setLoading('success');
      } catch (e) {
        console.log(e);
        setLoading('fail');
        registerDispatch({ type: 'RESET_VALUES' });
      }
    }
  };

  return (
    <ProfileImageBlock>
      <Header>
        <img className={'logo'} src={logo} alt={'로고'} />
        <div className={'title'}>프로필 사진 등록하기</div>
      </Header>
      <Form>
        <FileInsertLabel htmlFor="profile" imageURL={imageURL} onClick={handleLabelClick}>
          <SvgContainer>
            <PhotoCameraSvg />
          </SvgContainer>
        </FileInsertLabel>
        <FileInput id="profile" type="file" accept="image/*" name="contents" form="write" onChange={handleChange} ref={ref} />
      </Form>
      자신을 잘 나타내는 이미지를 골라주세요
      <ButtonContainer>
        <Button className={'cancel-button'} borderColor={'none'} onClick={handleClick}>
          다음에 할래요!
        </Button>
        <Button className={`${flag && 'active'} confirm-button`} onClick={handleClick}>
          설정
        </Button>
      </ButtonContainer>
      {loading === 'loading' && (
        <Modal isShowing={true}>
          <AlertDiv>회원가입 중입니다.</AlertDiv>
        </Modal>
      )}
      {loading === 'fail' && (
        <Modal isShowing={true}>
          <AlertDiv>
            다시 시도해주세요.
            <Button borderColor={'black'} onClick={() => history.replace('/register')}>
              확인
            </Button>
          </AlertDiv>
        </Modal>
      )}
      {loading === 'success' && (
        <Modal isShowing={true}>
          <AlertDiv>
            <div>성공! 로그인창으로 이동합니다.</div>
            <Button borderColor={'black'} onClick={() => history.replace('/modal/login/')}>
              확인
            </Button>
          </AlertDiv>
        </Modal>
      )}
    </ProfileImageBlock>
  );
};

export default ProfileImage;

const ProfileImageBlock = styled.div`
  position: absolute;
  padding: 0 40px;
  width: 370px;
  height: 420px;
`;
const Header = styled.div`
  ${flexBox('space-between', 'flex-start', 'column')};
  .logo {
    height: 80px;
    object-fit: cover;
  }
  .title {
    margin: 15px 0;
    font-size: 24px;
  }
`;

const FileInsertLabel = styled.label<{ imageURL: string }>`
  width: 100px;
  height: 100px;
  border: 1px solid black;
  border-radius: 50%;
  text-align: center;
  flex-shrink: 0;
  position: relative;
  margin: 0;
  &::after {
    padding-bottom: 100%;
    border-radius: 50%;
    content: '';
    background-image: url(${({ imageURL }) => (imageURL.length ? imageURL : defaultImage)});
    background-size: cover;
    display: block;
  }
`;

const SvgContainer = styled.div`
  ${flexBox('center', 'center')};
  position: absolute;
  z-index: 1;
  width: 30px;
  height: 30px;
  background: white;
  border-radius: 50%;
  bottom: 0;
  right: 0;
`;

const FileInput = styled.input`
  display: none;
`;

const Form = styled.form`
  ${flexBox('center', 'center', 'column')};

  & > * {
    margin: 20px;
  }
`;

const ButtonContainer = styled.div`
  ${flexBox('space-between', 'center')};
  margin-top: 100px;
  width: 100%;
`;

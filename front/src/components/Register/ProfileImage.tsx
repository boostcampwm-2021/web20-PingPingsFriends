import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { flexBox } from '@lib/styles/mixin';
import { ReactComponent as PhotoCameraSvg } from '@assets/icons/photo_camera.svg';
import defaultImage from '@assets/images/default_avatar.png';
import useReadFileURL from '@hooks/useReadFileURL';
import Button from '@components/Button/Button';
import useFlag from '@components/Register/useFlag';

const ProfileImage = () => {
  const [profile, setProfile] = useState<File | null>(null);
  const imageURL = useReadFileURL({ file: profile });
  const flag = useFlag(imageURL);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.target.id === 'profile') {
      const target = e.target as HTMLInputElement;
      const file = target.files![0];
      setProfile(file);
      return;
    }
  };
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.classList.contains('cancel-button')) {
      console.log('go home');
      // history.push('/');
      return;
    }
    if (flag && target.classList.contains('confirm-button')) {
      //todo: fetch profile-image
      console.log('profile image fetch 보내기 & home');
      // history.push('/');
    }
  };

  return (
    <ProfileImageBlock>
      <Header>
        <div className={'logo'}>핑핑이와 친구들</div>
        <div className={'title'}>프로필 사진 등록하기</div>
      </Header>
      <Form>
        <FileInsertLabel htmlFor="profile" imageURL={imageURL}>
          <SvgContainer>
            <PhotoCameraSvg />
          </SvgContainer>
        </FileInsertLabel>
        <FileInput id="profile" type="file" accept="image/*" name="contents" form="write" onChange={handleChange} />
      </Form>
      자신을 잘 나타내는 이미지를 골라주세요
      <ButtonContainer onClick={handleClick}>
        <Button className={'cancel-button'} borderColor={'none'}>
          다음에 할래요!
        </Button>
        <Button className={`${flag && 'active'} confirm-button`}>설정</Button>
      </ButtonContainer>
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
    font-size: 18px;
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

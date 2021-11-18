import React from 'react';
import styled from 'styled-components';
import { flexBox } from '@lib/styles/mixin';
import { ReactComponent as PhotoCameraSvg } from '@assets/icons/photo_camera.svg';
import defaultImage from '@assets/images/default_avatar.png';
import { InfoData } from '@components/Register/Register';
import useReadFileURL from '@hooks/useReadFileURL';

interface MoreInfoProps {
  values: InfoData;
  handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
}

const ProfileImage = ({ values, handleChange }: MoreInfoProps) => {
  const { profile } = values;
  const imageURL = useReadFileURL({ file: profile });

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

const FileInsertLabel = styled.label<{ imageURL?: string | null }>`
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
    background-image: url(${({ imageURL }) => (imageURL ? imageURL : defaultImage)});
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

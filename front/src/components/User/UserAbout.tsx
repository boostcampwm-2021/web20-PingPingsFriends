import React, { useState } from 'react';
import { User } from '@src/types/User';
import styled from 'styled-components';
import { flexBox } from '@src/lib/styles/mixin';
import Avatar from '@common/Avatar/Avatar';
import { Palette } from '@src/lib/styles/Palette';
import { ReactComponent as PhotoCameraSvg } from '@assets/icons/photo_camera.svg';
import { getAuthOption } from '@lib/utils/fetch';
import { useUserState } from '@src/contexts/UserContext';
import Modal from '@common/Modal/Modal';
import AlertDiv from '@common/Alert/AlertDiv';
import { ModalType } from '@src/types/Modal';
import Button from '@components/Button/Button';

interface UserAboutProps {
  userInfo: User | null;
}

const UserAbout = ({ userInfo }: UserAboutProps) => {
  const { data: userData } = useUserState();
  const [loading, setLoading] = useState<ModalType>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const file = target.files![0];

    const data = new FormData();
    data.append('upload', file);
    try {
      const response = await fetch('/api/users/contents', getAuthOption('PATCH', userData!.accessToken, data));
      await response.json();
      setLoading('success');

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (e) {
      setLoading('fail');
    }
  };

  const handleClick = () => {
    setLoading('loading');
  };

  return (
    <UserAboutDiv>
      {userData?.userId === userInfo?.id ? (
        <Form>
          <FileInsertLabel htmlFor="profile" onClick={handleClick}>
            <AvatarDiv>
              <Avatar imgSrc={userInfo?.content?.url} size={'100%'} preventLink />
            </AvatarDiv>
            <SvgContainer>
              <PhotoCameraSvg />
            </SvgContainer>
          </FileInsertLabel>
          <FileInput id="profile" type="file" accept="image/*" name="contents" form="write" onChange={handleChange} />
        </Form>
      ) : (
        <AvatarDiv>
          <Avatar imgSrc={userInfo?.content?.url} size={'100%'} preventLink />
        </AvatarDiv>
      )}

      <TextDiv>
        {userInfo ? (
          <>
            <p className={'nickname'}>{userInfo.nickname}</p>
            <p>{userInfo.species?.name}</p>
            <p>서식지:{userInfo.habitat?.name}</p>
          </>
        ) : (
          '존재하지 않는 사용자입니다'
        )}
      </TextDiv>
      {loading === 'loading' && (
        <Modal isShowing={true}>
          <AlertDiv>프로필 사진 변경 중</AlertDiv>
        </Modal>
      )}
      {loading === 'fail' && (
        <Modal isShowing={true}>
          <AlertDiv>다시 시도해주세요.</AlertDiv>
          <Button borderColor={'black'} onClick={() => setLoading(null)} children={'확인'} />
        </Modal>
      )}
      {loading === 'success' && (
        <Modal isShowing={true}>
          <AlertDiv>
            <div>변경 성공!</div>
            <Button borderColor={'black'} onClick={() => window.location.reload()} children={'확인'} />
          </AlertDiv>
        </Modal>
      )}
    </UserAboutDiv>
  );
};

export default UserAbout;

const UserAboutDiv = styled.div`
  ${flexBox('center', 'center', 'row')};
  gap: 10px;
  width: 100%;
  height: 150px;
  border: 1px solid ${Palette.WHITE};
  border-radius: 20px;
  margin-bottom: 20px;
  /* background-color: aliceblue; */
`;

const AvatarDiv = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  border: 5px solid white;
  box-sizing: content-box;
`;

const TextDiv = styled.div`
  ${flexBox('center', 'flex-start', 'column')};
  width: 70%;
  height: 100%;
  /* background-color: aqua; */
  font-size: 20px;
  .nickname {
    font-size: 50px;
  }
`;

const FileInsertLabel = styled.label`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  text-align: center;
  position: relative;
  background: rgba(255, 255, 255, 0);
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
`;

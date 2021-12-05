import React from 'react';
import { User } from '@src/types/User';
import styled from 'styled-components';
import { flexBox } from '@src/lib/styles/mixin';
import Avatar from '@common/Avatar/Avatar';
import { Palette } from '@src/lib/styles/Palette';
import { ReactComponent as PhotoCameraSvg } from '@assets/icons/photo_camera.svg';
import { getAuthOption, fetchAPI } from '@lib/utils/fetch';
import { useUserState } from '@src/contexts/UserContext';
import Modal from '@common/Modal/Modal';
import AlertDiv from '@common/Alert/AlertDiv';
import Button from '@components/Button/Button';
import { useHistory } from 'react-router';
import useFileInputAlert from '@hooks/useFileInputAlert';

interface UserAboutProps {
  userInfo: User | null;
}

const UserAbout = ({ userInfo }: UserAboutProps) => {
  const { data: userData } = useUserState();
  const history = useHistory();
  const { loading, ref, checkIt, setLoading, handleClick } = useFileInputAlert();
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const file = target.files![0];

    const data = new FormData();
    data.append('upload', file);
    fetchAPI(
      '/api/users/contents',
      (okRes) => {
        checkIt('success');

        setTimeout(() => {
          history.go(0);
        }, 1500);
      },
      (failRes) => {
        checkIt('fail');
      },
      (err) => {
        checkIt('fail');
      },
      getAuthOption('PATCH', userData!.accessToken, data)
    );
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
          <FileInput id="profile" type="file" accept="image/*" name="contents" form="write" onChange={handleChange} ref={ref} />
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
            <p className={'speciesName'}> {userInfo.species?.name}</p>
            <p className={'habitatName'}>서식지:{userInfo.habitat?.name}</p>
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
          <AlertDiv>
            다시 시도해주세요.
            <Button borderColor={'black'} onClick={() => setLoading(null)} children={'확인'} />
          </AlertDiv>
        </Modal>
      )}
      {loading === 'success' && (
        <Modal isShowing={true}>
          <AlertDiv>
            <div>변경 성공!</div>
            <Button borderColor={'black'} onClick={() => history.go(0)} children={'확인'} />
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
  .nickname {
    font-size: 20px;
    margin-bottom: 20px;
  }
  .speciesName {
    font-size: 15px;
    margin-bottom: 5px;
  }
  .habitatName {
    font-size: 15px;
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
  position: absolute;
  opacity: 0;
  top: 0;
  height: 0;
  width: 0;
  left: 0;
`;

const Form = styled.form`
  ${flexBox('center', 'center', 'column')};
`;

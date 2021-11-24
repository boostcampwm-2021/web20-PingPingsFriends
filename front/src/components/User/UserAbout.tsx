import React from 'react';
import { User } from '@src/types/User';
import styled from 'styled-components';
import { flexBox } from '@src/lib/styles/mixin';
import Avatar from '@common/Avatar/Avatar';
import { Palette } from '@src/lib/styles/Palette';

interface UserAboutProps {
  userInfo: User | null;
}

const UserAbout = ({ userInfo }: UserAboutProps) => {
  return (
    <UserAboutDiv>
      <AvatarDiv>
        <Avatar imgSrc={userInfo?.content?.url} size={'100%'} />
      </AvatarDiv>
      <TextDiv>
        {userInfo ? (
          <>
            <p className={'nickname'}>{userInfo.nickname}</p>
            <p>{userInfo.speciesId}</p>
            <p>서식지:{userInfo.habitatId}</p>
          </>
        ) : (
          '존재하지 않는 사용자입니다'
        )}
      </TextDiv>
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

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Palette } from '@src/lib/styles/Palette';
import useHabitatInfo from '@src/hooks/useHabitatInfo';
import { useParams } from 'react-router';
import { User } from '@src/types/User';
import UserAbout from '@src/components/User/UserAbout';
import UserFeed from '@src/components/User/UserFeed';
import MagicNumber from '@src/lib/styles/magic';
import { useUserState } from '@src/contexts/UserContext';
import useValidateUser from '@src/hooks/useValidateUser';

const UserArticle = () => {
  const param: { id: string } = useParams();
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const { habitatInfo } = useHabitatInfo(userInfo?.habitat?.id ?? undefined);
  const userState = useUserState();
  useValidateUser(userState);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const res: Response = await fetch(`/api/users/${param.id}`);
      if (res.ok) {
        const data: User = await res.json();
        setUserInfo(data);
      } else {
        console.log(res);
      }
    };

    try {
      fetchUserInfo();
    } catch (e) {
      console.log(e);
    }
  }, [param]);
  return (
    <UserPageDiv>
      <ContentDiv color={habitatInfo?.habitat.color}>
        <UserAbout userInfo={userInfo} />
        <UserFeed userId={userInfo?.id} />
      </ContentDiv>
    </UserPageDiv>
  );
};

export default UserArticle;

const UserPageDiv = styled.div`
  height: 100vw;
`;

const ContentDiv = styled.div<{ color: string | undefined }>`
  width: ${MagicNumber.FEED_SECTION_WIDTH};
  height: calc(100% - ${MagicNumber.HEADER_HEIGHT});
  position: relative;
  background-color: ${(props) => props.color ?? Palette.GRAY};
  margin: auto;
  padding: 20px;
`;

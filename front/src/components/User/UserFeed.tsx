import React, { useEffect, useState } from 'react';
import { UserFeeds } from '@src/types/User';
import styled from 'styled-components';
import { prettyScroll } from '@src/lib/styles/mixin';
import MagicNumber from '@src/lib/styles/magic';

interface UserFeedProps {
  userId: number | undefined;
}

const UserFeed = ({ userId }: UserFeedProps) => {
  const [feeds, setFeeds] = useState<UserFeeds>([]);
  useEffect(() => {
    const fetchUserFeed = async () => {
      const res: Response = await fetch(`/api/posts/users/${userId}`);
      if (res.ok) {
        const data: UserFeeds = await res.json();
        setFeeds(data);
      }
    };
    fetchUserFeed();
  }, [userId]);
  return (
    <FeedGridDiv>
      {feeds.map(({ postId, url }) => (
        <FeedCell key={postId}>
          <img src={url} key={postId} alt={'feed img'} />
        </FeedCell>
      ))}
    </FeedGridDiv>
  );
};

export default UserFeed;

const FeedGridDiv = styled.div`
  ${prettyScroll()};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: space-between;
  width: 100%;
  overflow-y: scroll;
  height: calc(100% - 180px);
`;

const FeedCell = styled.div`
  width: 150px;
  height: 150px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

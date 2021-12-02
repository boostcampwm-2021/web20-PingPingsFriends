import React, { useEffect, useState } from 'react';
import { UserFeeds } from '@src/types/User';
import styled from 'styled-components';
import { prettyScroll } from '@src/lib/styles/mixin';
import FeedCell from './FeedCell';

interface UserFeedProps {
  userId: number | undefined;
}

const UserFeed = ({ userId }: UserFeedProps) => {
  const [feeds, setFeeds] = useState<UserFeeds>([]);

  useEffect(() => {
    const fetchUserFeed = async () => {
      if (!userId) return;
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
        <FeedCell key={postId} feedId={postId} url={url} />
      ))}
    </FeedGridDiv>
  );
};

export default UserFeed;

const FeedGridDiv = styled.div`
  ${prettyScroll()};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: max-content;
  justify-content: space-between;
  width: 100%;
  overflow-y: scroll;
  height: calc(100% - 180px);
`;

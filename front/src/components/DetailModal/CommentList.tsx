import { prettyScroll } from '@src/lib/styles/mixin';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Comment from './Comment';
import { Comments } from '@src/types/Comment';
import { useElementRef } from '@hooks/useElementRef';

const ScrollBox = styled.div`
  ${prettyScroll()};
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 300px;
  padding-top: 5px;
`;

interface CommentListProps {
  feedId: number;
  toggleEditMode: (text: string) => void;
}

const CommentList = ({ feedId, toggleEditMode }: CommentListProps) => {
  const [comments, setComments] = useState<Comments>([]);
  const [lastComment, setLastComment] = useState(0);
  const [observerElement, observerRef] = useElementRef();
  const [bottomElement, bottomRef] = useElementRef();

  useEffect(() => {
    getComment();

    async function getComment() {
      const response: Response = await fetch(`/api/comments/cursor/?limit=10&postId=${feedId}${lastComment ? `&lastId=${lastComment}` : ''}`);
      const commentsData: Comments = await response.json();

      setComments((comments) => [...comments, ...commentsData]);
    }
  }, [lastComment]);

  const options = { root: observerElement, rootMargin: '150px', threshold: 1.0 };

  const handleObserver = (entries: any) => {
    const target = entries[0];
    if (target.isIntersecting && comments.length) {
      setLastComment(comments[comments.length - 1].id);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, options);
    if (bottomElement) observer.observe(bottomElement);
    return () => observer.disconnect();
  }, [handleObserver]);

  return (
    <ScrollBox ref={observerRef}>
      {comments.map(({ user, content, userId, id, createdAt }) => (
        <Comment toggleEditMode={toggleEditMode} userId={userId} key={id} nickname={user.nickname} comment={content} avatar={user.content?.url} createdAt={createdAt} />
      ))}
      <div ref={bottomRef} />
    </ScrollBox>
  );
};

export default CommentList;

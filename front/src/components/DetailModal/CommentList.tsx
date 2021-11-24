import { prettyScroll } from '@src/lib/styles/mixin';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Comment from './Comment';
import { Comments } from '@src/types/Comment';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
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

const CommentList = ({ toggleEditMode }: CommentListProps) => {
  const [comments, setComments] = useState<Comments>([]);
  const [lastComment, setLastComment] = useState(0);
  const [observerElement, observerRef] = useElementRef();

  useEffect(() => {
    getComment();

    async function getComment() {
      const response: Response = await fetch(`/api/comments/cursor/?limit=10&postId=3${lastComment ? `&lastId=${lastComment}` : ''}`);
      const commentsData: Comments = await response.json();

      setComments((comments) => [...comments, ...commentsData]);
    }
  }, [lastComment]);

  const callback: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && comments.length) {
        if (comments.length % 10 === 0) {
          setLastComment(comments[comments.length - 1].id);
          return;
        }
        observer.unobserve(entry.target);
      }
    });
  };

  const bottomRef = useIntersectionObserver(callback, {
    root: observerElement,
    rootMargin: '150px 0px',
  });

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

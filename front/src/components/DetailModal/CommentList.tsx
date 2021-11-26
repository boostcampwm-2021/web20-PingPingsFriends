import { prettyScroll } from '@src/lib/styles/mixin';
import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import Comment from './Comment';
import { Comments } from '@src/types/Comment';
import { useElementRef } from '@hooks/useElementRef';
import useScrollObserver from '@hooks/useScrollObserver';
import { CommentAction, CommentState } from './useCommentList';

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
  commentState: CommentState;
  commentDispatch: React.Dispatch<CommentAction>;
}

const CommentList = ({ feedId, toggleEditMode, commentState, commentDispatch }: CommentListProps) => {
  const { commentList: comments, lastComment } = commentState;
  async function getComment() {
    const response: Response = await fetch(`/api/comments/cursor/?limit=10&postId=${feedId}${lastComment !== -1 ? `&lastId=${lastComment}` : ''}`);
    const commentsData: Comments = await response.json();

    if (lastComment === -1) {
      commentDispatch({ type: 'INIT_COMMENT_LIST', data: commentsData });
      return;
    }
    commentDispatch({ type: 'UPDATE_COMMENT_LIST', data: commentsData });
  }

  useEffect(() => {
    if (lastComment === -1) {
      getComment();
      return;
    } else if (!comments.length || lastComment === 0) return;
    getComment();
  }, [lastComment]);

  const [observerElement, observerRef] = useElementRef();

  const options = { root: observerElement, rootMargin: '150px', threshold: 1.0 };

  const handleObserver = useCallback(
    (entries: any) => {
      const target = entries[0];
      if (target.isIntersecting && comments.length) {
        commentDispatch({ type: 'UPDATE_LAST_COMMENT', data: comments[comments.length - 1].id });
      }
    },
    [comments]
  );
  const bottomRef = useScrollObserver(handleObserver, options);

  return (
    <ScrollBox ref={observerRef}>
      {comments.map(({ user, content, userId, id, createdAt }, idx) => {
        if (idx === comments.length - 1)
          return (
            <Comment
              toggleEditMode={toggleEditMode}
              commentId={id}
              userId={userId}
              key={id}
              nickname={user.nickname}
              comment={content}
              avatar={user.content?.url}
              createdAt={createdAt}
              bottomRef={bottomRef}
            />
          );
        return <Comment toggleEditMode={toggleEditMode} commentId={id} userId={userId} key={id} nickname={user.nickname} comment={content} avatar={user.content?.url} createdAt={createdAt} />;
      })}
    </ScrollBox>
  );
};

export default CommentList;

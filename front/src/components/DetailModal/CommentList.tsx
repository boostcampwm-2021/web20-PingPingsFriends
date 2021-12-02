import { prettyScroll } from '@src/lib/styles/mixin';
import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import Comment from './Comment';
import { Comments } from '@src/types/Comment';
import { useElementRef } from '@hooks/useElementRef';
import useScrollObserver from '@hooks/useScrollObserver';
import { CommentAction, CommentState, InputModeState, InputModeAction } from './useCommentList';

interface CommentListProps {
  feedId: number;
  commentState: CommentState;
  commentDispatch: React.Dispatch<CommentAction>;
  inputMode: InputModeState;
  inputModeDispatch: React.Dispatch<InputModeAction>;
}

const CommentList = ({ feedId, commentState, commentDispatch, inputMode, inputModeDispatch }: CommentListProps) => {
  const { commentList: comments, lastComment } = commentState;
  async function getComment() {
    const response: Response = await fetch(`/api/comments/cursor/?limit=10&postId=${feedId}${lastComment !== -1 ? `&lastId=${lastComment}` : ''}`);
    const commentsData: Comments = await response.json();

    if (lastComment === -1) {
      commentDispatch({ type: 'INIT_COMMENT_LIST', data: { commentList: commentsData } });
      return;
    }
    commentDispatch({ type: 'UPDATE_COMMENT_LIST', data: { commentList: commentsData } });
  }

  useEffect(() => {
    if (lastComment === -1) {
      getComment();
      return;
    }
    if (!comments.length || lastComment === 0) return;
    getComment();
  }, [lastComment]);

  const [observerElement, observerRef] = useElementRef();

  const options = { root: observerElement, rootMargin: '150px', threshold: 1.0 };

  const handleObserver = useCallback(
    (entries: any) => {
      const target = entries[0];
      if (target.isIntersecting && comments.length) {
        commentDispatch({ type: 'UPDATE_LAST_COMMENT', data: { lastComment: comments[comments.length - 1].id } });
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
              commentId={id}
              userId={userId}
              key={id}
              nickname={user.nickname}
              comment={content}
              inputMode={inputMode}
              inputModeDispatch={inputModeDispatch}
              commentDispatch={commentDispatch}
              avatar={user.content?.url}
              createdAt={createdAt}
              bottomRef={bottomRef}
            />
          );
        return (
          <Comment
            commentId={id}
            userId={userId}
            key={id}
            nickname={user.nickname}
            comment={content}
            inputMode={inputMode}
            inputModeDispatch={inputModeDispatch}
            commentDispatch={commentDispatch}
            avatar={user.content?.url}
            createdAt={createdAt}
          />
        );
      })}
    </ScrollBox>
  );
};

export default CommentList;

const ScrollBox = styled.div`
  ${prettyScroll()};
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 300px;
  padding-top: 5px;
`;

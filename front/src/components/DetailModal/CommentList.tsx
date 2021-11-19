import { prettyScroll } from '@src/lib/styles/mixin';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import Comment from './Comment';

const ScrollBox = styled.div`
  ${prettyScroll()};
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 300px;
  padding-top: 5px;
`;

const dummy_comment = [
  { nickname: '감염된 핑핑이', comment: '하하하하', id: 'admin' },
  { nickname: '감염된 핑핑이', comment: '하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하', id: 'me' },
  { nickname: '감염된 핑핑이', comment: '하하하하', id: 'admin' },
  { nickname: '감염된 핑핑이', comment: '하하하하', id: 'admin' },
  { nickname: '감염된 핑핑이', comment: '하하하하', id: 'admin' },
  { nickname: '감염된 핑핑이', comment: '하하하하', id: 'admin' },
  { nickname: '감염된 핑핑이', comment: '하하하하', id: 'admin' },
  { nickname: '감염된 핑핑이', comment: '하하하하', id: 'admin' },
  { nickname: '감염된 핑핑이', comment: '하하하하', id: 'admin' },
  { nickname: '감염된 핑핑이', comment: '하하하하', id: 'admin' },
  { nickname: '감염된 핑핑이', comment: '하하하하', id: 'admin' },
  {
    nickname: '감염된 핑핑이',
    comment: '하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하',
    id: 'me',
  },
  { nickname: '감염된 핑핑이', comment: '하하하하', id: 'admin' },
  { nickname: '감염된 핑핑이', comment: '하하하하', id: 'admin' },
  { nickname: '감염된 핑핑이', comment: '하하하하', id: 'admin' },
  { nickname: '감염된 핑핑이', comment: '하하하하', id: 'admin' },
];

interface CommentListProps {
  feedId: number;
  toggleEditMode: (text: string) => void;
}

const CommentList = ({ feedId, toggleEditMode }: CommentListProps) => {
  useEffect(() => {
    //   fetch('/comment/:feedId')
  }, [feedId]);

  return (
    <ScrollBox>
      {dummy_comment.map(({ nickname, comment, id }, idx) => (
        <Comment toggleEditMode={toggleEditMode} userId={id} key={idx} nickname={nickname} comment={comment} />
      ))}
    </ScrollBox>
  );
};

export default CommentList;

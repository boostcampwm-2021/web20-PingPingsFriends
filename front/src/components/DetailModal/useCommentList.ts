import { Comments } from '@src/types/Comment';
import React, { useReducer } from 'react';

export interface CommentState {
  commentList: Comments;
  lastComment: number;
}

const initCommentState: CommentState = {
  commentList: [],
  lastComment: -1,
};

export interface CommentAction {
  type: 'UPDATE_LAST_COMMENT' | 'UPDATE_COMMENT_LIST' | 'REFRESH' | 'INIT_COMMENT_LIST';
  data?: Comments | number;
}

const reducer = (state: CommentState, action: CommentAction): CommentState => {
  switch (action.type) {
    case 'UPDATE_COMMENT_LIST':
      return { ...state, commentList: [...state.commentList, ...(action.data as Comments)] };
    case 'UPDATE_LAST_COMMENT':
      return { ...state, lastComment: action.data as number };
    case 'REFRESH':
      return initCommentState;
    case 'INIT_COMMENT_LIST':
      return { commentList: action.data as Comments, lastComment: 0 };
    default:
      throw new Error('unhandled action');
  }
};

const useCommentList = (): [CommentState, React.Dispatch<CommentAction>] => {
  const [state, dispatch] = useReducer(reducer, initCommentState);
  return [state, dispatch];
};

export default useCommentList;

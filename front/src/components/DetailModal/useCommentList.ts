import { Comments } from '@src/types/Comment';
import { useReducer } from 'react';

// 댓글 목록 상태
export interface CommentState {
  commentList: Comments;
  lastComment: number;
}

const initCommentState: CommentState = {
  commentList: [],
  lastComment: -1,
};

export interface CommentAction {
  type: 'UPDATE_LAST_COMMENT' | 'UPDATE_COMMENT_LIST' | 'REFRESH' | 'INIT_COMMENT_LIST' | 'SET_MODE';
  data?: Partial<CommentState>;
}

const commentReducer = (state: CommentState, action: CommentAction): CommentState => {
  switch (action.type) {
    case 'UPDATE_COMMENT_LIST':
      if (!action.data || !action.data.commentList) throw new Error('not enough data');
      return { ...state, commentList: [...state.commentList, ...action.data.commentList] };
    case 'UPDATE_LAST_COMMENT':
      if (!action.data || !action.data.lastComment) throw new Error('not enough data');
      return { ...state, lastComment: action.data.lastComment };
    case 'REFRESH':
      return initCommentState;
    case 'INIT_COMMENT_LIST':
      if (!action.data || !action.data.commentList) throw new Error('not enough data');
      return { ...state, commentList: action.data.commentList, lastComment: 0 };
    default:
      throw new Error('unhandled action about comment reducer');
  }
};

// 입력폼 관련 상태
type Mode = 'edit' | 'delete' | 'write';

export interface InputModeState {
  mode: Mode;
  focusCommentId: null | number;
  inputText: string;
}

const initModeState: InputModeState = {
  mode: 'write',
  focusCommentId: null,
  inputText: '',
};

export interface InputModeAction {
  type: 'SET_EDIT_MODE' | 'SET_DELETE_MODE' | 'INIT_NORMAL_MODE' | 'SET_INPUT_TEXT';
  data?: Partial<InputModeState>;
}

const modeReducer = (state: InputModeState, action: InputModeAction): InputModeState => {
  switch (action.type) {
    case 'INIT_NORMAL_MODE':
      return initModeState;
    case 'SET_EDIT_MODE':
      if (!action.data || !action.data.focusCommentId || !action.data.inputText) throw new Error('not enough data');
      return { mode: 'edit', focusCommentId: action.data.focusCommentId, inputText: action.data.inputText };
    case 'SET_DELETE_MODE':
      if (!action.data || !action.data.focusCommentId) throw new Error('not enough data');
      return { mode: 'delete', focusCommentId: action.data.focusCommentId, inputText: '' };
    case 'SET_INPUT_TEXT':
      if (!action.data || (!action.data.inputText && typeof action.data.inputText !== 'string')) throw new Error('not enough data');
      return { ...state, inputText: action.data.inputText };
    default:
      throw new Error('unhandled action about mode reducer');
  }
};

const useCommentList = () => {
  const [commentState, commentDispatch] = useReducer(commentReducer, initCommentState);
  const [inputMode, inputModeDispatch] = useReducer(modeReducer, initModeState);

  return { commentState, commentDispatch, inputMode, inputModeDispatch };
};

export default useCommentList;

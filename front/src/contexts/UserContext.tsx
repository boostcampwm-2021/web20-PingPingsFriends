import React, { createContext, useReducer, useContext } from 'react';

export interface User {
  userId: number;
  username: string;
  nickname: string;
  habitatId: number;
  speciesId: number;
  url: string;
  accessToken?: string;
}
interface UserState {
  loading: boolean;
  data: User | null;
  error: any | null;
}
interface Action {
  type: 'GET_USER' | 'GET_USER_SUCCESS' | 'GET_USER_ERROR';
  data?: User;
  error?: any;
}
const DEFAULT_HABITAT = 2;
export const initialState: UserState = {
  loading: false,
  data: {
    userId: -1,
    nickname: '익명의 핑핑이',
    url: '/default_avatar.png',
    habitatId: DEFAULT_HABITAT,
    speciesId: 2,
    username: 'pingping',
  },
  error: null,
};
const loadingState: UserState = {
  loading: true,
  data: null,
  error: null,
};

const success = (data: User): UserState => ({
  loading: false,
  data,
  error: null,
});
const error = (error: Error): UserState => ({
  loading: false,
  data: initialState.data,
  error: error,
});

const userReducer = (state: UserState, action: Action): UserState => {
  switch (action.type) {
    case 'GET_USER':
      return loadingState;
    case 'GET_USER_SUCCESS':
      return success(action.data as User);
    case 'GET_USER_ERROR':
      return error(action.error as Error);
    default:
      throw new Error(`Unknown error`);
  }
};

const UserStateContext = createContext<UserState | null>(null);
const UserDispatchContext = createContext<React.Dispatch<Action> | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserDispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={state}>{children}</UserStateContext.Provider>
    </UserDispatchContext.Provider>
  );
};

export const useUserState = () => {
  const state = useContext(UserStateContext);
  if (!state) {
    throw new Error('user state context error');
  }
  return state;
};

export const useUserDispatch = () => {
  const dispatch = useContext(UserDispatchContext);
  if (!dispatch) {
    throw new Error('user dispatch context error');
  }
  return dispatch;
};

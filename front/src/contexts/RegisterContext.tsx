import React, { createContext, useReducer, useContext } from 'react';

export interface RegisterState {
  username: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  habitat: string;
  category: string;
}

interface Action {
  type: 'CHANGE';
  payload: {
    value: string;
    eventName: string;
  };
}

export const initialState: RegisterState = {
  username: '',
  password: '',
  passwordConfirm: '',
  nickname: '',
  habitat: '',
  category: '',
};

const registerReducer = (state: RegisterState, { type, payload }: Action): RegisterState => {
  switch (type) {
    case 'CHANGE': {
      return { ...state, [payload.eventName]: payload.value };
    }
    default: {
      return state;
    }
  }
};

const RegisterStateContext = createContext<RegisterState | null>(null);
const RegisterDispatchContext = createContext<React.Dispatch<Action> | null>(null);

export const RegisterInfoProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(registerReducer, initialState);

  return (
    <RegisterDispatchContext.Provider value={dispatch}>
      <RegisterStateContext.Provider value={state}>{children}</RegisterStateContext.Provider>
    </RegisterDispatchContext.Provider>
  );
};

export const useRegisterState = () => {
  const state = useContext(RegisterStateContext);
  if (!state) {
    throw new Error('register state context error');
  }
  return state;
};

export const useRegisterDispatch = () => {
  const dispatch = useContext(RegisterDispatchContext);
  if (!dispatch) {
    throw new Error('register dispatch context error');
  }
  return dispatch;
};

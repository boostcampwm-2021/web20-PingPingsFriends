import React, { createContext, useReducer, useContext } from 'react';

export interface RegisterState {
  username: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  habitat: string | null;
  species: string | null;
  speciesInfo?: {
    name: string;
    sound: string;
  };
  habitatInfo?: {
    name: string;
    color: string;
  };
}

interface Action {
  type: 'CHANGE' | 'ADD_SPECIES' | 'ADD_HABITAT';
  payload: {
    [propsName: string]: string;
  };
}

export const initialState: RegisterState = {
  username: '',
  password: '',
  passwordConfirm: '',
  nickname: '',
  habitat: null,
  species: null,
};

const registerReducer = (state: RegisterState, { type, payload }: Action): RegisterState => {
  switch (type) {
    case 'CHANGE': {
      return { ...state, ...payload };
    }
    case 'ADD_SPECIES': {
      return { ...state, speciesInfo: payload as { name: string; sound: string }, species: null };
    }
    case 'ADD_HABITAT': {
      return { ...state, habitatInfo: payload as { name: string; color: string }, habitat: null };
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

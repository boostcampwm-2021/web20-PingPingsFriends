import React, { createContext, useReducer, useContext } from 'react';

type SpeciesInfo = { name: string; sound: string };
type HabitatInfo = { name: string; color: string };

export interface RegisterState {
  username: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  habitatId: string | null;
  speciesId: string | null;
  speciesInfo?: SpeciesInfo;
  habitatInfo?: HabitatInfo;
}

interface Action {
  type: 'CHANGE_VALUE' | 'ADD_SPECIES' | 'ADD_HABITAT';
  payload: {
    [propsName: string]: string;
  };
}

export const initialState: RegisterState = {
  username: '',
  password: '',
  passwordConfirm: '',
  nickname: '',
  habitatId: null,
  speciesId: null,
};

const registerReducer = (state: RegisterState, { type, payload }: Action): RegisterState => {
  switch (type) {
    case 'CHANGE_VALUE': {
      return { ...state, ...payload };
    }
    case 'ADD_SPECIES': {
      return { ...state, speciesInfo: payload as SpeciesInfo, speciesId: null };
    }
    case 'ADD_HABITAT': {
      return { ...state, habitatInfo: payload as HabitatInfo, habitatId: null };
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

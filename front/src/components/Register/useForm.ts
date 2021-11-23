import { RegisterState, useRegisterDispatch, useRegisterState } from '@src/contexts/RegisterContext';
import React, { useEffect, useState } from 'react';

export interface Validation<T> {
  value: keyof T;
  check: (values: T) => boolean;
  message: string;
}

export type ErrorType<T> = Partial<Record<keyof T, string>>;

const useForm = (validations: Validation<RegisterState>[]) => {
  const registerState = useRegisterState();
  const registerDispatch = useRegisterDispatch();
  const [errors, setErrors] = useState<ErrorType<RegisterState>>({});
  const [flag, setFlag] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target;
    if (target.value[target.value.length - 1] === ' ') {
      return;
    }
    registerDispatch({ type: 'CHANGE', payload: { eventName: target.name, value: target.value } });
  };

  useEffect(() => {
    const nextError: ErrorType<RegisterState> = {};
    validations
      .filter((validation) => validation.check(registerState))
      .forEach((validation) => {
        nextError[validation.value] = validation.message;
      });
    setErrors(nextError);
  }, [registerState]);

  useEffect(() => {
    setFlag(!Object.keys(errors).length);
  }, [errors]);

  return { registerState, errors, handleChange, flag };
};

export default useForm;

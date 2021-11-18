import { ChangeEvent, useEffect, useState } from 'react';

interface Validation<T> {
  value: keyof T;
  check: (values: T) => boolean;
  message: string;
}

export type Validations<T> = Validation<T>[];
export type ErrorType<T> = Partial<Record<keyof T, string>>;

const useForm = <T>(initialValues: T, validations: Validations<T>) => {
  const [flag, setFlag] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<ErrorType<T>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.target.id === 'profile') {
      const target = e.target as HTMLInputElement;
      const file = target.files![0];
      setValues({ ...values, [e.target.id]: file });

      return;
    }
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const nextError: ErrorType<T> = {};
    validations
      .filter((validation) => validation.check(values))
      .forEach((validation) => {
        nextError[validation.value] = validation.message;
      });
    setErrors(nextError);
  }, [values]);

  useEffect(() => {
    setFlag(!Object.keys(errors).length);
  }, [errors]);

  return { values, handleChange, errors, flag };
};

export default useForm;

import React from 'react';
import { ModalEvent } from '../../Modal/useModal';

interface useDropBox {
  text: string;
  handler?: (event: ModalEvent) => void;
}
export const useDropBox = (arr: useDropBox[]): JSX.Element[] => {
  return arr.map((v) => {
    return (
      <p key={v.text} onClick={v.handler}>
        {v.text}
      </p>
    );
  });
};

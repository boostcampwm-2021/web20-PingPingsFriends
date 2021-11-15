import React from 'react';
import { ModalEvent } from '../Modal/useModal';

interface makeDropBoxMenuProps {
  text: string;
  handler?: (event: ModalEvent) => void;
}
export const makeDropBoxMenu = (arr: makeDropBoxMenuProps[]): JSX.Element[] => {
  return arr.map((v) => {
    return (
      <p key={v.text} onClick={v.handler}>
        {v.text}
      </p>
    );
  });
};

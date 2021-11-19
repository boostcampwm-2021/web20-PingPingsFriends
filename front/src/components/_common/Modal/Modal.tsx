import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { flexBox } from '@lib/styles/mixin';
import useModal, { ModalEvent } from './useModal';

const ModalDiv = styled.div`
  ${flexBox('center', 'center')};
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 10;
`;

const ContentsDiv = styled.div`
  outline: none;
`;

interface ModalProps {
  children: React.ReactNode;
  isShowing: boolean;
  hide: (event: ModalEvent) => void;
}

const Modal = ({ children, isShowing, hide }: ModalProps) => {
  const { $portal, contentRef } = useModal();

  return isShowing
    ? ReactDOM.createPortal(
        <ModalDiv className={'modal-container'} onClick={hide}>
          <ContentsDiv className={'contents'} tabIndex={1} onKeyDown={hide} ref={contentRef}>
            {children}
          </ContentsDiv>
        </ModalDiv>,
        $portal
      )
    : null;
};

export default Modal;

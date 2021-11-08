import React from 'react';
import styled from 'styled-components';
import { flexBox } from '../../lib/styles/mixin';

const ModalDiv = styled.div`
  ${flexBox('center', 'center')};
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
`;

interface ModalProps {
  children: React.ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  return <ModalDiv className={'modal-container'}>{children}</ModalDiv>;
};

export default Modal;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as ZoomBtnSvg } from '@assets/icons/zoom_out.svg';
import { ReactComponent as WriteBtnSvg } from '@assets/icons/add_circle.svg';
import Modal from '@common/Modal/Modal';
import useModal from '@common/Modal/useModal';
import WriteModal from '@components/Write/WriteModal';
import { flexBox } from '@lib/styles/mixin';

const FloatingDiv = styled.div<{ pos: number }>`
  ${flexBox(null, 'center', 'column')};
  position: fixed;
  left: ${(props) => props.pos}px;
  bottom: 0;
  width: 60px;
  font-size: 12px;
  color: #545454;
  z-index: 2;
  svg {
    width: 50px;
    height: 50px;
  }
`;

const FeedFAB = ({ toggleMode, getPosFunc }: { toggleMode: () => void; getPosFunc: () => number }) => {
  const { isShowing, toggle } = useModal();
  const [floatingPos, setFloatingPos] = useState(getPosFunc());
  const changeResponsivePosition = () => {
    setFloatingPos(getPosFunc());
  };

  useEffect(() => {
    setFloatingPos(getPosFunc());
    window.addEventListener('resize', changeResponsivePosition);
    return () => {
      window.removeEventListener('resize', changeResponsivePosition);
    };
  }, [getPosFunc]);

  return (
    <FloatingDiv pos={floatingPos}>
      <div>탐험하기</div>
      <ZoomBtnSvg onClick={toggleMode} />
      <div>글쓰기</div>
      <WriteBtnSvg onClick={toggle} />
      <Modal isShowing={isShowing} hide={toggle}>
        <WriteModal hide={toggle} />
      </Modal>
    </FloatingDiv>
  );
};

export default FeedFAB;

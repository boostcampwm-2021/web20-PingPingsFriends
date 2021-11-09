import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as ZoomBtnSvg } from '../../assets/icons/zoom_out.svg';
import { ReactComponent as WriteBtnSvg } from '../../assets/icons/add_circle.svg';
import Modal from '../Modal/Modal';
import useModal from '../Modal/useModal';
import { flexBox } from '../../lib/styles/mixin';

const FloatingDiv = styled.div<{ pos: number }>`
  ${flexBox(null, 'center', 'column')};
  position: fixed;
  left: ${(props) => props.pos}px;
  bottom: 0;
  width: 60px;
  font-size: 12px;
  color: #545454;
  svg {
    width: 50px;
    height: 50px;
  }
`;

const FeedFAB = () => {
  const { isShowing, toggle } = useModal();
  const FEED_SECTION_WIDTH: number = 500;
  const FAB_OFFSET: number = 10;
  const getFloatingPos = () => (window.innerWidth + FEED_SECTION_WIDTH) / 2 + FAB_OFFSET;
  const [floatingPos, setFloatingPos] = useState(getFloatingPos());
  const changeResponsivePosition = () => {
    setFloatingPos(getFloatingPos());
  };

  useEffect(() => {
    window.addEventListener('resize', changeResponsivePosition);
    return () => {
      window.removeEventListener('resize', changeResponsivePosition);
    };
  }, []);

  return (
    <FloatingDiv pos={floatingPos}>
      <div>탐험하기</div>
      <ZoomBtnSvg />
      <div>글쓰기</div>
      <WriteBtnSvg onClick={toggle} />
      <Modal isShowing={isShowing} hide={toggle}>
        <div>adfafd</div>
      </Modal>
    </FloatingDiv>
  );
};

export default FeedFAB;

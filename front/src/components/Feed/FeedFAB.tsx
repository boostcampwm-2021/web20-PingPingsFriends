import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ReactComponent as ZoomBtnSvg } from '../../assets/icons/zoom_out.svg';
import { ReactComponent as WriteBtnSvg } from '../../assets/icons/add_circle.svg';
import { flexBox } from '../../lib/styles/mixin';

const FloatingDiv = styled.div`
  ${flexBox(null, 'center', 'column')};
  position: fixed;
  left: 0;
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
  const floatingEl = useRef<HTMLDivElement>(null);
  const FEED_SECTION_WIDTH: number = 500;
  const FAB_OFFSET: number = 10;
  useEffect(() => {
    const fabPos: number = (window.innerWidth + FEED_SECTION_WIDTH) / 2;
    if (floatingEl.current !== null) floatingEl.current.style.left = fabPos + FAB_OFFSET + 'px';
  }, []);

  return (
    <FloatingDiv ref={floatingEl}>
      <div>탐험하기</div>
      <ZoomBtnSvg />
      <div>글쓰기</div>
      <WriteBtnSvg />
    </FloatingDiv>
  );
};

export default FeedFAB;

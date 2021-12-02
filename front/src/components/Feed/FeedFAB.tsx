import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as ZoomBtnSvg } from '@assets/icons/zoom_out.svg';
import { ReactComponent as WriteBtnSvg } from '@assets/icons/add_circle.svg';
import { ReactComponent as HomeSvg } from '@assets/icons/home.svg';
import Modal from '@common/Modal/Modal';
import useModal from '@common/Modal/useModal';
import WriteModal from '@components/Write/WriteModal';
import { flexBox } from '@lib/styles/mixin';
import { Palette } from '@src/lib/styles/Palette';

const FloatingDiv = styled.div<{ pos: number }>`
  ${flexBox(null, 'center', 'column')};
  position: fixed;
  left: ${(props) => props.pos}px;
  bottom: 5px;
  width: 60px;
  font-size: 12px;
  color: #545454;
  z-index: 2;
  background-color: rgba(238, 238, 238, 0.5);
  border-radius: 20px;
  svg {
    width: 50px;
    height: 50px;
  }
`;

interface FeedFABType {
  toggleMode: () => void;
  getPosFunc: () => number;
  mode: 'feed' | 'explore';
}

const FeedFAB = ({ toggleMode, getPosFunc, mode }: FeedFABType) => {
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
      {
        {
          feed: (
            <>
              <div>탐험하기</div>
              <ZoomBtnSvg onClick={toggleMode} />
            </>
          ),
          explore: (
            <>
              <div>메인으로</div>
              <HomeSvg onClick={toggleMode} />
            </>
          ),
        }[mode]
      }
      <div>글쓰기</div>
      <WriteBtnSvg onClick={toggle} />
      <Modal isShowing={isShowing} hide={toggle}>
        <WriteModal hide={toggle} />
      </Modal>
    </FloatingDiv>
  );
};

export default FeedFAB;

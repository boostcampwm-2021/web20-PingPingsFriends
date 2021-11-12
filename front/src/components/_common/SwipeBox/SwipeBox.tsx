import React, { useRef } from 'react';
import styled, { css } from 'styled-components';
import { flexBox } from '@lib/styles/mixin';

const PreviewDiv = styled.div<Omit<SwipeBoxProps, 'children'>>`
  ${flexBox('flex-start')};
  ${(props) => css`
    padding-left: ${props.gap};
    gap: ${props.gap};
    width: ${props.width};
    height: ${props.height};
  `}
  overflow-x: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

export interface SwipeBoxProps {
  children: React.ReactNode;
  width: string;
  height: string;
  gap: string;
}

const SwipeBox = ({ children, width, height, gap }: SwipeBoxProps) => {
  const scrollLeft = useRef(0);
  const startX = useRef(0);
  const isMouseDown = useRef(false);
  const scrollableDiv = useRef<HTMLDivElement>(null);
  const mouseActionStart = (e: React.MouseEvent) => {
    isMouseDown.current = true;
    startX.current = e.pageX - (scrollableDiv.current?.offsetLeft as number);
    scrollLeft.current = scrollableDiv.current?.scrollLeft as number;
  };
  const mouseDrag = (e: React.MouseEvent) => {
    if (!isMouseDown.current) return;
    e.preventDefault();
    if (scrollableDiv.current) {
      scrollableDiv.current.scrollLeft = scrollLeft.current - (e.pageX - scrollableDiv.current.offsetLeft - startX.current);
    }
  };
  const mouseActionEnd = (e: React.MouseEvent) => {
    isMouseDown.current = false;
  };
  return (
    <PreviewDiv height={height} width={width} gap={gap} ref={scrollableDiv} onMouseDown={mouseActionStart} onMouseMove={mouseDrag} onMouseUp={mouseActionEnd} onMouseLeave={mouseActionEnd}>
      {children}
    </PreviewDiv>
  );
};

export default SwipeBox;

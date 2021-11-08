import React, { useImperativeHandle, useRef } from 'react';
import styled from 'styled-components';
import { Palette } from '../../../lib/styles/Palette';

export interface DropBoxProps {
  start: 'left' | 'right';
  offset: number;
  top: number;
  width: number;
  items: string[];
}

const DROPBOX_ITEM_HEIGHT = '40px';
const DROPBOX_BORDER_RADIUS = '7px';

const DropBoxDiv = styled.div<any>`
  display: none;
  width: ${(props) => props.width}px;
  height: max-content;
  background-color: ${Palette.WHITE};
  position: absolute;
  ${(props) => `${props.start}:${props.offset}px`};
  top: ${(props) => props.top}px;
  z-index: 10;
  border-radius: ${DROPBOX_BORDER_RADIUS};
  box-shadow: 0px 4px 10px rgba(51, 51, 51, 1), 0px 0px 4px rgba(51, 51, 51, 0.5);
  p {
    font-size: 12px;
    height: ${DROPBOX_ITEM_HEIGHT};
    line-height: ${DROPBOX_ITEM_HEIGHT};
    padding: 0 20px;

    &:after {
      display: block;
      content: '';
      border-bottom: 1px solid #afafaf;
      position: relative;
      top: -1px;
    }
    &:last-child:after {
      border: none;
    }
    &:hover {
      background-color: ${Palette.BACKGROUND_GRAY};
      &:first-child {
        border-top-left-radius: ${DROPBOX_BORDER_RADIUS};
        border-top-right-radius: ${DROPBOX_BORDER_RADIUS};
      }
      &:last-child {
        border-bottom-left-radius: ${DROPBOX_BORDER_RADIUS};
        border-bottom-right-radius: ${DROPBOX_BORDER_RADIUS};
      }
    }
  }
`;

export interface dropboxRefHandler {
  toggle: () => void;
}

const DropBox = React.forwardRef(({ start, offset, top, width, items }: DropBoxProps, ref: any) => {
  const dropboxEl = useRef<HTMLDivElement>();
  useImperativeHandle(ref, () => ({
    toggle: () => {
      if (dropboxEl.current) {
        if (dropboxEl.current.style.display === 'block') dropboxEl.current.style.display = 'none';
        else dropboxEl.current.style.display = 'block';
      }
    },
  }));
  return (
    <DropBoxDiv ref={dropboxEl} start={start} offset={offset} top={top} width={width}>
      {items.map((str, idx) => (
        <p key={idx}>{str}</p>
      ))}
    </DropBoxDiv>
  );
});

export default DropBox;

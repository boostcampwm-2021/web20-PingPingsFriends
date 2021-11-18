import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { Palette } from '@lib/styles/Palette';
import { boxShadow } from '@src/lib/styles/mixin';

export interface DropBoxProps {
  start: 'left' | 'right';
  offset: number;
  top: number;
  width: number;
  items: JSX.Element[];
  children: ReactElement;
}

const DROPBOX_ITEM_HEIGHT = '40px';
const DROPBOX_BORDER_RADIUS = '7px';

const DropBoxDiv = styled.div<any>`
  ${boxShadow(DROPBOX_BORDER_RADIUS)};
  width: ${(props) => props.width}px;
  height: max-content;
  background-color: ${Palette.WHITE};
  position: absolute;
  ${(props) => `${props.start}:${props.offset}px`};
  top: ${(props) => props.top}px;
  z-index: 5;
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

const DropBox = ({ start, offset, top, width, items, children }: DropBoxProps) => {
  const [isDropped, setDrop] = useState(false);
  return (
    <>
      {React.cloneElement(children, { onClick: () => setDrop(!isDropped) })}
      {isDropped ? (
        <DropBoxDiv start={start} offset={offset} top={top} width={width}>
          {items}
        </DropBoxDiv>
      ) : null}
    </>
  );
};

export default DropBox;

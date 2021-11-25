import React from 'react';
import styled from 'styled-components';
import { Palette } from '@lib/styles/Palette';
import { prettyScroll } from '@lib/styles/mixin';

const ColorPickerBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  row-gap: 10px;
`;

const Color = styled.div<{ backColor: string; isCurrent: boolean }>`
  width: 50px;
  height: 50px;
  background: ${(props) => props.backColor};
  border-radius: 8px;
  ${(props) => (props.isCurrent ? `outline: ${Palette.ACTIVE} 2px solid;` : '')};
`;

const ScrollBox = styled.div`
  ${prettyScroll()};
  width: 400px;
  height: 100px;
  overflow-y: scroll;
  padding: 5px;
`;

interface ColorPickerProps {
  handleColorClick: React.MouseEventHandler;
  currentColor: string;
}

const ColorPicker = ({ handleColorClick, currentColor }: ColorPickerProps) => {
  return (
    <ScrollBox>
      <ColorPickerBlock onClick={handleColorClick}>
        {Object.values(Palette)
          .filter((color) => color !== Palette.WHITE && color !== Palette.BACKGROUND_GRAY && color !== Palette.ACTIVE && color !== Palette.RED)
          .map((color) => (
            <Color key={color} backColor={color} data-color={color} isCurrent={currentColor === color} />
          ))}
      </ColorPickerBlock>
    </ScrollBox>
  );
};

export default ColorPicker;

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Palette } from '@lib/styles/Palette';
import { ReactComponent as CancelBtnSvg } from '@assets/icons/cancel_btn.svg';

const CELL_BORDER_RADIUS = '10px';
const CELL_WIDTH = '180px';
const CELL_HEIGHT = '180px';

const Preview = ({ file, idx, removeContents }: { file: File | string; idx: number; removeContents: (targetIdx: number) => void }) => {
  const [isLoading, setLoading] = useState(false);
  const contentsURL = useRef('');

  useEffect(() => {
    if (typeof file === 'string') {
      setLoading(true);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      contentsURL.current = e.target?.result as string;
      setLoading(true);
    };
    reader.readAsDataURL(file);
  }, [file]);

  return (
    <CellDiv>
      {isLoading ? (
        <>
          <CancelBtnSvg
            className={'button remove_btn'}
            onClick={() => {
              removeContents(idx);
            }}
          />
          {typeof file === 'string' ? (
            <img src={file} alt={'upload img'} />
          ) : file.type.includes('image') ? (
            <img src={contentsURL.current} alt={file.name} />
          ) : (
            <video src={contentsURL.current} controls></video>
          )}
        </>
      ) : (
        'loading'
      )}
    </CellDiv>
  );
};
export default Preview;

const CellDiv = styled.div`
  width: ${CELL_WIDTH};
  height: ${CELL_HEIGHT};
  flex-shrink: 0;
  position: relative;
  border-radius: ${CELL_BORDER_RADIUS};
  border: 2px solid ${Palette.BACKGROUND_GRAY};

  img,
  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: ${CELL_BORDER_RADIUS};
  }

  svg {
    position: absolute;
    top: -10px;
    left: -10px;
    z-index: 1;
  }
`;

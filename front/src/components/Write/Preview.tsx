import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Palette } from '../../lib/styles/Palette';
import { ReactComponent as CancelBtnSvg } from '../../assets/icons/cancel_btn.svg';

const CELL_BORDER_RADIUS = '10px';
const CELL_WIDTH = '180px';
const CELL_HEIGHT = '180px';

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

const Preview = ({ file, idx, removeHandler }: { file: File; idx: number; removeHandler: (targetIdx: number) => void }) => {
  const [isLoading, setLoading] = useState(false);
  const contentsURL = useRef('');
  const removeFile = (e: React.MouseEvent) => {
    const target = e.target as Element;
    if (target.closest('.remove_btn')) {
      const selectedFile = (target.closest('.preview_cell') as HTMLElement).dataset.id;
      removeHandler(Number(selectedFile));
    }
  };
  useEffect(() => {
    const reader = new FileReader();
    reader.onload = (e) => {
      contentsURL.current = e.target?.result as string;
      setLoading(true);
    };
    reader.readAsDataURL(file);
  }, [file]);

  return (
    <>
      <CellDiv className={'preview_cell'} data-id={idx} onClick={removeFile}>
        {isLoading ? (
          <>
            <CancelBtnSvg className={'button remove_btn'} />
            {file.type.includes('image') ? <img src={contentsURL.current} alt={file.name} /> : <video src={contentsURL.current} controls></video>}
          </>
        ) : (
          'loading'
        )}
      </CellDiv>
    </>
  );
};
export default Preview;

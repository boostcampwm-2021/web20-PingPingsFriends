import React from 'react';
import styled from 'styled-components';

const LoadingBarBlock = styled.ul``;

const LoadingBar = () => {
  return (
    <LoadingBarBlock>
      <li className="item" />
      <li className="item" />
      <li className="item" />
    </LoadingBarBlock>
  );
};

export default LoadingBar;

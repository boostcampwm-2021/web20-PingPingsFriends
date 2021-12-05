import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Gmarket';
  }
  .button {
    cursor: pointer;
  }
  .ul,li{
    list-style: none;
    padding: 0;
    margin: 0;
  }

  button{
    background: inherit;
    border:none;
    box-shadow:none;
    border-radius:0;
    padding:0;
    overflow:visible;
    cursor:pointer
  }
`;

export default GlobalStyle;

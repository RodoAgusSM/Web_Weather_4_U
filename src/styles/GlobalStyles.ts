import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background: linear-gradient(135deg, #85C1E9 0%, #5DADE2 100%);
    min-height: 100vh;
    color: #2C3E50;
  }
  
  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyles;

import { createGlobalStyle } from 'styled-components';

import { ThemeType } from './theme';

const GlobalStyles = createGlobalStyle<{ theme: ThemeType }>`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background: ${({ theme }) => theme.body};
    min-height: 100vh;
    color: ${({ theme }) => theme.text};
    transition: all 0.3s ease;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyles;

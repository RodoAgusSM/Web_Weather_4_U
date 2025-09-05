import { createGlobalStyle } from 'styled-components';

interface GlobalStylesProps {
  isMobileDevice?: boolean;
  isSmallDevice?: boolean;
  $isSmallMobileDevice?: boolean; // For backward compatibility
}

const GlobalStyles = createGlobalStyle<GlobalStylesProps>`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Roboto+Mono:wght@400;500&display=swap');

  :root {
    /* Dynamic viewport heights for iOS */
    --vh: 1vh;

    /* Safe area insets for notched devices */
    --sat: env(safe-area-inset-top, 0px);
    --sar: env(safe-area-inset-right, 0px);
    --sab: env(safe-area-inset-bottom, 0px);
    --sal: env(safe-area-inset-left, 0px);
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: transparent;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: ${props => (props.isSmallDevice || props.$isSmallMobileDevice ? '14px' : '16px')};
    -webkit-text-size-adjust: 100%;
  }

  body {
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background: linear-gradient(135deg, #2980B9 0%, #6DD5FA 100%);
    background-attachment: fixed;
    line-height: 1.5;
    color: #2C3E50;
    overflow-x: hidden;
    position: relative;
    font-weight: 400;

    /* Apply safe area insets */
    padding-top: var(--sat);
    padding-right: var(--sar);
    padding-bottom: var(--sab);
    padding-left: var(--sal);

    /* Fix iOS height issues */
    min-height: 100vh;
    min-height: calc(var(--vh, 1vh) * 100);
  }

  #root {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    min-height: 100vh;
    min-height: calc(var(--vh, 1vh) * 100);
  }

  button, input, select, textarea {
    font-family: 'Poppins', sans-serif;
    font-size: ${props => (props.isMobileDevice ? '16px' : 'inherit')}; /* Prevent zoom on iOS */
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    color: #2C3E50;
  }

  /* Improved touch interactions */
  .touch-device {
    cursor: default !important;

    button,
    a,
    [role="button"],
    input[type="button"],
    input[type="submit"] {
      min-height: 44px;
      min-width: 44px;
      touch-action: manipulation;
    }
  }

  /* Handle landscape orientation specially for mobile */
  .mobile-device.landscape {
    #root {
      align-items: flex-start;
      padding: 0.5rem;
    }
  }

  /* Prevent pull-to-refresh on mobile Chrome */
  body {
    overscroll-behavior-y: contain;
  }

  /* Better scrolling on iOS */
  * {
    -webkit-overflow-scrolling: touch;
  }

  /* Animations should respect reduced motion settings */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* Better responsive text handling */
  @media (max-width: 360px) {
    .text-xs {
      font-size: 0.75rem !important;
    }
  }

  @media (max-width: 320px) {
    .text-xs {
      font-size: 0.7rem !important;
    }
  }

  /* Force abbreviate text utility */
  .abbreviate-text {
    text-transform: uppercase;
    font-size: 0.75rem;
  }

  /* iOS-specific text size fix */
  @supports (-webkit-touch-callout: none) {
    input, button, select, textarea {
      font-size: 16px; /* Prevents zoom on input fields */
    }

    @media (max-width: 360px) {
      .text-xs {
        font-size: 0.75rem !important;
      }
    }
  }
`;

export default GlobalStyles;

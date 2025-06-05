import { createGlobalStyle } from 'styled-components';

const MobileStyles = createGlobalStyle`
  /* Improved mobile touch targets */
  @media (max-width: 768px) {
    button, 
    [role="button"],
    a.button,
    .clickable {
      min-height: 44px;
      min-width: 44px;
      padding: 0.5rem 1rem;
    }

    /* Fix iOS viewport height issues */
    html, body, #root {
      height: -webkit-fill-available;
    }

    /* Optimize for notched devices */
    body {
      padding-top: env(safe-area-inset-top);
      padding-bottom: env(safe-area-inset-bottom);
      padding-left: env(safe-area-inset-left);
      padding-right: env(safe-area-inset-right);
    }

    /* Improve tap performance */
    * {
      -webkit-tap-highlight-color: transparent;
    }

    /* Disable pull-to-refresh if desired */
    body {
      overscroll-behavior-y: contain;
    }

    /* Prevent zoom on input focus */
    input, select, textarea {
      font-size: 16px;
    }
  }

  /* Specific optimizations for small screens */
  @media (max-width: 375px) {
    html {
      font-size: 14px;
    }
  }
`;

export default MobileStyles;

import { ToastContainer } from 'react-toastify';
import styled, { css, keyframes } from 'styled-components';

// Modern color palette (matches the one in WeatherStyles.ts)
const palette = {
  primary: '#3498DB',       // Blue
  secondary: '#2ECC71',     // Green
  accent: '#F39C12',        // Orange
  dark: '#2C3E50',          // Dark blue
  light: '#ECF0F1',         // Light gray
  white: '#FFFFFF',         // White
};

// Design tokens
const theme = {
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
  },
  radius: {
    sm: '0.25rem',
    md: '0.5rem',
    pill: '9999px',
  },
  shadow: {
    sm: '0 2px 4px rgba(0,0,0,0.08)',
    md: '0 4px 8px rgba(0,0,0,0.12)',
  },
};

const expand = keyframes`
  from {
    width: 20%;
    opacity: 0.9;
  }
  to {
    width: 100%;
    opacity: 1;
  }
`;

const generateCompressAnimation = (widthValue: string) => keyframes`
  from {
    width: 100%;
    opacity: 1;
  }
  to {
    width: ${widthValue};
    opacity: 0.9;
  }
`;

export const SearchBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: ${theme.spacing.sm} 0;
  position: relative;
  z-index: 5;
  max-width: 400px; // Set consistent max-width
  margin-left: auto;
  margin-right: auto;
`;

export const SearchBarContainer = styled.div<{
  $isDesktopOrLaptop: boolean;
  $isMobileDevice: boolean;
  $isSmallMobileDevice: boolean,
  $openSearchBar: boolean | null
}>`
  /* Use a single width property with proper conditional logic */
  width: ${({ $isDesktopOrLaptop, $isMobileDevice, $isSmallMobileDevice, $openSearchBar }) => {
    if ($openSearchBar === true) return '100%';
    if ($isDesktopOrLaptop) return '10%';
    if ($isMobileDevice || $isSmallMobileDevice) return '15%';
    return '20%'; // Default fallback
  }};
  
  cursor: pointer;
  height: 40%;
  transform-origin: 50% 50%;
  transition: box-shadow 0.3s ease;
  max-width: 100%;
  
  /* Handle animations with cleaner conditional logic */
  ${({ $openSearchBar, $isDesktopOrLaptop, $isMobileDevice, $isSmallMobileDevice }) => {
    if ($openSearchBar === true) {
      return css`animation: ${expand} 0.3s ease-out forwards;`;
    }

    if ($openSearchBar === false) {
      if ($isDesktopOrLaptop) {
        return css`animation: ${generateCompressAnimation('10%')} 0.3s ease-in forwards;`;
      }
      if ($isMobileDevice || $isSmallMobileDevice) {
        return css`animation: ${generateCompressAnimation('15%')} 0.3s ease-in forwards;`;
      }
    }

    return ''; // No animation for initial render
  }}
  
  &:hover {
    box-shadow: ${theme.shadow.md};
  }
  
  /* Ensure better accessibility on mobile */
  @media (max-width: 767px) {
    height: 44px; /* Minimum touch target height for mobile */
    
    /* Ensure search bar is always visible enough to tap when closed */
    width: ${({ $openSearchBar }) => $openSearchBar === true ? '100%' : '20%'};
    min-width: 44px;
  }
  
  /* Fix for very small screens */
  @media (max-width: 320px) {
    font-size: 14px;
  }
`;

export const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    border-radius: ${theme.radius.md};
    padding: ${theme.spacing.sm};
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(8px);
    box-shadow: ${theme.shadow.md};
    font-family: 'Poppins', sans-serif;
    font-size: 0.9rem;
    color: ${palette.dark};
  }
  
  .Toastify__toast-body {
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
  }
  
  .Toastify__close-button {
    color: ${palette.dark};
    opacity: 0.7;
  }
  
  .Toastify__progress-bar {
    background: ${palette.accent};
  }
`;
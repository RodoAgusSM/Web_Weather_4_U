import styled from 'styled-components';

// Modern color palette (matches the one in WeatherStyles.ts)
const palette = {
  primary: '#3498DB', // Blue
  secondary: '#2ECC71', // Green
  accent: '#F39C12', // Orange
  dark: '#2C3E50', // Dark blue
  light: '#ECF0F1', // Light gray
  white: '#FFFFFF', // White
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
    sm: '0.3rem',
    md: '0.6rem',
    lg: '0.9rem',
    pill: '9999px',
  },
  shadow: {
    sm: '0 1px 3px rgba(0,0,0,0.08)',
  },
};

export const LanguagesContainer = styled.div<{
  $isMobileDevice: boolean;
  $isSmallMobileDevice: boolean;
  $isTouchDevice?: boolean;
  $useAbbreviatedLabels?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: ${({ $isSmallMobileDevice, $useAbbreviatedLabels }) =>
    $isSmallMobileDevice || $useAbbreviatedLabels ? '0.25rem' : '1rem'};
  padding: ${({ $isSmallMobileDevice, $useAbbreviatedLabels }) =>
    $isSmallMobileDevice || $useAbbreviatedLabels
      ? `${theme.spacing.xs} ${theme.spacing.sm}`
      : `${theme.spacing.xs} ${theme.spacing.md}`};
  font-size: ${({ $isMobileDevice, $isSmallMobileDevice, $useAbbreviatedLabels }) =>
    $isMobileDevice || $isSmallMobileDevice || $useAbbreviatedLabels ? '0.75rem' : '0.9rem'};
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  border-radius: ${theme.radius.lg};
  box-shadow: ${theme.shadow.sm};
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: fit-content;
  margin: 0 auto; /* This should center it */
  position: relative;

  /* Enhanced touch targets for touch devices */
  ${({ $isTouchDevice, $isSmallMobileDevice }) =>
    $isTouchDevice &&
    !$isSmallMobileDevice &&
    `
		padding: ${theme.spacing.sm} ${theme.spacing.md};
	`}

  /* Fix for small screens */
	@media (max-width: 360px) {
    padding: ${theme.spacing.xs} ${theme.spacing.xs};
    gap: 0.2rem;
    margin-left: auto;
    margin-right: auto;
    transform: translateX(-10px); /* Shift slightly to compensate for the icon */
  }
`;

export const LanguageButton = styled.button<{
  $isActive?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  cursor: pointer;
  background: none;
  border: none;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  color: ${palette.dark};
  font-weight: ${(props) => (props.$isActive ? '600' : '500')};
  position: relative;
  transition: all 0.2s ease;
  font-family: 'Poppins', sans-serif;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: ${(props) => (props.$isActive ? '100%' : '0')};
    height: 2px;
    background-color: ${palette.accent};
    transition: width 0.2s ease;
  }

  &:hover {
    color: ${palette.accent};

    &::after {
      width: 100%;
    }
  }

  &:focus {
    outline: none;
  }

  /* Larger touch targets on mobile/touch devices */
  @media (max-width: 768px) {
    padding: ${theme.spacing.sm} ${theme.spacing.sm};
    min-height: 44px; /* Minimum touch target size per accessibility guidelines */
  }

  /* Adjust padding on very small screens */
  @media (max-width: 360px) {
    padding: ${theme.spacing.xs} ${theme.spacing.xs};
    min-height: 32px;
    font-size: 0.75rem;
  }

  /* Force smaller text on very small screens */
  @media (max-width: 320px) {
    font-size: 0.7rem !important;
    padding: ${theme.spacing.xs} ${theme.spacing.xs};
    min-height: 28px;
  }
`;

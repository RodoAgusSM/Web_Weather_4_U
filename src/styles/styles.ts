import styled, { keyframes } from 'styled-components';

import { ThemeType } from './theme';

const palette = {
  primary: '#85C1E9',
  secondary: '#5DADE2',
  accent: '#F39C12',
  dark: '#2C3E50',
  light: '#ECF0F1',
  white: '#FFFFFF',
  lightBlue: '#AED6F1',
  lighterBlue: '#D6EAF8',
  darkBlue: '#2874A6',
  black: '#000000',
  danger: '#E74C3C',
  info: '#3498DB',
  warning: '#F39C12',
  success: '#2ECC71',
  mainBackground: '#85C1E9',
};

const theme = {
  colors: {
    primary: palette.primary,
    secondary: palette.secondary,
    accent: palette.accent,
    background: {
      light: 'rgba(255, 255, 255, 0.6)',
      dark: 'rgba(174, 214, 241, 0.3)',
      card: 'rgba(214, 234, 248, 0.8)',
    },
    text: {
      primary: palette.darkBlue,
      secondary: '#34495E',
      muted: '#7F8C8D',
      light: palette.light,
      white: palette.white,
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
  },
  radius: {
    sm: '0.3rem',
    md: '0.6rem',
    lg: '0.9rem',
    pill: '9999px',
  },
  shadow: {
    sm: '0 1px 3px rgba(0,0,0,0.08)',
    md: '0 3px 6px rgba(0,0,0,0.1)',
    lg: '0 8px 20px rgba(0,0,0,0.12)',
  },
  gradient: {
    primary: 'linear-gradient(135deg, #3498DB 0%, #85C1E9 100%)',
    accent: 'linear-gradient(135deg, #F39C12 0%, #F7DC6F 100%)',
    glass: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
  },
};

const CONTAINER_MAX_WIDTH = '500px';
const CONTAINER_MAX_WIDTH_MOBILE = '95%';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const refinedGlassEffect = `
  background-image: 
    radial-gradient(circle at top left, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.05) 100%);
  background-blend-mode: overlay;
`;

export const BoxContainer = styled.div<{
  $isSmallMobileDevice: boolean;
  $isMobileDevice: boolean;
  $isDesktopOrLaptop: boolean;
  $isPortrait: boolean;
  $isLandscape: boolean;
  theme: ThemeType;
}>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: ${({ theme }) => theme.card};
  backdrop-filter: blur(8px);
  border-radius: 8px;
  box-shadow: ${theme.shadow.sm};
  border: 1px solid rgba(255, 255, 255, 0.3);
  margin: ${theme.spacing.md} auto;
  padding: ${({ $isSmallMobileDevice }) =>
    $isSmallMobileDevice ? theme.spacing.sm : theme.spacing.lg};
  width: ${({ $isMobileDevice }) => ($isMobileDevice ? CONTAINER_MAX_WIDTH_MOBILE : '100%')};
  animation: ${fadeIn} 0.5s ease-out forwards;
  max-width: ${({ $isPortrait, $isLandscape, $isMobileDevice }) =>
    $isPortrait ? '95vw' : $isMobileDevice && $isLandscape ? '100%' : CONTAINER_MAX_WIDTH};
  ${refinedGlassEffect}
`;

export const BoxWrapper = styled.div<{
  $isDesktopOrLaptop: boolean;
  $isMobileDevice: boolean;
  $isSmallMobileDevice: boolean;
}>`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  gap: 0.7rem;
`;

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const Code = styled.code<{ $isMobileDevice: boolean; $isSmallMobileDevice: boolean }>`
  font-family: 'Roboto Mono', monospace;
  font-size: ${({ $isMobileDevice, $isSmallMobileDevice }) =>
    $isMobileDevice || $isSmallMobileDevice ? '0.75rem' : '0.85rem'};
  color: #34495e;
  display: flex;
  align-items: center;
  padding: 0.25rem 0;
  cursor: default;
  font-weight: 500;
  line-height: 1.5;
`;

export const BackContainer = styled.span<{ $isMobile: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => (props.$isMobile ? '0.8rem' : '0.9rem')};
  font-weight: 600;
  cursor: pointer;
  color: #2c3e50;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
  animation: ${fadeIn} 0.5s ease-out forwards;
  animation-delay: 0.2s;
  ${refinedGlassEffect}

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateX(-2px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.12);
    color: #1976d2;
  }
`;

export const BackIconSpotImg = styled.div<{
  $mouseOver: boolean;
  $regular?: string;
  $hover?: string;
}>`
  width: 18px;
  height: 18px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  mask-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHBhdGggZD0iTTE5IDEySDE5LjVNNSAxMkwxOSAxMk01IDEyTDEyIDVNNSAxMkwxMiAxOSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPg==');
  mask-size: contain;
  mask-repeat: no-repeat;
  background: #2c3e50;
  margin-right: 0.5rem;
  transition: transform 0.2s ease, background-color 0.2s ease;
  ${BackContainer}:hover & {
    transform: translateX(-2px);
    background: #1976d2;
  }
`;

export const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Line = styled.div`
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
  width: 100%;
  margin: 0.25rem 0;
`;

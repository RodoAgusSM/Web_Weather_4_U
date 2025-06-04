import styled, { keyframes } from 'styled-components';

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
    xl: '1.5rem',
    xxl: '2rem',
  },
  radius: {
    sm: '0.3rem',
    md: '0.6rem',
    lg: '0.9rem',
    pill: '999px',
  },
  shadow: {
    sm: '0 1px 3px rgba(0,0,0,0.08)',
    md: '0 3px 6px rgba(0,0,0,0.1)',
  },
};

// Animation for fading in elements
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

export const MiInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing.xl} ${theme.spacing.md};
  cursor: default;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  border-radius: ${theme.radius.lg};
  box-shadow: ${theme.shadow.sm};
  margin: ${theme.spacing.xl} auto ${theme.spacing.lg};
  border: 1px solid rgba(255, 255, 255, 0.3);
  max-width: 400px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  ${refinedGlassEffect}
  animation: ${fadeIn} 0.5s ease-out forwards;
  animation-delay: calc(var(--index, 0) * 0.1s + 0.3s);
  opacity: 0;

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${theme.shadow.md};
  }
`;

export const MiInfo = styled.span`
  display: flex;
  text-align: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${palette.dark};
  padding-bottom: ${theme.spacing.md};
  line-height: 1.4;

  &:last-child {
    font-size: 1.1rem;
    font-weight: 500;
    color: ${palette.dark};
    opacity: 0.9;
  }
`;

export const NetworkContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  border-radius: ${theme.radius.lg};
  box-shadow: ${theme.shadow.sm};
  padding: ${theme.spacing.xl} ${theme.spacing.lg};
  margin: 0 auto;
  max-width: 400px;
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.3);
  gap: ${theme.spacing.md};
  ${refinedGlassEffect}
  animation: ${fadeIn} 0.5s ease-out forwards;
  animation-delay: calc(var(--index, 1) * 0.1s + 0.4s);
  opacity: 0;
`;

export const NetworkTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${palette.dark};
  margin-bottom: ${theme.spacing.md};
  text-align: center;
  position: relative;
  padding-bottom: ${theme.spacing.sm};

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 2px;
    background: ${palette.accent};
    border-radius: ${theme.radius.pill};
  }
`;

export const NetworkMapContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  width: 100%;
  transition: all 0.2s ease;
  border-radius: ${theme.radius.md};
  border: 1px solid transparent;
  animation: ${fadeIn} 0.5s ease-out forwards;
  animation-delay: calc(var(--index, 0) * 0.1s + 0.6s);
  opacity: 0;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.4);
    box-shadow: ${theme.shadow.sm};
  }

  &:not(:last-child) {
    border-bottom: 1px solid rgba(44, 62, 80, 0.1);
  }
`;

export const SocialNetworkIcon = styled.div<{ icon: string }>`
  width: 36px;
  height: 36px;
  border-radius: ${theme.radius.sm};
  background-color: rgba(255, 255, 255, 0.9);
  background-image: ${(props) => `url(${props.icon})`};
  background-size: 65%;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: ${theme.shadow.sm};
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: all 0.2s ease;
  transform: translateY(0);
  transition: all 0.3s ease;

  ${NetworkMapContainer}:hover & {
    transform: scale(1.1) rotate(5deg);
    box-shadow: ${theme.shadow.md};
  }
`;

export const SocialNetworkName = styled.span`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${palette.dark};
  min-width: 40px;
  text-align: center;
  background: rgba(255, 255, 255, 0.3);
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.radius.pill};
  transition: all 0.2s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${NetworkMapContainer}:hover & {
    background: rgba(255, 255, 255, 0.5);
  }
`;

export const SocialNetworkItem = styled.a`
  font-size: 0.95rem;
  font-weight: 500;
  position: relative;
  cursor: pointer;
  color: ${palette.primary};
  text-decoration: none;
  transition: all 0.2s ease;
  flex-grow: 1;
  flex-shrink: 1;
  text-align: right;
  margin-left: auto;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0; /* Critical for text-overflow to work in flex items */

  &:hover {
    color: ${palette.accent};

    &::after {
      width: 100%;
    }
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${palette.accent};
    transition: width 0.2s ease;
  }
`;

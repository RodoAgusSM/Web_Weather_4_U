import styled, { css, keyframes } from 'styled-components';

// Color palette
const palette = {
  primary: '#85C1E9',
  darkBlue: '#2874A6',
  black: '#000000',
};

// Design tokens
const theme = {
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
  },
  colors: {
    text: {
      primary: '#2874A6',
    },
  },
};

// Use a consistent container width value
const CONTAINER_MAX_WIDTH = '500px';

// Animation keyframes
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

// Refined glass effect with the right opacity values
const refinedGlassEffect = `
  background-image: 
    radial-gradient(circle at top left, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.05) 100%);
  background-blend-mode: overlay;
`;

// Hover animation shared across components
const hoverLiftEffect = `
  transition: all 0.3s ease;
  cursor: default;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${theme.shadow.md};
  }
`;

const baseContainerStyles = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.radius.lg};
  margin: 0 auto;
  max-width: ${CONTAINER_MAX_WIDTH};
  width: 100%;
  ${refinedGlassEffect}
  animation: ${fadeIn} 0.5s ease-out forwards;
  ${hoverLiftEffect}
`;

export const WeatherMainContainer = styled.div`
  ${baseContainerStyles}
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing.lg};
  border: 1px solid rgba(255, 255, 255, 0.5);
  transform: translateY(0);

  &:hover {
    background: rgba(214, 234, 248, 0.9);
  }
`;

// Custom container styling
export const CustomWeatherMainContainer = styled.div<{ $isHovered?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.radius.lg};
  margin: 0 auto;
  max-width: ${CONTAINER_MAX_WIDTH};
  width: 100%;
  padding: ${theme.spacing.md};
  box-sizing: border-box;
  background-color: ${({ $isHovered }) =>
    $isHovered ? 'rgba(174, 214, 241, 0.9)' : 'rgba(174, 214, 241, 0.7)'};
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: ${theme.radius.lg};
  backdrop-filter: blur(8px);
  box-shadow: ${({ $isHovered }) =>
    $isHovered ? '0 6px 12px rgba(0, 0, 0, 0.15)' : theme.shadow.sm};
  transition: all 0.3s ease;
  transform: ${({ $isHovered }) => ($isHovered ? 'translateY(-5px)' : 'translateY(0)')};
  width: 100%;
  margin-bottom: ${theme.spacing.md};
  animation: ${fadeIn} 0.5s ease-out forwards;

  /* Mobile optimization */
  @media (max-width: 480px) {
    padding: ${theme.spacing.sm};
  }

  /* Add pulse animation on hover like the data cards */
  &:hover {
    animation: pulse 1.5s infinite alternate;
  }

  @keyframes pulse {
    0% {
      transform: translateY(-5px) scale(1);
    }
    100% {
      transform: translateY(-5px) scale(1.02);
    }
  }

  /* Better touch interaction */
  @media (hover: none) {
    &:active {
      transform: scale(0.98);
      transition: transform 0.1s;
    }
  }
`;

// Weather content components
export const WeatherMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.3rem;
  text-align: left;
  cursor: default;
  transition: transform 0.3s ease;

  ${CustomWeatherMainContainer}:hover & {
    transform: scale(1.02);
  }

  /* Center align text on very small screens */
  @media (max-width: 360px) {
    text-align: center;
    align-items: center;
  }
`;

export const MainContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  justify-content: center;

  /* Stack vertically on very small screens */
  @media (max-width: 360px) {
    flex-direction: column;
    gap: ${theme.spacing.md};
  }
`;

// Icon components
export const WeatherIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease;

  ${CustomWeatherMainContainer}:hover & {
    transform: scale(1.15);
  }
`;

export const WeatherIcon = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: ${theme.radius.pill};
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
  backdrop-filter: blur(4px);
  box-shadow: ${theme.shadow.sm};
  padding: ${theme.spacing.xs};
  transition: all 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);

  ${CustomWeatherMainContainer}:hover & {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 480px) {
    width: 4rem;
    height: 4rem;
  }

  @media (min-width: 1024px) {
    width: 6rem;
    height: 6rem;
  }
`;

// Temperature display components
export const WeatherMainTemperature = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${theme.colors.text.primary};
  line-height: 1;
`;

export const TemperatureValue = styled.div`
  font-size: 2.2rem;
  font-weight: 700;
  color: ${palette.black};
  margin-right: 0.25rem;
  transition: all 0.3s ease;

  ${CustomWeatherMainContainer}:hover & {
    color: #2c3e50;
    transform: scale(1.05);
    transform-origin: left center;
    text-shadow: 0 1px 2px rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

export const TemperatureUnitWrapper = styled.div`
  display: flex;
  align-items: baseline;
`;

export const TemperatureUnit = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${palette.black};
  transition: color 0.3s ease;

  ${CustomWeatherMainContainer}:hover & {
    color: #2c3e50;
  }
`;

export const FeelsLikeText = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  margin-top: 0.2rem;
  color: ${palette.darkBlue};
  white-space: nowrap;
  transition: all 0.3s ease;

  ${CustomWeatherMainContainer}:hover & {
    color: #2c3e50;
    text-shadow: 0 1px 1px rgba(255, 255, 255, 0.5);
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

export const DescriptionText = styled.div`
  text-transform: capitalize;
  font-weight: 600;
  font-size: 1rem;
  color: ${theme.colors.text.primary};
  margin-top: 0.1rem;
  transition: all 0.3s ease;

  ${CustomWeatherMainContainer}:hover & {
    color: #2c3e50;
    transform: scale(1.05);
    transform-origin: left center;
  }
`;

import styled, { keyframes } from 'styled-components';

// Modern color palette
const palette = {
  primary: '#3498DB',       // Blue
  secondary: '#2ECC71',     // Green
  accent: '#F39C12',        // Orange
  dark: '#2C3E50',          // Dark blue
  light: '#ECF0F1',         // Light gray
  white: '#FFFFFF',         // White
  lightBlue: '#AED6F1',     // Light blue
  danger: '#E74C3C',        // Red
  info: '#3498DB',          // Blue
  warning: '#F39C12',       // Orange
  success: '#2ECC71',       // Green
};

// Design tokens based on modern color palette
const theme = {
  colors: {
    primary: palette.primary,
    secondary: palette.secondary,
    accent: palette.accent,
    background: {
      light: 'rgba(255, 255, 255, 0.2)',
      dark: 'rgba(44, 62, 80, 0.1)'
    },
    text: {
      primary: palette.dark,
      secondary: '#34495E',
      muted: '#7F8C8D',
      light: palette.light,
      white: palette.white
    }
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
    glass: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)'
  },
};

// Responsive styling based on screen size
const responsive = {
  device: (size: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => {
    const sizes = {
      xs: 479,  // Extra small devices
      sm: 767,  // Small devices (mobile)
      md: 1023, // Medium devices (tablets)
      lg: 1279, // Large devices (laptops)
      xl: 1440  // Extra large devices (desktops)
    };
    return `@media (min-width: ${sizes[size]}px)`;
  }
};

// Add landscape orientation support
const orientationResponsive = {
  landscape: `@media (orientation: landscape) and (max-height: 600px)`
};

// Use a consistent container width value
const CONTAINER_MAX_WIDTH = '400px';

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

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

// Restore the refined glass effect with the right opacity values
const refinedGlassEffect = `
  background-image: 
    radial-gradient(circle at top left, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.05) 100%);
  background-blend-mode: overlay;
`;

export const TitleApp = styled.div`
  text-align: center;
  margin: ${theme.spacing.sm} 0;
  cursor: default;
`;

export const Subtitle = styled.h2<{ $isDesktopOrLaptop: boolean, $isMobileDevice: boolean, $isSmallMobileDevice: boolean }>`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  text-shadow: 0 1px 2px rgba(0,0,0,0.1);
  letter-spacing: 0.5px;
  margin: 0;
  
  ${responsive.device('md')} {
    font-size: 1.4rem;
  }
`;

export const LogoApp = styled.img<{ src: string; $isDesktopOrLaptop: boolean, $isMobileDevice: boolean, $isSmallMobileDevice: boolean }>`
  src: src;
  margin: ${theme.spacing.md} auto;
  display: block;
  max-width: 100%;
  height: auto;
  width: 140px;
  
  ${responsive.device('sm')} {
    width: 180px;
  }
  
  ${responsive.device('md')} {
    width: 200px;
  }
`;

export const WeatherIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const WeatherIcon = styled.img<{ src: string }>`
  src: src;
  width: 4.5rem;
  height: 4.5rem;
  border-radius: ${theme.radius.pill};
  background: ${theme.gradient.glass};
  backdrop-filter: blur(4px);
  box-shadow: ${theme.shadow.sm};
  padding: ${theme.spacing.xs};
  transition: all 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
  animation: ${pulse} 2s ease-in-out infinite;
`;

export const SpinnerLogo = styled.img<{ src: string; $isDesktopOrLaptop: boolean, $isMobileDevice: boolean, $isSmallMobileDevice: boolean }>`
  src: src;
  width: 40%;
  max-width: 150px;
  display: block;
  margin: ${theme.spacing.xl} auto;
  
  ${responsive.device('md')} {
    width: 25%;
  }
`;

export const WeatherCard = styled.div<{ $isSmallMobileDevice: boolean, $isMobileDevice: boolean, $isDesktopOrLaptop: boolean }>`
  display: flex;
  flex-direction: column;
  border-radius: ${theme.radius.lg};
  overflow: hidden;
  /* Restore the glassy background */
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  box-shadow: ${theme.shadow.sm};
  margin: ${theme.spacing.md} auto;
  padding: ${theme.spacing.lg};
  border: 1px solid rgba(255, 255, 255, 0.3);
  width: 100%;
  max-width: ${CONTAINER_MAX_WIDTH};
  animation: ${fadeIn} 0.5s ease-out forwards;
  ${refinedGlassEffect}
  
  /* Adjust for landscape orientation on mobile */
  ${orientationResponsive.landscape} {
    display: flex;
    flex-direction: row;
    min-height: auto;
    max-height: 95vh;
    overflow-y: auto;
    padding: ${theme.spacing.md};
    
    > * {
      flex-shrink: 0;
    }
  }
`;

export const AllDataContainer = styled.div<{ $isDesktopOrLaptop: boolean, $isMobileDevice: boolean, $isSmallMobileDevice: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  
  ${responsive.device('sm')} {
    gap: ${theme.spacing.lg};
  }
  
  /* Optimize for landscape orientation */
  ${orientationResponsive.landscape} {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    gap: ${theme.spacing.sm};
    
    & > * {
      width: calc(50% - ${theme.spacing.sm});
      margin: 0;
    }
  }
`;

export const WeatherMainContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.radius.lg};
  /* Restore the glassy background for the main container */
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  box-shadow: ${theme.shadow.sm};
  margin: 0 auto;
  max-width: ${CONTAINER_MAX_WIDTH};
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.3);
  ${refinedGlassEffect}
  animation: ${fadeIn} 0.5s ease-out forwards;
`;

export const WeatherMain = styled.div`
  font-size: 0.95rem;
  text-align: start;
  cursor: default;
`;

export const WeatherMainTemperature = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs};
`;

export const WeatherMainData = styled.div<{ $isDesktopOrLaptop: boolean; $isMobileDevice: boolean, $isSmallMobileDevice: boolean }>`
  font-weight: 500;
  font-size: 0.85rem;
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.xs};
  
  ${responsive.device('md')} {
    font-size: 0.95rem;
  }
`;

export const WeatherDataContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  
  /* Make sure content doesn't overflow on very small screens */
  @media (max-width: 320px) {
    font-size: 0.9em;
  }
`;

export const WeatherData = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.85rem;
  text-align: start;
  gap: ${theme.spacing.sm};
  cursor: default;
  /* Restore the glassy background for weather data */
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  padding: ${theme.spacing.lg};
  border-radius: ${theme.radius.lg};
  box-shadow: ${theme.shadow.sm};
  width: 100%;
  max-width: ${CONTAINER_MAX_WIDTH};
  margin: 0 auto;
  border: 1px solid rgba(255, 255, 255, 0.3);
  ${refinedGlassEffect}
  animation: ${fadeIn} 0.5s ease-out forwards;
  animation-delay: 0.2s;
`;

export const Code = styled.code<{ $isMobileDevice: boolean, $isSmallMobileDevice: boolean }>`
  font-family: 'Roboto Mono', monospace;
  font-size: ${({ $isMobileDevice, $isSmallMobileDevice }) => ($isMobileDevice || $isSmallMobileDevice) ? '0.75rem' : '0.85rem'};
  color: ${theme.colors.text.secondary};
  display: flex;
  align-items: center;
  padding: ${theme.spacing.xs} 0;
  font-weight: 500;
  width: 100%;
  line-height: 1.5;
  
  /* Improve text wrapping on small screens */
  @media (max-width: 360px) {
    word-break: break-word;
    hyphens: auto;
  }
`;

export const AirQualitySectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: ${theme.spacing.sm};
  padding-top: ${theme.spacing.sm};
  border-top: 1px solid rgba(44, 62, 80, 0.1);
  margin-top: ${theme.spacing.sm};
  
  code {
    display: flex;
    align-items: center;
  }
  
  /* Stack elements on very small screens */
  @media (max-width: 320px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${theme.spacing.md};
    
    code {
      margin-bottom: ${theme.spacing.xs};
    }
  }
`;

export const MoreInfoButton = styled.button<{ $isDesktopOrLaptop: boolean; $isMobileDevice: boolean; $isSmallMobileDevice: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  background: ${theme.gradient.accent};
  color: ${theme.colors.text.primary};
  font-weight: 600;
  font-size: 0.7rem;
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: ${theme.radius.pill};
  box-shadow: ${theme.shadow.sm};
  transition: all 0.2s ease;
  animation: ${fadeIn} 0.5s ease-out forwards;
  animation-delay: 0.6s;
  
  /* Increase touch target size for mobile */
  ${props => (props.$isMobileDevice || props.$isSmallMobileDevice) && `
    min-height: 40px;
    padding: ${theme.spacing.sm} ${theme.spacing.lg};
  `}
  
  &:hover {
    box-shadow: ${theme.shadow.md};
    transform: translateY(-1px);
  }
  
  ${responsive.device('md')} {
    font-size: 0.75rem;
  }
`;

export const UnitsContainer = styled.div<{ $isDesktopOrLaptop: boolean; $isMobileDevice: boolean; $isSmallMobileDevice: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.background.dark};
  backdrop-filter: blur(4px);
  border-radius: ${theme.radius.pill};
  box-shadow: ${theme.shadow.sm};
  margin: ${theme.spacing.md} auto 0;
  padding: ${theme.spacing.xs} ${theme.spacing.lg};
  width: fit-content;
  max-width: 90%; /* Consistent with other containers */
  border: 1px solid rgba(255, 255, 255, 0.2);
  ${refinedGlassEffect}
  animation: ${fadeIn} 0.5s ease-out forwards;
  animation-delay: 0.4s;
`;

export const UnitsSubContainer = styled.div<{ $isMobileDevice: boolean; $isSmallMobileDevice: boolean }>`
  display: flex;
  gap: ${theme.spacing.xl};
  font-size: 0.8rem;
  
  ${responsive.device('md')} {
    font-size: 0.85rem;
  }
`;

export const UnitSpan = styled.span<{ $isSelected: boolean }>`
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  padding: ${theme.spacing.xs};
  color: ${({ $isSelected }) => $isSelected ? theme.colors.text.primary : theme.colors.text.muted};
  font-weight: ${({ $isSelected }) => $isSelected ? '600' : '400'};
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: ${({ $isSelected }) => $isSelected ? '100%' : '0'};
    height: 2px;
    background-color: ${theme.colors.accent};
    transition: width 0.2s ease;
  }
  
  &:hover {
    color: ${theme.colors.text.primary};
    
    &::after {
      width: 100%;
    }
  }
  
  /* Increase touch target size for mobile */
  @media (max-width: 768px) {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    min-height: 44px;
    display: flex;
    align-items: center;
  }
`;

export const FooterContainer = styled.div<{ $isDesktopOrLaptop: boolean; $isMobileDevice: boolean; $isSmallMobileDevice: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.lg};
  
  ${responsive.device('md')} {
    gap: ${theme.spacing.md};
  }
`;

export const LanguageAndSocialNetworkContainer = styled.div`
  position: relative;
  width: 100%;
  padding: ${theme.spacing.xs} 0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* Fix the weird mobile centering by making the icon absolutely positioned */
  > div {
    width: auto; /* Don't force 100% width on the inner div */
    position: relative;
    z-index: 1;
  }
  
  /* Make sure there's enough padding for the right-aligned icon */
  @media (max-width: 480px) {
    padding-right: 38px;
  }
`;

export const SocialNetworkIconContainer = styled.span<{ $isDesktopOrLaptop: boolean }>`
  position: absolute;
  right: ${theme.spacing.sm};
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  display: flex;
  
  ${responsive.device('md')} {
    right: ${theme.spacing.md};
  }
  
  /* Ensure proper positioning on very small screens */
  @media (max-width: 360px) {
    right: 0;
  }
`;

export const InfoIconButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
  }
  
  &:focus {
    outline: none;
  }
`;

export const InfoIcon = styled.img<{ $mouseOver: boolean, src: string }>`
  width: 24px;
  height: 24px;
  object-fit: contain;
  transition: all 0.2s ease;
  filter: ${({ $mouseOver }) => $mouseOver ? 'invert(70%) sepia(54%) saturate(1500%) hue-rotate(358deg) brightness(102%) contrast(99%)' : 'none'};
  
  ${InfoIconButton}:hover & {
    filter: invert(70%) sepia(54%) saturate(1500%) hue-rotate(358deg) brightness(102%) contrast(99%);
    transform: scale(1.1);
  }
  
  ${responsive.device('md')} {
    width: 26px;
    height: 26px;
  }
`;

export const LocationNotFoundCode = styled.code<{ $isSmallMobileDevice: boolean, $isMobileDevice: boolean }>`
  display: flex;
  background-color: rgba(231, 76, 60, 0.7);
  width: 100%;
  justify-content: center;
  text-align: center;
  padding: ${theme.spacing.sm};
  border-radius: ${theme.radius.sm};
  overflow-wrap: break-word;
  font-size: 0.8rem;
  color: white;
  font-family: 'Roboto Mono', monospace;
  
  ${responsive.device('md')} {
    font-size: 0.85rem;
  }
  
  /* Better text handling on small screens */
  @media (max-width: 360px) {
    font-size: 0.75rem;
    padding: ${theme.spacing.xs};
  }
`;

export const LocationNotFoundContainer = styled.div<{ $isDesktopOrLaptop: boolean, $isMobileDevice: boolean, $isSmallMobileDevice: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${CONTAINER_MAX_WIDTH};
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  border-radius: ${theme.radius.lg};
  padding: ${theme.spacing.lg};
  margin: ${theme.spacing.md} auto;
  box-shadow: ${theme.shadow.sm};
  gap: ${theme.spacing.md};
  border: 1px solid rgba(255, 255, 255, 0.3);
  ${refinedGlassEffect}
  animation: ${fadeIn} 0.8s ease-out forwards;
`;

export const LocationNotFoundSpotImg = styled.img<{ src: string; $isDesktopOrLaptop: boolean, $isMobileDevice: boolean, $isSmallMobileDevice: boolean }>`
  src: src;
  width: 70%;
  max-width: 250px;
  margin-bottom: ${theme.spacing.sm};
`;

export const DangerLogo = styled.img<{ src: string }>`
  src: src;
  display: block;
  margin: ${theme.spacing.lg} auto;
  width: 90px;
`;

export const BreakLine = styled.br``;

export const Line = styled.div`
  height: 1px;
  background: rgba(44, 62, 80, 0.1);
  width: 100%;
  margin: ${theme.spacing.xs} 0;
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
  max-width: ${CONTAINER_MAX_WIDTH};
  border: 1px solid rgba(255, 255, 255, 0.3);
  gap: ${theme.spacing.md};
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
  max-width: ${CONTAINER_MAX_WIDTH};
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${theme.shadow.md};
  }
`;
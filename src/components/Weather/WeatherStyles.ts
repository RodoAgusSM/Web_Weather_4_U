import styled, { css, keyframes } from 'styled-components';

// Modern color palette - updated based on the image
const palette = {
  primary: '#85C1E9',       // Light Sky Blue
  secondary: '#5DADE2',     // Medium Blue
  accent: '#F39C12',        // Orange
  dark: '#2C3E50',          // Dark Blue
  light: '#ECF0F1',         // Light Gray
  white: '#FFFFFF',         // White
  lightBlue: '#AED6F1',     // Very Light Blue (for card backgrounds)
  lighterBlue: '#D6EAF8',   // Even lighter blue (for main container)
  darkBlue: '#2874A6',      // Dark Blue for text
  black: '#000000',         // Black for text
  danger: '#E74C3C',        // Red
  info: '#3498DB',          // Blue
  warning: '#F39C12',       // Orange
  success: '#2ECC71',       // Green
  mainBackground: '#85C1E9', // Main background light blue from image
};

// Design tokens based on modern color palette
const theme = {
  colors: {
    primary: palette.primary,
    secondary: palette.secondary,
    accent: palette.accent,
    background: {
      light: 'rgba(255, 255, 255, 0.6)',
      dark: 'rgba(174, 214, 241, 0.3)',
      card: 'rgba(214, 234, 248, 0.8)'  // Lighter blue for cards
    },
    text: {
      primary: palette.darkBlue,  // Darker blue for better readability
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

// Use a consistent container width value - increase for better readability
const CONTAINER_MAX_WIDTH = '500px';
const CONTAINER_MAX_WIDTH_MOBILE = '95%';

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

// Shared styles that can be reused across components
/* const glassContainer = `
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  border-radius: ${theme.radius.lg};
  box-shadow: ${theme.shadow.sm};
  border: 1px solid rgba(255, 255, 255, 0.3);
`; */

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

// Basic text styles
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

// Icon and image components
export const WeatherIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const WeatherIcon = styled.img<{ src: string }>`
  src: src;
  width: 5rem;
  height: 5rem;
  border-radius: ${theme.radius.pill};
  background: ${theme.gradient.glass};
  backdrop-filter: blur(4px);
  box-shadow: ${theme.shadow.sm};
  padding: ${theme.spacing.xs};
  transition: all 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
  animation: ${pulse} 2s ease-in-out infinite;
  
  @media (max-width: 480px) {
    width: 4rem;
    height: 4rem;
  }
  
  @media (min-width: 1024px) {
    width: 6rem;
    height: 6rem;
  }
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

// Main container components
export const WeatherCard = styled.div<{ $isSmallMobileDevice: boolean, $isMobileDevice: boolean, $isDesktopOrLaptop: boolean }>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  border-radius: ${theme.radius.lg};
  box-shadow: ${theme.shadow.sm};
  border: 1px solid rgba(255, 255, 255, 0.3);
  margin: ${theme.spacing.md} auto;
  padding: ${({ $isSmallMobileDevice }) => $isSmallMobileDevice ? theme.spacing.sm : theme.spacing.lg};
  width: ${({ $isMobileDevice }) => $isMobileDevice ? CONTAINER_MAX_WIDTH_MOBILE : '100%'};
  max-width: ${CONTAINER_MAX_WIDTH};
  animation: ${fadeIn} 0.5s ease-out forwards;
  ${refinedGlassEffect}
  
  /* Adjust for landscape orientation on mobile */
  ${orientationResponsive.landscape} {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    min-height: auto;
    max-height: 95vh;
    overflow-y: auto;
    padding: ${theme.spacing.md};
    
    > * {
      flex-shrink: 0;
    }
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

// Update the CustomWeatherMainContainer for better mobile display
export const CustomWeatherMainContainer = styled(WeatherMainContainer) <{ $isHovered?: boolean }>`
  padding: ${theme.spacing.md};
  box-sizing: border-box;
  background-color: ${({ $isHovered }) => $isHovered ? 'rgba(174, 214, 241, 0.9)' : 'rgba(174, 214, 241, 0.7)'};
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: ${theme.radius.lg};
  backdrop-filter: blur(8px);
  box-shadow: ${({ $isHovered }) => $isHovered ? theme.shadow.md : theme.shadow.sm};
  transition: all 0.3s ease;
  transform: ${({ $isHovered }) => ($isHovered ? 'translateY(-3px)' : 'translateY(0)')};
  width: 100%;
  margin-bottom: ${theme.spacing.md};
  
  /* Mobile optimization */
  @media (max-width: 480px) {
    padding: ${theme.spacing.sm};
  }
  
  /* Important: completely override parent's hover styles */
  &:hover {
    transform: none !important;
    background: none !important;
    box-shadow: none !important;
  }

  /* Better touch interaction */
  @media (hover: none) {
    &:active {
      transform: scale(0.98);
      transition: transform 0.1s;
    }
  }
`;

// Weather content components - Improve layout for mobile
export const WeatherMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.3rem;
  text-align: left;
  cursor: default;

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

// Temperature display components
export const WeatherMainTemperature = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${theme.colors.text.primary};
  line-height: 1;
`;

export const TemperatureValue = styled(WeatherMainTemperature)`
  font-size: 2.2rem;
  color: ${palette.black};
  margin-right: 0.25rem;
  
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
`;

export const FeelsLikeText = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  margin-top: 0.2rem;
  color: ${palette.darkBlue};
  white-space: nowrap;
  
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
`;

// Data display layout components
export const WeatherMainData = styled.div<{ $isDesktopOrLaptop: boolean; $isMobileDevice: boolean, $isSmallMobileDevice: boolean }>`
  font-weight: 500;
  font-size: 0.85rem;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs};
  margin-top: 0.25rem;
  color: ${palette.black};
  
  ${responsive.device('md')} {
    font-size: 0.95rem;
  }
`;

// Weather data container components
export const WeatherDataContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  
  /* Make sure content doesn't overflow on very small screens */
  @media (max-width: 320px) {
    font-size: 0.9em;
  }
`;

export const CustomWeatherDataContainer = styled(WeatherDataContainer)`
  max-width: ${CONTAINER_MAX_WIDTH};
  margin: 0 auto;
`;

export const DataColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  
  /* Adjust spacing on mobile */
  @media (max-width: 480px) {
    gap: 0.5rem;
  }
  
  /* Optimize for landscape */
  ${orientationResponsive.landscape} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${theme.spacing.md};
  }
`;

// Units selection components
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
  max-width: 90%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  ${refinedGlassEffect}
  animation: ${fadeIn} 0.5s ease-out forwards;
  animation-delay: 0.4s;
`;

export const CustomUnitsContainer = styled(UnitsContainer)`
  max-width: ${CONTAINER_MAX_WIDTH};
  width: 100%;
  margin-top: ${theme.spacing.lg};
  padding: ${theme.spacing.xs} 0;
  
  /* Make it stand out more on mobile */
  @media (max-width: 480px) {
    background: rgba(174, 214, 241, 0.5);
    margin-top: ${theme.spacing.md};
  }
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
  padding: ${theme.spacing.xs} ${theme.spacing.md};
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
    padding: ${theme.spacing.sm} ${theme.spacing.lg};
    min-height: 44px;
    display: flex;
    align-items: center;
  }
`;

// Footer and social components
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
  padding: ${theme.spacing.md} 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${theme.spacing.sm};
  
  /* Fix the weird mobile centering by making the icon absolutely positioned */
  > div {
    width: auto; /* Don't force 100% width on the inner div */
    position: relative;
    z-index: 1;
  }
  
  /* Make sure there's enough padding for the right-aligned icon */
  @media (max-width: 480px) {
    padding-right: 38px;
    padding-top: ${theme.spacing.lg};
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

// Error and network components
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

export const AllDataContainer = styled.div<{ $isDesktopOrLaptop: boolean, $isMobileDevice: boolean, $isSmallMobileDevice: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  width: 100%;
  align-items: center;
  
  ${responsive.device('sm')} {
    gap: ${theme.spacing.lg};
  }
  
  /* Tablet-specific layout improvements */
  @media (min-width: 768px) and (max-width: 1023px) {
    gap: ${theme.spacing.xl};
    
    & > * {
      max-width: 95%;
    }
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

// Empty grid cell component - updated for visual consistency
export const EmptyGridCell = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: ${theme.radius.md};
  backdrop-filter: blur(4px);
  min-height: 50px;
  
  @media (max-width: 480px) {
    min-height: 40px;
  }
  
  ${orientationResponsive.landscape} {
    min-height: 45px;
  }
`;
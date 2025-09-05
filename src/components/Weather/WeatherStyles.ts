import styled, { css, keyframes } from 'styled-components';
import { ThemeType } from 'styles/theme';

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

const responsive = {
  device: (size: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => {
    const sizes = {
      xs: 479,
      sm: 767,
      md: 1023,
      lg: 1279,
      xl: 1440,
    };
    return `@media (min-width: ${sizes[size]}px)`;
  },
};

const orientationResponsive = {
  landscape: `@media (orientation: landscape) and (max-height: 600px)`,
};

const CONTAINER_MAX_WIDTH = '500px';

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

const refinedGlassEffect = `
  background-image: 
    radial-gradient(circle at top left, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.05) 100%);
  background-blend-mode: overlay;
`;

const hoverLiftEffect = `
  transition: all 0.3s ease;
  cursor: default;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${theme.shadow.md};
  }
`;

export const TitleApp = styled.div`
  text-align: center;
  margin: ${theme.spacing.sm} 0;
  cursor: default;
`;

export const Title = styled.h1<{
  $isDesktopOrLaptop: boolean;
  $isMobileDevice: boolean;
  $isSmallMobileDevice: boolean;
}>`
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  color: ${theme.colors.text.primary};
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  letter-spacing: 0.5px;
  margin: 0;
  justify-content: center;

  ${responsive.device('md')} {
    font-size: 1.4rem;
  }
`;

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

export const CustomWeatherMainContainer = styled(WeatherMainContainer)<{ $isHovered?: boolean }>`
  padding: ${theme.spacing.md};
  box-sizing: border-box;
  background-color: ${({ $isHovered }) =>
    $isHovered ? 'rgba(174, 214, 241, 0.9)' : 'rgba(174, 214, 241, 0.7)'};
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: ${theme.radius.lg};
  backdrop-filter: blur(8px);
  box-shadow: ${({ $isHovered }) => ($isHovered ? theme.shadow.md : theme.shadow.sm)};
  transition: all 0.3s ease;
  transform: ${({ $isHovered }) => ($isHovered ? 'translateY(-3px)' : 'translateY(0)')};
  width: 100%;
  margin-bottom: ${theme.spacing.md};

  @media (max-width: 480px) {
    padding: ${theme.spacing.sm};
  }

  &:hover {
    transform: none !important;
    background: none !important;
    box-shadow: none !important;
  }

  @media (hover: none) {
    &:active {
      transform: scale(0.98);
      transition: transform 0.1s;
    }
  }
`;

export const WeatherMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.3rem;
  text-align: left;
  cursor: default;

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

  @media (max-width: 360px) {
    flex-direction: column;
    gap: ${theme.spacing.md};
  }
`;

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

export const WeatherMainData = styled.div<{
  $isDesktopOrLaptop: boolean;
  $isMobileDevice: boolean;
  $isSmallMobileDevice: boolean;
}>`
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

export const WeatherDataContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  @media (max-width: 320px) {
    font-size: 0.9em;
  }
`;

export const CustomWeatherDataContainer = styled(WeatherDataContainer)`
  max-width: 500px;
  margin: 0 auto;
  min-width: 100%;
  padding: 0;
  box-sizing: border-box;
`;

export const DataColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  width: 100%;
  box-sizing: border-box;
`;

export const UnitsContainer = styled.div<{
  $isDesktopOrLaptop: boolean;
  $isMobileDevice: boolean;
  $isSmallMobileDevice: boolean;
}>`
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
  border-radius: 8px;
`;

export const CustomUnitsContainer = styled(UnitsContainer)`
  max-width: ${CONTAINER_MAX_WIDTH};
  width: 100%;
  margin-top: ${theme.spacing.lg};
  padding: ${theme.spacing.xs} 0;
  background: rgba(174, 214, 241, 0.5);

  @media (max-width: 480px) {
    margin-top: ${theme.spacing.md};
  }
`;

export const UnitsSubContainer = styled.div<{
  $isMobileDevice: boolean;
  $isSmallMobileDevice: boolean;
}>`
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
  color: ${({ $isSelected }) =>
    $isSelected ? theme.colors.text.primary : theme.colors.text.muted};
  font-weight: ${({ $isSelected }) => ($isSelected ? '600' : '400')};

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: ${({ $isSelected }) => ($isSelected ? '100%' : '0')};
    height: 2px;
    background-color: ${theme.colors.accent};
    transition: width 0.2s ease;
  }

  &:hover {
    color: ${theme.colors.accent};

    &::after {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    padding: ${theme.spacing.sm} ${theme.spacing.lg};
    min-height: 44px;
    display: flex;
    align-items: center;
  }
`;

export const FooterContainer = styled.div<{
  $isDesktopOrLaptop: boolean;
  $isMobileDevice: boolean;
  $isSmallMobileDevice: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const LanguageAndSocialNetworkContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  min-height: 40px;
  height: auto;

  > div {
    width: auto;
    position: relative;
    z-index: 1;
    margin: 0;
    padding: 0;
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

  @media (max-width: 360px) {
    right: 0;
  }
`;

export const LocationNotFoundCode = styled.code<{
  $isSmallMobileDevice: boolean;
  $isMobileDevice: boolean;
}>`
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

  @media (max-width: 360px) {
    font-size: 0.75rem;
    padding: ${theme.spacing.xs};
  }
`;

export const LocationNotFoundContainer = styled.div<{
  $isDesktopOrLaptop: boolean;
  $isMobileDevice: boolean;
  $isSmallMobileDevice: boolean;
}>`
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

export const LocationNotFoundSpotImg = styled.img<{
  src: string;
  $isDesktopOrLaptop: boolean;
  $isMobileDevice: boolean;
  $isSmallMobileDevice: boolean;
}>`
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

export const WeatherContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  width: 100%;
  padding: 0.5rem 0;
  animation: ${fadeIn} 0.6s ease-out forwards;

  ${orientationResponsive.landscape} {
    padding: 0.25rem 0;
  }
`;

export const TimeInfoContainer = styled.div<{ theme: ThemeType; $isMobileDevice: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px 12px;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 8px;
  font-size: ${props => (props.$isMobileDevice ? '0.7rem' : '0.8rem')};
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  min-width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  }

  ${responsive.device('md')} {
    flex-direction: row;
    gap: 12px;
  }
`;

export const TimeInfoItem = styled.div<{ theme: ThemeType; $isHovered: boolean }>`
  display: flex;
  justify-content: center;
  gap: 6px;
  color: ${props => (props.$isHovered ? props.theme.blueTextHovered : props.theme.blueText)};
  width: 100%;

  svg {
    width: 16px;
    height: 16px;
    opacity: 0.8;
  }

  span {
    font-weight: 500;
  }

  ${responsive.device('md')} {
    &:not(:last-child)::after {
      display: inline-block;
      width: 1px;
      height: 14px;
      background-color: rgba(174, 214, 241, 0.6);
    }
  }
`;

export const TimeInfoDivider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 8px;
  height: 8px;
  flex: 0 0 auto;
  border-radius: 25px;
  background: linear-gradient(135deg, #2006f3, #199992);
  position: relative;
  margin: 0 22px;
  line-height: 0;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 25px;
    background: linear-gradient(135deg, #2006f3, #199992);
  }

  &::before {
    left: -18px;
  }

  &::after {
    right: -18px;
  }
`;

export const FadeInContainer = styled.div<{ $isVisible: boolean }>`
  opacity: ${props => (props.$isVisible ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

export const InfoButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1976d2, #2196f3);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 5px rgba(25, 118, 210, 0.3);

  &:hover {
    background: linear-gradient(135deg, #0d47a1, #1976d2);
    transform: scale(1.1);
    box-shadow: 0 3px 7px rgba(25, 118, 210, 0.4);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.4);
  }
`;

export const InfoButtonText = styled.span`
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
`;

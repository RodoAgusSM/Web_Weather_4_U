import styled, { keyframes } from 'styled-components';

// Responsive breakpoints
const responsive = {
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
  device: (size: 'sm' | 'md' | 'lg' | 'xl') =>
    `@media (min-width: ${responsive.breakpoints[size]})`,
};

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
};

// Air pollution quality colors (improved visibility palette)
export const AirPollutionColors = [
  '#2ECC71', // Good - Vibrant Green
  '#82E0AA', // Fair - Lighter Green (improved visibility)
  '#F4D03F', // Moderate - Bright Yellow
  '#F39C12', // Poor - Orange
  '#E74C3C', // Very Poor - Red
];

// Animation for progress bar filling
const fillProgress = keyframes`
  from {
    width: 0%;
  }
  to {
    width: var(--target-width);
  }
`;

export const ProgressBarFill = styled.div<{ $percentage: number; $color: string }>`
  height: 100%;
  width: 0%;
  background-color: ${(props) => props.$color};
  border-radius: ${theme.radius.pill};
  animation: ${fillProgress} 1.2s ease-out forwards;
  animation-delay: calc(var(--index, 0) * 0.1s + 0.3s);
  --target-width: ${(props) => props.$percentage}%;

  /* Add slight gradient for better visual appeal */
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.3) 50%,
    rgba(255, 255, 255, 0.1) 100%
  );
  background-blend-mode: overlay;
`;

// Animation for cards fading in
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

export const AirQualityCard = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  border-radius: ${theme.radius.md};
  padding: ${theme.spacing.md};
  box-shadow: ${theme.shadow.sm};
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  height: 100%; // Ensure consistent height
  animation: ${fadeIn} 0.5s ease-out forwards;
  animation-delay: calc(var(--index, 0) * 0.1s);
  opacity: 0;
  ${refinedGlassEffect}

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadow.md};
  }

  /* Make cards more compact on very small screens */
  @media (max-width: 360px) {
    padding: ${theme.spacing.sm};
  }
`;

export const AirQualityHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.sm};
  width: 100%;
`;

export const AirQualityTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const AirQualityName = styled.h3`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${palette.dark};
  margin: 0;
  line-height: 1.4;
  width: 100%;
  white-space: normal;
  hyphens: auto;

  /* Smaller font size on very small screens */
  @media (max-width: 360px) {
    font-size: 0.85rem;
  }
`;

export const AirQualityValue = styled.div`
  font-size: 0.9rem;
  font-weight: 700;
  color: ${palette.dark};
  background: rgba(255, 255, 255, 0.3);
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: ${theme.radius.pill};
  white-space: nowrap;
  margin-top: ${theme.spacing.xs};
  margin-left: auto;
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 10px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: ${theme.radius.pill};
  overflow: hidden;
  margin-bottom: ${theme.spacing.sm};
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  position: relative;

  /* Add markers for the 5 segments */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
        to right,
        transparent 19.8%,
        rgba(255, 255, 255, 0.5) 20%,
        rgba(255, 255, 255, 0.5) 20.2%,
        transparent 20.2%
      ),
      linear-gradient(
        to right,
        transparent 39.8%,
        rgba(255, 255, 255, 0.5) 40%,
        rgba(255, 255, 255, 0.5) 40.2%,
        transparent 40.2%
      ),
      linear-gradient(
        to right,
        transparent 59.8%,
        rgba(255, 255, 255, 0.5) 60%,
        rgba(255, 255, 255, 0.5) 60.2%,
        transparent 60.2%
      ),
      linear-gradient(
        to right,
        transparent 79.8%,
        rgba(255, 255, 255, 0.5) 80%,
        rgba(255, 255, 255, 0.5) 80.2%,
        transparent 80.2%
      );
    pointer-events: none;
  }
`;

export const LegendContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${theme.spacing.xs};
`;

export const LegendItem = styled.div<{ $color: string; $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;

  &::before {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${(props) => props.$color};
    margin-bottom: 4px;
    transition: all 0.2s ease;
    transform: ${(props) => (props.$isActive ? 'scale(1.5)' : 'scale(1)')};
    box-shadow: ${(props) => (props.$isActive ? '0 0 0 2px rgba(255,255,255,0.5)' : 'none')};
  }
`;

export const LegendText = styled.span<{ $isActive: boolean }>`
  font-size: 0.7rem;
  color: ${(props) => (props.$isActive ? palette.dark : 'rgba(44, 62, 80, 0.6)')};
  font-weight: ${(props) => (props.$isActive ? '600' : '400')};
  text-align: center;
  white-space: nowrap;
  transform: ${(props) => (props.$isActive ? 'scale(1)' : 'scale(0.9)')};
  transition: all 0.2s ease;
`;

export const AirPollutionItemSpan = styled.span<{ $color?: string }>`
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${(props) => props.$color || palette.primary};
`;

export const AirPollutionLegendDesktopContainer = styled.div`
  margin: ${theme.spacing.xl} 0;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  border-radius: ${theme.radius.lg};
  padding: ${theme.spacing.md};
  box-shadow: ${theme.shadow.sm};
  border: 1px solid rgba(255, 255, 255, 0.3);
  max-width: 400px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

export const AirPollutionLegendDesktopSubContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: ${theme.spacing.md};

  ${AirPollutionItemSpan} {
    width: 18px;
    height: 18px;
    margin: 0 ${theme.spacing.xs};
  }
`;

export const AirPollutionLegendMobileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: ${theme.spacing.lg} 0;
  gap: ${theme.spacing.sm};
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  border-radius: ${theme.radius.lg};
  padding: ${theme.spacing.md};
  box-shadow: ${theme.shadow.sm};
  border: 1px solid rgba(255, 255, 255, 0.3);
  max-width: 400px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

export const AirPollutionLegendMobileSubContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: 0.85rem;
  width: 100%;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};

  ${AirPollutionItemSpan} {
    width: 16px;
    height: 16px;
  }
`;

export const Title = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${palette.dark};
  text-align: center;
  margin-bottom: ${theme.spacing.md};
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

export const CurrentQualityLabel = styled.div<{ $color: string }>`
  font-size: 0.8rem;
  font-weight: 600;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  margin-top: ${theme.spacing.sm};
  border-radius: ${theme.radius.pill};
  color: #fff;
  background-color: ${(props) => props.$color};
  box-shadow: ${theme.shadow.sm};
  text-align: center;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  align-self: flex-end;
  transition: all 0.2s ease;

  ${AirQualityCard}:hover & {
    transform: scale(1.05);
    box-shadow: ${theme.shadow.md};
  }

  /* Ensure minimum touch target size */
  @media (max-width: 767px) {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    min-height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const CardsGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  width: 100%;
  margin: 1rem 0;

  /* Display in rows of 2 on larger screens */
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  /* Handle very small screens */
  @media (max-width: 360px) {
    gap: 0.75rem;
  }

  /* Adjust for landscape mode */
  @media (orientation: landscape) and (max-height: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

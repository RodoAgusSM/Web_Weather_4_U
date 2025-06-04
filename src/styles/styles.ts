import styled, { keyframes } from 'styled-components';

// Define theme with spacing values
export const theme = {
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  }
};

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

// Replace noisy texture with refined glass effect
const refinedGlassEffect = `
  background-image: 
    radial-gradient(circle at top left, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.05) 100%);
  background-blend-mode: overlay;
`;

const CONTAINER_MAX_WIDTH = '500px';

export const WeatherCard = styled.div<{ $isSmallMobileDevice: boolean, $isMobileDevice: boolean, $isDesktopOrLaptop: boolean }>`
  background:  rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(10px);
  border-radius: 1.2rem;
  padding: 1.2rem 1.2rem;
  color: #2C3E50;
  word-wrap: break-word;
  width: ${({ $isDesktopOrLaptop }) => $isDesktopOrLaptop ? '34rem' : '21rem'};

  max-width: '100%';
  max-width: ${CONTAINER_MAX_WIDTH};
  height: auto;
  min-height: ${({ $isSmallMobileDevice, $isMobileDevice }) =>
    $isSmallMobileDevice ? '36rem' : $isMobileDevice ? '37rem' : '40rem'};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
  position: relative;
  margin: auto;
  animation: ${fadeIn} 0.5s ease-out forwards;
  background-color: ${refinedGlassEffect};
  body:has([aria-label="air-pollution-info"]) & {
    width: ${({ $isDesktopOrLaptop }) => $isDesktopOrLaptop ? '50rem' : '21rem'};
  }
`;

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const Code = styled.code<{ $isMobileDevice: boolean, $isSmallMobileDevice: boolean }>`
  font-family: 'Roboto Mono', monospace;
  font-size: ${({ $isMobileDevice, $isSmallMobileDevice }) => ($isMobileDevice || $isSmallMobileDevice) ? '0.75rem' : '0.85rem'};
  color: #34495E;
  display: flex;
  align-items: center;
  padding: 0.25rem 0;
  cursor: default;
  font-weight: 500;
  line-height: 1.5;
`;

export const BackContainer = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 600;
  margin-right: auto;
  margin-left: 0; /* Aligned with card padding */
  margin-top: 0; /* Aligned with card padding */
  margin-bottom: ${theme.spacing.md};
  cursor: pointer;
  color: #2C3E50;
  padding: 0.5rem 0.75rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  transition: all 0.2s ease;
  animation: ${fadeIn} 0.5s ease-out forwards;
  animation-delay: 0.2s;
  ${refinedGlassEffect}
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateX(-2px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.12);
    color: #F39C12; /* Changed from blue to orange */
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
  background-color: ${({ $mouseOver }) => $mouseOver ? '#F39C12' : '#2C3E50'}; /* Changed from blue to orange */
  margin-right: 0.5rem;
  transition: transform 0.2s ease, background-color 0.2s ease;
  
  ${BackContainer}:hover & {
    transform: translateX(-2px);
    background-color: #F39C12; /* Changed from blue to orange */
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
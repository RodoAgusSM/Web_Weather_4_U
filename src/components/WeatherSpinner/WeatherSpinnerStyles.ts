import styled, { keyframes } from 'styled-components';

const colors = {
  sunColor: '#F39C12',
  sunGlow: 'rgba(243, 156, 18, 0.4)',
  cloudColor: 'rgba(236, 240, 241, 0.9)',
  cloudShadow: 'rgba(52, 73, 94, 0.2)',
  rainColor: '#5DADE2',
  snowColor: '#ECF0F1',
  spinnerBg: 'rgba(174, 214, 241, 0.25)',

  lightBlue: '#85C1E9',
  mediumBlue: '#3498DB',
  darkBlue: '#2874A6',
  lightGray: '#D6EAF8',
};

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pulsate = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; box-shadow: 0 0 15px ${colors.sunGlow}; }
  50% { transform: scale(1.1); opacity: 0.9; box-shadow: 0 0 25px ${colors.sunGlow}; }
`;

const sunMovement = keyframes`
  0% {
    transform: translate(-50%, -50%) translateX(-10px) translateY(-10px);
  }
  25% {
    transform: translate(-50%, -50%) translateX(10px) translateY(-10px);
  }
  50% {
    transform: translate(-50%, -50%) translateX(10px) translateY(10px);
  }
  75% {
    transform: translate(-50%, -50%) translateX(-10px) translateY(10px);
  }
  100% {
    transform: translate(-50%, -50%) translateX(-10px) translateY(-10px);
  }
`;

const twinkle = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

const raindropFall = keyframes`
  0% {
    transform: translateY(-15px) scale(1);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(70px) scale(0.5); 
    opacity: 0;
  }
`;

const snowFall = keyframes`
  0% {
    transform: translateY(-15px) rotate(0deg);
    opacity: 0;
  }
  20% {
    opacity: 0.8;
  }
  50% {
    transform: translateY(30px) rotate(180deg) translateX(10px);
  }
  80% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(70px) rotate(360deg) translateX(-10px);
    opacity: 0;
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const pulseRay = keyframes`
  0%, 100% { transform: scaleY(1); opacity: 0.7; }
  50% { transform: scaleY(1.3); opacity: 1; }
`;

const sizeMap = {
  small: {
    container: '80px',
    inner: '65px',
  },
  medium: {
    container: '140px',
    inner: '120px',
  },
  large: {
    container: '200px',
    inner: '170px',
  },
};

export const SpinnerContainer = styled.div<{ $size: 'small' | 'medium' | 'large' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => sizeMap[props.$size].container};
  height: ${props => sizeMap[props.$size].container};
  background-color: ${colors.spinnerBg};
  border-radius: 50%;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.5s ease-out;
  transform: perspective(800px) rotateX(10deg);
`;

export const GlassOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0.05) 100%
  );
  border-radius: inherit;
  z-index: 1;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    background-size: 200% 100%;
    animation: ${shimmer} 5s infinite linear;
    border-radius: inherit;
  }
`;

export const SpinnerInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 2;
`;

export const SunElement = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 35%;
  height: 35%;
  background: linear-gradient(45deg, ${colors.sunColor}, #f7dc6f);
  border-radius: 50%;
  box-shadow: 0 0 25px ${colors.sunGlow};
  animation: ${pulsate} 3s ease-in-out infinite, ${sunMovement} 8s ease-in-out infinite;
  z-index: 2;
`;

export const SunRay = styled.div<{ $angle: number; $length: number; $delay: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  height: ${props => props.$length}%;
  background-color: rgba(243, 156, 18, 0.6);
  transform: translate(-50%, -50%) rotate(${props => props.$angle}deg) translateY(-100%);
  transform-origin: bottom center;
  animation: ${pulseRay} 2s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;
`;

export const CloudElement = styled.div<{
  $delay: number;
  $size: number;
  $distance: number;
  $rotation: number;
}>`
  position: absolute;
  top: ${props => 50 - props.$size / 2}%;
  left: ${props => 50 - props.$size / 2}%;
  width: ${props => props.$size}%;
  height: ${props => props.$size * 0.6}%;
  background-color: ${colors.cloudColor};
  border-radius: 50px;
  box-shadow: 0 4px 8px ${colors.cloudShadow}, inset 0 -2px 5px rgba(0, 0, 0, 0.05),
    inset 0 2px 5px rgba(255, 255, 255, 0.8);
  animation: ${rotate} 15s linear infinite;
  animation-delay: ${props => props.$delay}s;
  transform-origin: ${props => 50 + props.$distance}% 50%;
  z-index: 3;

  &::before {
    content: '';
    position: absolute;
    top: -40%;
    left: 25%;
    width: 50%;
    height: 100%;
    background-color: ${colors.cloudColor};
    border-radius: 50%;
    box-shadow: inset 0 2px 5px rgba(255, 255, 255, 0.7);
  }

  &::after {
    content: '';
    position: absolute;
    top: -25%;
    right: 15%;
    width: 40%;
    height: 80%;
    background-color: ${colors.cloudColor};
    border-radius: 50%;
    box-shadow: inset 0 2px 5px rgba(255, 255, 255, 0.7);
  }
`;

export const RainDrop = styled.div<{
  $delay: number;
  $position: number;
  $size: number;
  $duration: number;
}>`
  position: absolute;
  top: 40%;
  left: ${props => props.$position}%;
  width: ${props => props.$size}px;
  height: ${props => props.$size * 3}px;
  background: linear-gradient(to bottom, ${colors.lightBlue}, ${colors.mediumBlue});
  border-radius: 50%;
  animation: ${raindropFall} ${props => props.$duration}s ease-in infinite;
  animation-delay: ${props => props.$delay}s;
  opacity: 0.8;
  z-index: 1;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
`;

export const SnowFlake = styled.div<{
  $delay: number;
  $position: number;
  $size: number;
  $duration: number;
}>`
  position: absolute;
  top: 30%;
  left: ${props => props.$position}%;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  background-color: ${colors.snowColor};
  border-radius: 50%;
  animation: ${snowFall} ${props => props.$duration}s ease-in-out infinite,
    ${twinkle} 1.5s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s, ${props => props.$delay * 0.5}s;
  opacity: 0.9;
  z-index: 1;
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
`;

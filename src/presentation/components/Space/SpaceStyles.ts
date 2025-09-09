import styled, { css, keyframes } from 'styled-components';

import { animated } from '@react-spring/web';

import { Colors } from '../../../styles/colors';

const STAR_SIZE = '10px';
const STAR_BORDER_RADIUS = '25px';

const tailAnimation = keyframes`
	0% {
		width: 0px;
	}
	30% {
		width: 100px;
	}
	100% {
		width: 0px;
	}
`;

const fallingAnimation = keyframes`
	0% {
		transform: translateX(0);
	}
	100% {
		transform: translateX(34rem);
	}
`;

const shiningAnimation = keyframes`
	0% {
		width: 0;
	}
	50% {
		width: 30px;
	}
	100% {
		width: 0;
	}
`;

const simpleFallingAnimation = keyframes`
	0% {
		opacity: 0;
		width: 0px;
		transform: translate3d(0, 0, 0) scale(1);
	}
	10% {
		opacity: 1;
		width: 60px;
		transform: translate3d(20px, 10px, 0) scale(1.1);
	}
	50% {
		opacity: 1;
		width: 80px;
		transform: translate3d(150px, 100px, 0) scale(1);
	}
	90% {
		opacity: 0.8;
		width: 40px;
		transform: translate3d(280px, 180px, 0) scale(0.9);
	}
	100% {
		opacity: 0;
		width: 0px;
		transform: translate3d(300px, 200px, 0) scale(0.5);
	}
`;

export const StarElement = styled.div<{
  $delay: number;
  $top: number;
  $left: number;
  $isMobile?: boolean;
}>`
  position: absolute;
  height: 4px;
  background: linear-gradient(-45deg, ${Colors.shootingStar}, rgba(0, 0, 255, 0));
  border-radius: 999px;

  ${({ $isMobile }) =>
    $isMobile
      ? css`
          box-shadow: 0 0 8px rgba(230, 232, 199, 0.9), 0 0 16px rgba(230, 232, 199, 0.6);
          background: linear-gradient(-45deg, ${Colors.shootingStar}, rgba(230, 232, 199, 0.8));
        `
      : css`
          filter: drop-shadow(0 0 6px ${Colors.shootingStar});
        `}

  ${({ $isMobile }) =>
    $isMobile
      ? css`
          animation: ${simpleFallingAnimation} 4s ease-in-out infinite;
        ` /* Simpler animation for iOS */
      : css`
          animation: ${tailAnimation} 3s ease-in-out infinite,
            ${fallingAnimation} 3s ease-in-out infinite;
        `}

  ${({ $isMobile }) =>
    $isMobile &&
    css`
      will-change: transform, opacity;
      transform: translateZ(0);
      backface-visibility: hidden;
    `}

  ${({ $delay, $top, $left }) => css`
    animation-delay: ${$delay}s;
    top: calc(50% + ${$top}px);
    left: calc(50% + ${$left}px);
  `}
`;

export const SpaceContainer = styled.ul`
  position: absolute;
`;

export const StarBeforeAfter = styled.div<{ $isMobile?: boolean }>`
  content: '';
  position: absolute;
  top: calc(50% - 2px);
  right: 0;
  height: 4px;
  background: linear-gradient(
    -45deg,
    rgba(0, 0, 255, 0),
    ${Colors.shootingStar},
    rgba(0, 0, 255, 0)
  );
  border-radius: 100%;
  transform: translateX(50%) rotateZ(45deg);

  ${({ $isMobile }) =>
    $isMobile
      ? css`
          animation: ${shiningAnimation} 4s ease-in-out infinite;
          will-change: transform;
          transform: translateX(50%) rotateZ(45deg) translateZ(0);
        `
      : css`
          animation: ${shiningAnimation} 3s ease-in-out infinite;
        `}
`;

export const StarAfter = styled(StarBeforeAfter)<{ $isMobile?: boolean }>`
  ${({ $isMobile }) =>
    $isMobile
      ? css`
          transform: translateX(50%) rotateZ(-45deg) translateZ(0);
        `
      : css`
          transform: translateX(50%) rotateZ(-45deg);
        `}
`;

export const AnimatedSpring = styled(animated.div)`
  width: ${STAR_SIZE};
  height: ${STAR_SIZE};
  background: ${Colors.shootingStar};
  border-radius: ${STAR_BORDER_RADIUS};
  position: absolute;
`;

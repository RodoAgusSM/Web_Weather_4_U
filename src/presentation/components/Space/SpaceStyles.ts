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

export const StarElement = styled.div<{ $delay: number; $top: number; $left: number }>`
  position: absolute;
  height: 4px;
  background: linear-gradient(-45deg, ${Colors.shootingStar}, rgba(0, 0, 255, 0));
  border-radius: 999px;
  filter: drop-shadow(0 0 6px ${Colors.shootingStar});
  animation: ${tailAnimation} 3s ease-in-out infinite, ${fallingAnimation} 3s ease-in-out infinite;
  ${({ $delay, $top, $left }) => css`
    animation-delay: ${$delay}s;
    top: calc(50% + ${$top}px);
    left: calc(50% + ${$left}px);
  `}
`;

export const SpaceContainer = styled.ul`
  position: absolute;
`;

export const StarBeforeAfter = styled.div`
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
  animation: ${shiningAnimation} 3s ease-in-out infinite;
`;

export const StarAfter = styled(StarBeforeAfter)`
  transform: translateX(50%) rotateZ(-45deg);
`;

export const AnimatedSpring = styled(animated.div)`
  width: ${STAR_SIZE};
  height: ${STAR_SIZE};
  background: ${Colors.shootingStar};
  border-radius: ${STAR_BORDER_RADIUS};
`;

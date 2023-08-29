import styled, { css, keyframes } from 'styled-components';
import { Colors } from 'styles/colors';

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

export const Star = styled.div<{ delay: number; top: number; left: number }>`
	position: absolute;
	height: 4px;
		background: linear-gradient(-45deg, ${Colors.shootingStar} , rgba(0, 0, 255, 0));
	border-radius: 999px;
	filter: drop-shadow(0 0 6px ${Colors.shootingStar});
	animation: ${tailAnimation} 3s ease-in-out infinite,
				${fallingAnimation} 3s ease-in-out infinite;
	${(props) => css`
		animation-delay: ${props.delay}s;
		top: calc(50% + ${props.top}px);
		left: calc(50% + ${props.left}px);
	`}
`;

export const StarBeforeAfter = styled.div`
	content: '';
	position: absolute;
	top: calc(50% - 2px);
	right: 0;
	height: 4px;
	background: linear-gradient(-45deg, rgba(0, 0, 255, 0), ${Colors.shootingStar}, rgba(0, 0, 255, 0));
	border-radius: 100%;
	transform: translateX(50%) rotateZ(45deg);
	animation: ${shiningAnimation} 3s ease-in-out infinite;
`;

export const StarAfter = styled(StarBeforeAfter)`
	transform: translateX(50%) rotateZ(-45deg);
`;

export const StarContainer = styled.ul`
	position: absolute;
`;
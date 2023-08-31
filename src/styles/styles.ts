import styled, { createGlobalStyle } from 'styled-components';

import { Colors } from './colors';

const desktopWidth = '34rem';
const desktopHeight = '40rem';
const mobileWidth = '21rem';
const mobileHeightSmallDisplay = '35rem';
const mobileHeightBigDisplay = '36rem';

export const GlobalStyle = createGlobalStyle<{ $isSmallMobileDevice: boolean }>`
	body {
		margin: 0;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-right: -50%;
		transform: translate(-50%, -50%);
		background-color: ${Colors.wateryGreen};
		margin-top: ${({ $isSmallMobileDevice }) => $isSmallMobileDevice && '6px'};
	}
`;

export const WeatherCard = styled.div<{ $isSmallMobileDevice: boolean, $isMobileDevice: boolean, $isDesktopOrLaptop: boolean }>`
	border-color: ${Colors.whiteChocolate};
	border-style: solid;
	padding: 10px;
	background-color: ${Colors.jetStream};
	border-radius: 20px;
	color: ${Colors.black};
	word-wrap: break-word;
	width: ${({ $isDesktopOrLaptop }) => $isDesktopOrLaptop ? desktopWidth : mobileWidth};
	height: ${({ $isSmallMobileDevice }) => $isSmallMobileDevice && mobileHeightSmallDisplay};
	height: ${({ $isMobileDevice }) => $isMobileDevice && mobileHeightBigDisplay};
	height: ${({ $isDesktopOrLaptop }) => $isDesktopOrLaptop && desktopHeight};
	box-shadow: 2px 2px 12px 2px ${Colors.darkCharcoal};
`;

export const ColumnContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
`



export const Code = styled.code<{ $isMobileDevice: boolean, $isSmallMobileDevice: boolean }>`
	cursor: default;
	font-size: ${({ $isMobileDevice, $isSmallMobileDevice }) => ($isMobileDevice || $isSmallMobileDevice) && '12px'};
`;

export const BackContainer = styled.span`
	display: inline-flex;
	align-content: center;
	justify-content: center;
	align-items: center;
	font-size: 15px;
	font-weight: bold;
	margin-right: auto;
	margin-left: 5px;
	margin-top: 5px;
	cursor: pointer;
	&:hover {
		color: ${Colors.yellowSun};
	}
`;

export const BackIconSpotImg = styled.image<{
	$mouseOver: boolean;
	$regular: string;
	$hover: string;
}>`
	width: 20px;
	height: 20px;
	background-size: contain;
	background-image: url(${({ $mouseOver, $regular, $hover }) => (!$mouseOver ? $regular : $hover)});
	&:hover {
	background-image: url(${({ $hover }) => $hover});
	}
`;


export const CenteredContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const Line = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;

	&::after {
	content: '';
	width: 90%;
	height: 2px;
	background: linear - gradient(to right, ${Colors.darkCyan}, ${Colors.wateryGreen});
}
`;
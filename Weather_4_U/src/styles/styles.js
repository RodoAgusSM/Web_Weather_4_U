import styled, { createGlobalStyle } from 'styled-components';
import { Colors } from './colors';

let desktopWidth = 500 + 'px';
let desktopHeight = 560 + 'px';
let mobileWidth = window.innerWidth * 0.85 + 'px';
let mobileHeightSmallDisplay = window.innerHeight * 0.93 + 'px'; //Done
let mobileHeightBigDisplay = window.innerHeight * 0.85 + 'px'; //Done
let mobileHeight12and13ProMax = window.innerHeight * 0.71 + 'px'; //Done
let mobileHeight12and13RegularAndPro = window.innerHeight * 0.8 + 'px'; //Done
let mobileHeight11ProMax = window.innerHeight * 0.74 + 'px'; //Done
let mobileHeight11ProAnd13Mini = window.innerHeight * 0.82 + 'px'; //Done
let mobileHeight11Regular = window.innerHeight * 0.74 + 'px'; //Done

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
		'Droid Sans', 'Helvetica Neue', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	position: absolute;
	top: 50%;
	left: 50%;
	margin-right: -50%;
	transform: translate(-50%, -50%);
	background-color: ${Colors.wateryGreen};
  }
`;

export const WeatherIcon = styled.img.attrs((props) => ({
	src: props.src,
}))`
	display: inline-block;
	margin-right: auto;
	margin-left: 58px;
	margin-top: 10px;
	border-color: ${Colors.lightWhite};
	background-color: ${Colors.lightOrange};
	border-style: solid;
	border-radius: 20px;
	@media (max-width: 768px) {
		margin-top: 20px;
		margin-left: 10px;
	}
	@media only screen and (min-width: 376px) and (max-width: 712px) {
		margin-top: 30px;
		margin-left: 16px;
	}
	width: 102px;
`;

export const SpinnerLogo = styled.img.attrs((props) => ({
	src: props.src,
}))`
	width: 30%;
	display: block;
	margin: 0 auto;
	@media (max-width: 768px) {
		width: 90%;
	}
`;

export const WeatherCard = styled.div`
	border-color: ${Colors.lightWhite};
	border-style: solid;
	padding: 10px;
	background-color: ${Colors.lightGreen};
	border-radius: 20px;
	color: ${Colors.black};
	@media only screen and (max-width: 375px) {
		width: ${mobileWidth};
		height: ${mobileHeightSmallDisplay};
	}
	@media only screen and (min-width: 376px) and (max-width: 712px) {
		width: ${mobileWidth};
		height: ${mobileHeightBigDisplay};
	}
	@media only screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) {
		width: ${mobileWidth};
		height: ${mobileHeight12and13ProMax};
	}
	@media only screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) {
		width: ${mobileWidth};
		height: ${mobileHeight12and13RegularAndPro};
	}
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
		width: ${mobileWidth};
		height: ${mobileHeight11ProMax};
	}
	@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
		width: ${mobileWidth};
		height: ${mobileHeight11ProAnd13Mini};
	}
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
		width: ${mobileWidth};
		height: ${mobileHeight11Regular};
	}
	width: ${desktopWidth};
	height: ${desktopHeight};
`;

export const LogoApp = styled.img.attrs((props) => ({
	src: props.src,
}))`
	margin-top: 10px;
	display: block;
	margin-left: auto;
	margin-right: auto;
	@media (max-width: 768px) {
		width: 295px;
	}
	width: 385px;
`;

export const TitleApp = styled.div`
	text-align: center;
`;

export const Subtitle = styled.h2`
	font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
	font-size: 20px;
	margin-left: 5px;
	@media (max-width: 768px) {
		font-size: 16px;
	}
`;

export const WeatherMain = styled.div`
	margin-top: -112px;
	margin-left: 175px;
	font-size: 18px;
	@media (max-width: 768px) {
		margin-top: -118px;
		margin-left: 132px;
	}
`;

export const WeatherMainTemperature = styled.code`
	margin-left: 10px;
	font-size: 23px;
	font-weight: bold;
	@media only screen and (min-width: 376px) and (max-width: 712px) {
		margin-left: 16px;
	}
`;

export const BreakLine = styled.br``;

export const Code = styled.code`
	margin-left: 10px;
	@media only screen and (max-width: 375px) {
		font-size: 11px;
	}
	@media only screen and (min-width: 376px) and (max-width: 712px) {
		font-size: 12px;
	}
	font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
`;

export const WeatherData = styled.div`
	margin-top: 15px;
	margin-left: 175px;
	font-size: 17px;
	@media (max-width: 768px) {
		margin-left: 132px;
	}
`;

export const DangerLogo = styled.img.attrs((props) => ({
	src: props.src,
}))`
	display: block;
	margin: 0 auto;
	width: 140px;
`;

export const CitiesContainer = styled.div`
	height: 50px;
	display: flex;
	border-radius: 6px;
	overflow-y: hidden;
	overflow-x: auto;
	scroll-behavior: smooth;
`;

export const CityButton = styled.span`
	display: flex;
	height: 30px;
	background-color: ${Colors.wateryGreenToneDown};
	border: 0.5px solid ${Colors.lightWhite};
	margin-right: 5px;
	align-items: center;
	border-radius: 6px;
	white-space: nowrap;
	padding-left: 4px;
	padding-right: 4px;
	font-size: 16px;
	cursor: pointer;
	&:hover {
		background-color: ${Colors.lightWhite};
	}
`;

export const LanguagesContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 18px;
`;

export const LanguageButton = styled.span`
	display: flex;
	text-decoration: underline;
	height: 30px;
	margin-right: 5px;
	align-items: center;
	border-radius: 6px;
	white-space: nowrap;
	padding-left: 4px;
	padding-right: 4px;
	font-size: 16px;
	cursor: pointer;
	&:hover {
		color: ${Colors.yellowLemon};
	}
`;

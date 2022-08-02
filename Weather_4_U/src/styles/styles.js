import styled, { createGlobalStyle } from 'styled-components';
import { Colors } from './colors';

let desktopWidth = 500 + 'px';
let desktopHeight = 565 + 'px';
let mobileWidth = window.innerWidth * 0.85 + 'px';
let mobileHeightSmallDisplay = window.innerHeight * 0.95 + 'px'; //Done
let mobileHeightBigDisplay = window.innerHeight * 0.94 + 'px'; //Done
let mobileHeight12and13ProMax = window.innerHeight * 0.778 + 'px'; //Done
let mobileHeight12and13RegularAndPro = window.innerHeight * 0.875 + 'px'; //Done
let mobileHeight11ProMax = window.innerHeight * 0.808 + 'px'; //Done
let mobileHeight11ProAnd13Mini = window.innerHeight * 0.821 + 'px'; //Done
let mobileHeight11Regular = window.innerHeight * 0.812 + 'px'; //Done

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
	@media only screen and (max-width: 375px) {
		width: 158px;
	}
	@media only screen and (min-width: 376px) and (max-width: 712px) {
		width: 255px;
	}
	width: 278px;
`;

export const TitleApp = styled.div`
	text-align: center;
	cursor: default;
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
	cursor: default;
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
	cursor: default;
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

export const SocialNetworkIconContainer = styled.span`
	display: flex;
	position: absolute;
	bottom: 2.5%;
	left: 89%;
	@media only screen and (max-width: 375px) {
		left: 86%;
	}
	@media only screen and (min-width: 376px) and (max-width: 712px) {
		left: 86%;
	}
	@media only screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) {
		left: 86%;
	}
	@media only screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) {
		left: 86%;
	}
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
		left: 86%;
	}
	@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
		left: 87%;
	}
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
		left: 86%;
	}
`;

export const SocialNetworkIcon = styled.image`
	width: 40px;
	height: 40px;
	background-size: contain;
	cursor: pointer;
	background-image: url(${(props) => (!props.mouseOver ? props.regular : props.hover)});
	&:hover {
		background-image: url(${(props) => props.hover});
	}
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
		color: ${Colors.yellowLemon};
	}
	@media (max-width: 768px) {
		margin-top: 10px;
		margin-left: 5px;
	}
	@media only screen and (min-width: 376px) and (max-width: 712px) {
		margin-top: 10px;
		margin-left: 5px;
	}
`;

export const BackIcon = styled.image`
	width: 20px;
	height: 20px;
	background-size: contain;
	background-image: url(${(props) => (!props.mouseOver ? props.regular : props.hover)});
	&:hover {
		background-image: url(${(props) => props.hover});
	}
`;

export const MiInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding-top: 35px;
	padding-left: 5px;
	padding-right: 5px;
	cursor: default;
`;

export const MiInfo = styled.span`
	display: flex;
	text-align: center;
	justify-content: center;
	font-size: 22px;
	font-weight: bold;
	padding-bottom: 12px;
`;

export const NetworkContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 58px;
	@media only screen and (max-width: 375px) {
		padding-top: 10px;
	}
`;

export const NetworkMapContainer = styled.div`
	display: 'flex';
	flex-direction: 'row';
	padding-top: 15px;
	padding-bottom: 15px;
`;

export const SocialNetworkName = styled.span`
	font-size: 16px;
	font-weight: bold;
	cursor: default;
	color: ${Colors.darkerGreen};
`;

export const SocialNetworkItem = styled.a`
	font-size: 16px;
	font-weight: bold;
	text-decoration: underline;
	cursor: pointer;
	color: ${Colors.darkerGreen};
	&:hover {
		color: ${Colors.yellowLemon};
	}
`;

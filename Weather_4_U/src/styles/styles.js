import styled, { createGlobalStyle } from 'styled-components';

let desktopWidth = 450 + 'px';
let desktopHeight = 480 + 'px';
let mobileWidth = window.innerWidth * 0.85 + 'px';

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
	background: #75cfb8;
  }
`;

export const WeatherIcon = styled.img.attrs((props) => ({
	src: props.src,
}))`
	display: inline-block;
	margin-right: auto;
	margin-left: 35px;
	border-color: #f0e5d8;
	background-color: #fce1be;
	border-style: solid;
	border-radius: 20px;
	@media (max-width: 768px) {
		margin-bottom: -5px;
	}
	@media only screen and (min-width: 376px) and (max-width: 712px) {
		margin-left: 28px;
	}
	width: 83px;
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
	border-color: #f0e5d8;
	border-style: solid;
	padding: 10px;
	background-color: #bbdfc8;
	border-radius: 20px;
	color: '#000000';
	@media (max-width: 768px) {
		width: ${mobileWidth};
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
	margin-top: -93px;
	margin-left: 150px;
	font-size: 18px;
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
		font-size: 12px;
	}
	@media only screen and (min-width: 376px) and (max-width: 712px) {
		font-size: 14px;
		margin-left: 16px;
	}
	font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
`;

export const WeatherData = styled.div`
	margin-top: 15px;
	margin-left: 150px;
	font-size: 17px;
`;

export const DangerLogo = styled.img.attrs((props) => ({
	src: props.src,
}))`
	display: block;
	margin: 0 auto;
	width: 140px;
`;

export const CitiesContainer = styled.span`
	height: 40px;
	display: flex;
	border-radius: 6px;
	overflow-y: hidden;
	overflow-x: auto;
	scroll-behavior: smooth;
`;

export const CityButton = styled.span`
	height: 20px;
	background: #8ad4c1;
	border: 0.5px solid #f0e5d8;
	margin-right: 5px;
	border-radius: 6px;
	white-space: nowrap;
	padding-left: 4px;
	padding-right: 4px;
	font-size: 16px;
	cursor: pointer;
`;

import styled, { createGlobalStyle } from 'styled-components';

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
	margin-left: 3px;
	border-color: #f0e5d8;
	background-color: #fce1be;
	border-style: solid;
	border-radius: 20px;
	width: 83px;
`;

export const SpinnerLogo = styled.img.attrs((props) => ({
	src: props.src,
}))`
	display: block;
	margin: 0 auto;
`;

export const WeatherCard = styled.div`
	border-color: #f0e5d8;
	border-style: solid;
	padding: 10px;
	background-color: #bbdfc8;
	border-radius: 20px;
	color: '#000000';
`;

export const LogoApp = styled.img.attrs((props) => ({
	src: props.src,
}))`
	margin-bottom: -5px;
	width: 385px;
`;

export const TitleApp = styled.div`
	text-align: center;
`;

export const Subtitle = styled.h2``;

export const WeatherMain = styled.div`
	margin-top: -93px;
	margin-left: 117px;
	font-size: 19px;
`;

export const WeatherMainTemperature = styled.code`
	font-size: 23px;
	font-weight: bold;
`;

export const BreakLine = styled.br``;

export const Code = styled.code`
	font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
`;

export const WeatherData = styled.div`
	margin-top: 15px;
	margin-left: 117px;
	font-size: 17px;
`;

export const DangerLogo = styled.img.attrs((props) => ({
	src: props.src,
}))`
	display: block;
	margin: 0 auto;
	width: 140px;
`;

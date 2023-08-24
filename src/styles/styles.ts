import styled, { createGlobalStyle } from 'styled-components';

import { Colors } from './colors';

let desktopWidth = 540 + 'px';
let desktopHeight = 605 + 'px';
let mobileWidth = window.innerWidth * 0.85 + 'px';
let mobileHeightSmallDisplay = '508px';
let mobileHeightBigDisplay = '580px';

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

export const WeatherIcon = styled.img.attrs((props: { src: any; }) => ({
	src: props.src,
}))`
	display: inline-block;
	margin-right: auto;
	margin-left: 40px;
	margin-top: 10px;
	border-color: ${Colors.lightWhite};
	background-color: ${Colors.lightOrange};
	border-style: solid;
	border-radius: 20px;
	@media (max-width: 768px) {
		margin-top: 20px;
		margin-left: 10px;
	}
	@media only screen and (max-width: 375px) {
		margin-top: 0px;
		margin-left: 1px;
		width: 84px;
	}
	@media only screen and (min-width: 376px) and (max-width: 712px) {
		margin-top: 4px;
		margin-left: 4px;
	}
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
		margin-top: 2px;
		margin-left: 2px;
	}
	@media only screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) {
		width: 90px;
		margin-left: 0px;
	}
	@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
		margin-top: 2px;
		margin-left: -3px;
		width: 88px;
	}
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
		margin-top: 6px;
		margin-left: 2px;
	}
	width: 102px;
`;

export const SpinnerLogo = styled.img.attrs((props: { src: any; }) => ({
	src: props.src,
}))`
	width: 30%;
	display: block;
	margin: 0 auto;
	@media (max-width: 768px) {
		width: 90%;
	}
`;

export const WeatherCard = styled.div<{ isSmallMobileDevice: boolean, isMobileDevice: boolean, isDesktopOrLaptop: boolean }>`
	border-color: ${Colors.lightWhite};
	border-style: solid;
	padding: 10px;
	background-color: ${Colors.lightGreen};
	border-radius: 20px;
	color: ${Colors.black};
	word-wrap: break-word;
	width: ${({ isDesktopOrLaptop }) => isDesktopOrLaptop ? desktopWidth : mobileWidth};
	height: ${({ isSmallMobileDevice }) => isSmallMobileDevice && mobileHeightSmallDisplay};
	height: ${({ isMobileDevice }) => isMobileDevice && mobileHeightBigDisplay};
	height: ${({ isDesktopOrLaptop }) => isDesktopOrLaptop && desktopHeight};
`;

export const LocationNotFoundIcon = styled.img.attrs((props: { src: any; }) => ({
	src: props.src,
}))`
	display: block;
	margin-left: auto;
	margin-right: auto;
	@media (max-width: 768px) {
		width: 295px;
	}
	@media only screen and (max-width: 375px) {
		width: 320px;
		margin-top: 15px;
		margin-bottom: 30px;
	}
	@media only screen and (min-width: 376px) and (max-width: 712px) {
		width: 360px;
		margin-top: 15px;
		margin-bottom: 58px;
	}
	@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
		margin-bottom: 9px;
	}
	@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
		margin-bottom: 44px;
	}
	width: 402px;
`;

export const LocationNotFoundCode = styled.code`
	display: flex;
	justify-content: center;
	text-align: center;
	overflow-wrap: break-word;
	-webkit-hyphens: auto;
	-ms-hyphens: auto;
	hyphens: auto;
	@media only screen and (max-width: 375px) {
		font-size: 11px;
	}
	@media only screen and (min-width: 376px) and (max-width: 712px) {
		font-size: 12px;
	}
	@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
		font-size: 10px;
	}
	@media only screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) {
		margin-top: -1px;
		font-size: 11px;
	}
	font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
`;

export const LogoApp = styled.img.attrs((props: { src: any; }) => ({
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
		width: 275px;
	}
	@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
		width: 176px;
	}
	width: 276px;
`;

export const TitleApp = styled.div`
	text-align: center;
	cursor: default;
`;

export const Subtitle = styled.h2`
	font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
	font-size: 19px;
	margin-left: 5px;
	@media only screen and (max-width: 375px) {
		font-size: 14px;
	}
	@media only screen and (min-width: 376px) and (max-width: 712px) {
		font-size: 14px;
	}
	@media only screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) {
		font-size: 14px;
	}
	@media only screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) {
		font-size: 14px;
	}
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
		font-size: 14px;
	}
	@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
		font-size: 14px;
	}
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
		font-size: 14px;
	}
`;

export const WeatherMain = styled.div`
	margin-top: -112px;
	margin-left: 175px;
	font-size: 16px;
	cursor: default;
	@media (max-width: 768px) {
		margin-top: -118px;
		margin-left: 132px;
	}
	@media only screen and (max-width: 375px) {
		margin-top: -102px;
		margin-left: 103px;
	}
	@media only screen and (min-width: 376px) and (max-width: 712px) {
		margin-top: -112px;
		margin-left: 126px;
	}
	@media only screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) {
		margin-top: -112px;
	}
	@media only screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) {
		margin-top: -106px;
		margin-left: 110px;
	}
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
		margin-top: -112px;
		margin-left: 125px;
	}
	@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
		margin-top: -104px;
		margin-left: 106px;
	}
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
		margin-top: -112px;
		margin-left: 125px;
	}
`;

export const WeatherMainTemperature = styled.code`
	margin-left: -5px;
	font-size: 23px;
	font-weight: bold;
`;

export const BreakLine = styled.br``;

export const Code = styled.code`
	margin-left: -5px;
	@media only screen and (max-width: 375px) {
		font-size: 11px;
	}
	@media only screen and (min-width: 376px) and (max-width: 712px) {
		font-size: 11px;
	}
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
		font-size: 11px;
	}
	@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
		font-size: 11px;
	}
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
		font-size: 11px;
	}
	font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
`;

export const WeatherData = styled.div`
	margin-top: 15px;
	margin-left: 175px;
	font-size: 16px;
	cursor: default;
	@media (max-width: 768px) {
		margin-left: 132px;
	}
	@media only screen and (max-width: 375px) {
		margin-left: 103px;
	}
	@media only screen and (min-width: 376px) and (max-width: 712px) {
		margin-left: 127px;
	}
	@media only screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) {
		margin-left: 110px;
	}
	@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
		margin-left: 106px;
	}
`;

export const DangerLogo = styled.img.attrs((props: { src: any; }) => ({
	src: props.src,
}))`
	display: block;
	margin: 0 auto;
	width: 140px;
`;

export const SearchBarContainer = styled.div`
	height: 40px;
`;

export const CleanSearchBarContainer = styled.div`
	display: flex;
	position: absolute;
	width: 7.5%;
	height: 6.2%;
	top: 2.2%;
	left: 89.5%;
	border-radius: 10px;
	border: 1px solid ${Colors.lightWhite};
	background-color: ${Colors.lightOrange};
	color:  ${Colors.black};
	justify-content: center;
	align-items: center;
	cursor: pointer;
	&:hover {
		background-color: ${Colors.lightWhite};
		color: ${Colors.wateryGreenToneDown};
	}
	@media only screen and (max-width: 375px) {
		left: 88.6%;
		top: 2.4%;
		height: 7.1%;
	}
	@media only screen and (min-width: 376px) and (max-width: 712px) {
		left: 89%;
	}
	@media only screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) {
		left: 89%;
	}
	@media only screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) {
		left: 89%;
	}
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
		left: 89%;
	}
	@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
		left: 89%;
		top: 2.4%;
		height: 6.9%;
	}
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
		left: 89%;
	}
`;

export const CleanSearchBarButton = styled.span`
	font-size: 20px;
	font-weight: bold;
`;

export const LanguagesContainer = styled.div`
	display: flex;
	left: 32%;
	bottom: 3.5%;
	position: absolute;
	@media only screen and (max-width: 375px) {
		left: 20%;
	}
	@media only screen and (min-width: 376px) and (max-width: 712px) {
		left: 25%;
	}
	@media only screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) {
		left: 22%;
	}
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
		left: 25%;
	}
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
		left: 25%;
	}
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

export const SocialNetworkIconContainer = styled.span<{ isDesktopOrLaptop: boolean }>`
	display: flex;
	position: absolute;
	bottom: 2.5%;
	left: ${({ isDesktopOrLaptop }) => isDesktopOrLaptop ? '89%' : '86%'};
`;

export const SocialNetworkIcon = styled.image`
	width: 40px;
	height: 40px;
	background-size: contain;
	cursor: pointer;
	background-image: url(${(props: { mouseOver: any; regular: any; hover: any; }) => (!props.mouseOver ? props.regular : props.hover)});
	&:hover {
		background-image: url(${(props: { hover: any; }) => props.hover});
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
	background-image: url(${(props: { mouseOver: any; regular: any; hover: any; }) => (!props.mouseOver ? props.regular : props.hover)});
	&:hover {
		background-image: url(${(props: { hover: any; }) => props.hover});
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

export const MoreInfoButton = styled.span`
	cursor: pointer;
	text-decoration: underline;
	font-size: 16px;
	@media only screen and (max-width: 375px) {
		font-size: 11px;
	}
	@media only screen and (max-width: 375px) {
		font-size: 11px;
	}
	@media only screen and (min-width: 376px) and (max-width: 712px) {
		font-size: 11px;
	}
	@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
		font-size: 10px;
	}
	@media only screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) {
		font-size: 11px;
	}
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
		font-size: 11px;
	}
	font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
	&:hover {
		color: ${Colors.yellowLemon};
	}
`;

export const AirPollutionItemLegendIcon = styled.span`
	width: 30px;
	height: 30px;
	background-color: ${(props: { color: any; }) => props.color};
	border-radius: 25px;
`;

export const AirPollutionLegendText = styled.code`
	margin-left: 4px;
	margin-right: 12px;
	@media only screen and (max-width: 375px) {
		font-size: 10px;
	}
	@media only screen and (min-width: 376px) and (max-width: 712px) {
		font-size: 11px;
	}
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
		font-size: 10px;
	}
	@media only screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) {
		font-size: 11px;
	}
	@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
		font-size: 10px;
	}
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
		font-size: 10px;
	}
`;

export const AirPollutionItemContainer = styled.div`
	margin-top: 40px;
	display: flex;
	align-items: center;
	@media only screen and (max-width: 375px) {
		font-size: 13px;
	}
	@media only screen and (min-width: 376px) and (max-width: 712px) {
		font-size: 13px;
	}
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
		font-size: 13px;
	}
	@media only screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) {
		font-size: 13px;
	}
	@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
		font-size: 13px;
	}
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
		font-size: 13px;
	}
`;

export const AirPollutionItemSpan = styled.span`
	width: 30px;
	height: 30px;
	background-color: ${(props: { color: any; }) => props.color};
	border-radius: 25px;
	margin-left: 10px;
	@media only screen and (max-width: 375px) {
		width: 25px;
		height: 25px;
	}
	@media only screen and (min-width: 376px) and (max-width: 712px) {
		width: 25px;
		height: 25px;
	}
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
		width: 25px;
		height: 25px;
	}
	@media only screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) {
		width: 25px;
		height: 25px;
	}
	@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
		width: 25px;
		height: 25px;
	}
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
		width: 25px;
		height: 25px;
	}
`;

export const UnitsContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 100;
	font-size: 16px;
	gap: 1rem;
	margin-top: 1rem;
	margin-top: 1rem;
`;

export const UnitSpan = styled.span<{ isSelected: boolean }>`
	cursor: pointer;
	text-decoration: underline;
	font-weight: ${({ isSelected }) => isSelected && '700'};
	color: lemon;
	color: ${({ isSelected }) => isSelected && Colors.yellowLemon};
	&:hover {
	color: ${Colors.yellowLemon};
}
`;

import styled, { createGlobalStyle } from 'styled-components';

import { Colors } from './colors';

let desktopWidth = 540 + 'px';
let desktopHeight = 610 + 'px';
let mobileWidth = window.innerWidth * 0.85 + 'px';
let mobileHeightSmallDisplay = '530px';
let mobileHeightBigDisplay = '570px';


export const GlobalStyle = createGlobalStyle`
	body {
		margin: 0;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-right: -50%;
		transform: translate(-50%, -50%);
		background-color: ${Colors.wateryGreen};
}
`;


export const WeatherIconContainer = styled.div`
	display: flex;
    width: 70%;
    justify-content: flex-end;
`;

export const WeatherIcon = styled.img.attrs((props: { src: any; }) => ({
	src: props.src,
}))`
	width: 5em;
	border-color: ${Colors.whiteChocolate};
	background-color: ${Colors.veryPaleOrange};
	border-style: solid;
	border-radius: 20px;
	box-shadow: 2px 2px 6px 1px ${Colors.sonicSilver};
`;

export const SpinnerLogo = styled.img<{ src: any; isDesktopOrLaptop: boolean, isMobileDevice: boolean, isSmallMobileDevice: boolean }>`
	src: src;
	width: ${({ isDesktopOrLaptop }) => isDesktopOrLaptop && '30%'};
	width: ${({ isMobileDevice }) => isMobileDevice && '70%'};
	width: ${({ isSmallMobileDevice }) => isSmallMobileDevice && '90%'};
	display: block;
	margin: 0 auto;
`;

export const WeatherCard = styled.div<{ isSmallMobileDevice: boolean, isMobileDevice: boolean, isDesktopOrLaptop: boolean }>`
	border-color: ${Colors.whiteChocolate};
	border-style: solid;
	padding: 10px;
	background-color: ${Colors.jetStream};
	border-radius: 20px;
	color: ${Colors.black};
	word-wrap: break-word;
	width: ${({ isDesktopOrLaptop }) => isDesktopOrLaptop ? desktopWidth : mobileWidth};
	height: ${({ isSmallMobileDevice }) => isSmallMobileDevice && mobileHeightSmallDisplay};
	height: ${({ isMobileDevice }) => isMobileDevice && mobileHeightBigDisplay};
	height: ${({ isDesktopOrLaptop }) => isDesktopOrLaptop && desktopHeight};
	box-shadow: 2px 2px 12px 2px ${Colors.darkCharcoal};
`;

export const LocationNotFoundContainer = styled.div<{ isSmallMobileDevice: boolean, isMobileDevice: boolean, isDesktopOrLaptop: boolean }>`
	display: flex;
	flex-direction: column;
    width: 100%;
	justify-content: center;
	align-items: center;
    background-color: seashell;
	margin-top: ${({ isDesktopOrLaptop }) => isDesktopOrLaptop && '20px'};
	margin-top: ${({ isMobileDevice }) => isMobileDevice && '30px'};
	margin-top: ${({ isSmallMobileDevice }) => isSmallMobileDevice && '20px'};
	margin-bottom: ${({ isDesktopOrLaptop }) => isDesktopOrLaptop && '20px'};
	margin-bottom: ${({ isMobileDevice }) => isMobileDevice && '30px'};
	margin-bottom: ${({ isSmallMobileDevice }) => isSmallMobileDevice && '40px'};
`;

export const LocationNotFoundIcon = styled.img<{ src: any; isSmallMobileDevice: boolean, isMobileDevice: boolean, isDesktopOrLaptop: boolean }>`
	width: ${({ isDesktopOrLaptop }) => isDesktopOrLaptop && '400px'};
	width: ${({ isMobileDevice }) => isMobileDevice && '360px'};
	width: ${({ isSmallMobileDevice }) => isSmallMobileDevice && '320px'};
`;

export const LocationNotFoundCode = styled.code<{ isSmallMobileDevice: boolean, isMobileDevice: boolean }>`
	display: flex;
	background-color: chocolate;
	width: 100%;
	justify-content: center;
	text-align: center;
	overflow-wrap: break-word;
	-webkit-hyphens: auto;
	-ms-hyphens: auto;
	hyphens: auto;
	font-size: ${({ isMobileDevice, isSmallMobileDevice }) => (isMobileDevice || isSmallMobileDevice) && '13px'};
`;

export const LogoApp = styled.img<{ src: any; isDesktopOrLaptop: boolean, isMobileDevice: boolean, isSmallMobileDevice: boolean }>`
	src: src;
	margin-top: 10px;
	display: block;
	margin-left: auto;
	margin-right: auto;
	width: ${({ isDesktopOrLaptop }) => isDesktopOrLaptop && '300px'};
	width: ${({ isMobileDevice }) => isMobileDevice && '265px'};
	width: ${({ isSmallMobileDevice }) => isSmallMobileDevice && '190px'};
`;

export const TitleApp = styled.div`
	text-align: center;
	cursor: default;
`;

export const Subtitle = styled.h2<{ isDesktopOrLaptop: boolean, isMobileDevice: boolean, isSmallMobileDevice: boolean }>`
	font-size: ${({ isDesktopOrLaptop }) => isDesktopOrLaptop && '20px'};
	font-size: ${({ isMobileDevice, isSmallMobileDevice }) => (isMobileDevice || isSmallMobileDevice) && '14px'};
`;

export const WeatherMain = styled.div`
	font-size: 16px;
	width: 100%;
	text-align: start;
	cursor: default;
`;

export const AllDataContainer = styled.div<{ isDesktopOrLaptop: boolean, isMobileDevice: boolean, isSmallMobileDevice: boolean }>`
	display: flex;
    flex-direction: column;
	gap: ${({ isDesktopOrLaptop }) => isDesktopOrLaptop && '14px'};
	gap: ${({ isMobileDevice }) => isMobileDevice && '18px'};
	gap: ${({ isSmallMobileDevice }) => isSmallMobileDevice && '20px'};
`;

export const WeatherMainContainer = styled.div`
	display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 15px;
`;

export const WeatherMainTemperature = styled.code`
	font-size: 23px;
	font-weight: bold;
`;

export const ColumnContainer = styled.div`
	display: flex;
	flex-direction: column;
`

export const BreakLine = styled.br``;

export const Code = styled.code<{ isMobileDevice: boolean, isSmallMobileDevice: boolean }>`
	font-size: ${({ isMobileDevice, isSmallMobileDevice }) => (isMobileDevice || isSmallMobileDevice) && '12px'};
`;


export const WeatherDataContainer = styled.div`
	display: flex;
    justify-content: center;
`;

export const WeatherData = styled.div`
	font-size: 16px;
	text-align: start;
	cursor: default;
`;

export const DangerLogo = styled.img.attrs((props: { src: any; }) => ({
	src: props.src,
}))`
	display: block;
	margin: 0 auto;
	width: 140px;
`;

export const SearchBarContainer = styled.div`
	display: flex;
`;

export const CleanSearchBarContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;

export const CleanSearchBarButtonContainer = styled.div`
	display: flex;
	width: 2.5rem;
	border-radius: 10px;
	border: 1px solid ${Colors.whiteChocolate};
	background-color: ${Colors.veryPaleOrange};
	color:  ${Colors.black};
	justify-content: center;
	align-items: center;
	cursor: pointer;
	box-shadow: 2px 2px 6px 1px ${Colors.sonicSilver};
	&:hover {
		background-color: ${Colors.whiteChocolate};
		color: ${Colors.pearlAqua};
		box-shadow: 2px 2px 6px 1px ${Colors.darkCharcoal};
	}
`;

export const CleanSearchBarButton = styled.span`
	font-size: 20px;
	font-weight: bold;
`;

export const LanguagesContainer = styled.div<{ isMobileDevice: boolean; isSmallMobileDevice: boolean }>`
	display: flex;
	justify-content: center;
	text-align: center;
	gap: 30px;
	font-size:  ${({ isMobileDevice, isSmallMobileDevice }) => (isMobileDevice || isSmallMobileDevice) && '13px'};
`;

export const LanguageButton = styled.span`
	display: flex;
	text-decoration: underline;
	align-items: center;
	white-space: nowrap;
	cursor: pointer;
	&:hover {
		color: ${Colors.yellowSun};
	}
`;

export const LanguageAndSocialNetworkContainer = styled.div`
    display: flex;
	width: 100%;
    align-items: center;
    justify-content: center;
`;

export const SocialNetworkIconContainer = styled.span<{ isDesktopOrLaptop: boolean }>`
	display: flex;
	position: absolute;
	left: ${({ isDesktopOrLaptop }) => isDesktopOrLaptop ? '90%' : '86%'};
`;

export const SocialNetworkIcon = styled.image<{ mouseOver: any; regular: any; hover: any; isDesktopOrLaptop: boolean; isMobileDevice: boolean; isSmallMobileDevice: boolean }>`
	width: 30px;
	height: 30px;
	background-size: contain;
	cursor: pointer;
	width:  ${({ isDesktopOrLaptop }) => isDesktopOrLaptop && '30px'};
	height:  ${({ isDesktopOrLaptop }) => isDesktopOrLaptop && '30px'};
	width:  ${({ isMobileDevice, isSmallMobileDevice }) => (isMobileDevice || isSmallMobileDevice) && '25px'};
	height:  ${({ isMobileDevice, isSmallMobileDevice }) => (isMobileDevice || isSmallMobileDevice) && '25px'};
	background-image: url(${(props) => (props.mouseOver ? props.hover : props.regular)});
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
		color: ${Colors.yellowSun};
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
`;

export const NetworkMapContainer = styled.div`
	display: 'flex';
	flex-direction: 'row';
	padding-top: 15px;
	padding-bottom: 5px;
`;

export const SocialNetworkName = styled.span`
	font-size: 15px;
	font-weight: bold;
	cursor: default;
	color: ${Colors.darkSlateGray};
`;

export const SocialNetworkItem = styled.a`
	font-size: 15px;
	font-weight: bold;
	text-decoration: underline;
	cursor: pointer;
	color: ${Colors.darkSlateGray};
	&:hover {
		color: ${Colors.yellowSun};
	}
`;

export const AirQualitySectionContainer = styled.div`
	display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 7px;
`;

export const MoreInfoButton = styled.div<{ isDesktopOrLaptop: boolean; isMobileDevice: boolean; isSmallMobileDevice: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
    border-radius: 50px;
	height: ${({ isDesktopOrLaptop }) => isDesktopOrLaptop && '15px'};
	width: ${({ isDesktopOrLaptop }) => isDesktopOrLaptop && '15px'};
	font-size: ${({ isDesktopOrLaptop }) => isDesktopOrLaptop && '16px'};
	border: ${({ isDesktopOrLaptop }) => isDesktopOrLaptop && `solid 2px ${Colors.black};`};
	height: ${({ isMobileDevice }) => isMobileDevice && '13px'};
	width: ${({ isMobileDevice }) => isMobileDevice && '13px'};
	font-size: ${({ isMobileDevice }) => isMobileDevice && '13px'};
	border: ${({ isMobileDevice }) => isMobileDevice && `solid 1px ${Colors.black};`};
	height: ${({ isSmallMobileDevice }) => isSmallMobileDevice && '10px'};
	width: ${({ isSmallMobileDevice }) => isSmallMobileDevice && '10px'};
	font-size: ${({ isSmallMobileDevice }) => isSmallMobileDevice && '10px'};
	border: ${({ isSmallMobileDevice }) => isSmallMobileDevice && `solid 1px ${Colors.black};`};
	&:hover {
		border-color: ${Colors.yellowSun};
		color: ${Colors.yellowSun};
	}
`;

export const AirPollutionLegendDesktopContainer = styled.div`
	margin-top: 45px;
	margin-bottom: 65px;
`;

export const AirPollutionLegendDesktopSubContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
    align-items: center;
	gap: 6px;
`;

export const AirPollutionLegendMobileContainer = styled.div`
	display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
    gap: 8px;
`;

export const AirPollutionLegendMobileSubContainer = styled.div`
	display: flex;
	justify-content: center;
    align-items: center;
	gap: 10px;
	font-size: 13px;
`;

export const AirPollutionItemLegendIcon = styled.span`
	width: 30px;
	height: 30px;
	background-color: ${(props: { color: any; }) => props.color};
	border-radius: 25px;
`;

export const AirPollutionItemContainer = styled.div<{ isSmallMobileDevice: boolean, isMobileDevice: boolean, isDesktopOrLaptop: boolean }>`
	display: flex;
	align-items: center;
	gap: 10px;
	margin-top: ${({ isDesktopOrLaptop }) => isDesktopOrLaptop && '40px'};
	margin-top: ${({ isMobileDevice }) => isMobileDevice && '35px'};
	margin-top: ${({ isSmallMobileDevice }) => isSmallMobileDevice && '30px'};
	font-size:  ${({ isMobileDevice, isSmallMobileDevice }) => (isMobileDevice || isSmallMobileDevice) && '13px'};
`;

export const AirPollutionItemSpan = styled.span`
	width: 30px;
	height: 30px;
	background-color: ${(props: { color: any; }) => props.color};
	border-radius: 25px;
`;

export const CenteredContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const FooterContainer = styled.div<{ isDesktopOrLaptop: boolean; isMobileDevice: boolean; isSmallMobileDevice: boolean }>`
    display: flex;
    flex-direction: column;
	gap: ${({ isDesktopOrLaptop }) => isDesktopOrLaptop && '10px'};
	gap: ${({ isMobileDevice, isSmallMobileDevice }) => (isMobileDevice || isSmallMobileDevice) && '25px'};
	margin-top: ${({ isDesktopOrLaptop }) => isDesktopOrLaptop && '15px'};
	margin-top: ${({ isMobileDevice, isSmallMobileDevice }) => (isMobileDevice || isSmallMobileDevice) && '35px'};
`;

export const UnitsContainer = styled.div<{ isDesktopOrLaptop: boolean; isMobileDevice: boolean; isSmallMobileDevice: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
	background-color: ${Colors.darkCyan};
	border-radius: 6px;
	box-shadow: 2px 2px 6px 1px ${Colors.sonicSilver};
	margin-top: ${({ isDesktopOrLaptop }) => isDesktopOrLaptop && '6px'};
	margin-top: ${({ isMobileDevice, isSmallMobileDevice }) => (isMobileDevice || isSmallMobileDevice) && '15px'};
`;

export const UnitsSubContainer = styled.div<{ isMobileDevice: boolean; isSmallMobileDevice: boolean }>`
	display: flex;
	font-size: 16px;
	gap: 30px;
	font-size:  ${({ isMobileDevice, isSmallMobileDevice }) => (isMobileDevice || isSmallMobileDevice) && '13px'};
`;

export const UnitSpan = styled.span<{ isSelected: boolean }>`
	cursor: pointer;
	text-decoration: underline;
	font-weight: ${({ isSelected }) => isSelected && '700'};
	color: lemon;
	color: ${({ isSelected }) => isSelected && Colors.menthol};
	&:hover {
		color: ${Colors.yellowSun};
	}
`;

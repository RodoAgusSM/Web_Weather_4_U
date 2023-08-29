import styled from 'styled-components';
import { Colors } from 'styles/colors';

export const TitleApp = styled.div`
	text-align: center;
	margin-top: 1.5rem;
	cursor: default;
`;

export const Subtitle = styled.h2<{ isDesktopOrLaptop: boolean, isMobileDevice: boolean, isSmallMobileDevice: boolean }>`
	font-size: ${({ isDesktopOrLaptop }) => isDesktopOrLaptop && '28px'};
	font-size: ${({ isMobileDevice, isSmallMobileDevice }) => (isMobileDevice || isSmallMobileDevice) && '24px'};
	font-weight: bolder;
	filter: drop-shadow(3px 3px 2px ${Colors.darkCharcoal});
`;

export const LogoApp = styled.img<{ src: any; isDesktopOrLaptop: boolean, isMobileDevice: boolean, isSmallMobileDevice: boolean }>`
	src: src;
	margin-top: 10px;
	display: block;
	margin-left: auto;
	margin-right: auto;
	width: ${({ isDesktopOrLaptop }) => isDesktopOrLaptop && '250px'};
	width: ${({ isMobileDevice }) => isMobileDevice && '265px'};
	width: ${({ isSmallMobileDevice }) => isSmallMobileDevice && '190px'};
`;

export const WeatherIconContainer = styled.div`
	display: flex;
    justify-content: flex-end;
`;

export const WeatherIcon = styled.img.attrs((props: { src: any; }) => ({
    src: props.src,
}))`
	width: 5rem;
	border-color: ${Colors.whiteChocolate};
	background-color: ${Colors.veryPaleOrange};
	border-style: solid;
	border-radius: 50px;
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

export const AllDataContainer = styled.div<{ isDesktopOrLaptop: boolean, isMobileDevice: boolean, isSmallMobileDevice: boolean }>`
	display: flex;
    flex-direction: column;
	gap: ${({ isDesktopOrLaptop }) => isDesktopOrLaptop && '2rem'};
	gap: ${({ isMobileDevice }) => isMobileDevice && '1.75rem'};
	gap: ${({ isSmallMobileDevice }) => isSmallMobileDevice && '1.25rem'};
`;

export const WeatherMainContainer = styled.div`
	display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 15px;
	//border-radius: 8px;
	//background-color: ${Colors.pearlAqua};
	//box-shadow: 2px 2px 6px 1px ${Colors.sonicSilver};
`;

export const WeatherMain = styled.div`
	font-size: 16px;
	text-align: start;
	cursor: default;
	//padding: 8px;
	//border-radius: 8px;
	//background-color: ${Colors.pearlAqua};
	//box-shadow: 2px 2px 6px 1px ${Colors.sonicSilver};
`;

export const WeatherMainTemperature = styled.code`
	font-size: 23px;
	font-weight: bolder;
`;

export const WeatherMainData = styled.code<{ isDesktopOrLaptop: boolean; isMobileDevice: boolean, isSmallMobileDevice: boolean }>`
	font-weight: 600;
	font-size: ${({ isDesktopOrLaptop }) => isDesktopOrLaptop && '18px'};
	font-size: ${({ isMobileDevice, isSmallMobileDevice }) => (isMobileDevice || isSmallMobileDevice) && '14px'};
`;

export const WeatherDataContainer = styled.div`
	display: flex;
    justify-content: center;
`;

export const WeatherData = styled.div`
	display: flex;
	flex-direction: column;
	font-size: 16px;
	text-align: start;
	gap: 0.25rem;
	cursor: default;
	background-color: ${Colors.pearlAqua};
	padding: 12px;
	border-radius: 8px;
	box-shadow: 2px 2px 6px 1px ${Colors.sonicSilver};
`;

export const AirQualitySectionContainer = styled.div`
	display: flex;
    flex-direction: row;
    justify-content: flex-start;
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

export const UnitsContainer = styled.div<{ isDesktopOrLaptop: boolean; isMobileDevice: boolean; isSmallMobileDevice: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
	background-color: ${Colors.darkCyan};
	border-radius: 6px;
	box-shadow: 2px 2px 6px 1px ${Colors.sonicSilver};
	margin-top: ${({ isDesktopOrLaptop }) => isDesktopOrLaptop && '0.75rem'};
	margin-top: ${({ isMobileDevice, isSmallMobileDevice }) => (isMobileDevice || isSmallMobileDevice) && '0.75rem'};
	padding: 4px 0px 4px 0px;
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

export const FooterContainer = styled.div<{ isDesktopOrLaptop: boolean; isMobileDevice: boolean; isSmallMobileDevice: boolean }>`
    display: flex;
    flex-direction: column;
	gap: ${({ isDesktopOrLaptop }) => isDesktopOrLaptop && '1.25rem'};
	gap: ${({ isMobileDevice, isSmallMobileDevice }) => (isMobileDevice || isSmallMobileDevice) && '20px'};
	margin-top: ${({ isDesktopOrLaptop }) => isDesktopOrLaptop && '2rem'};
	margin-top: ${({ isMobileDevice, isSmallMobileDevice }) => (isMobileDevice || isSmallMobileDevice) && '30px'};
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
	filter: drop-shadow(2px 2px 1px ${Colors.darkCharcoal});
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

export const LocationNotFoundContainer = styled.div<{ isDesktopOrLaptop: boolean, isMobileDevice: boolean, isSmallMobileDevice: boolean }>`
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

export const LocationNotFoundIcon = styled.img<{ src: any; isDesktopOrLaptop: boolean, isMobileDevice: boolean, isSmallMobileDevice: boolean }>`
	width: ${({ isDesktopOrLaptop }) => isDesktopOrLaptop && '400px'};
	width: ${({ isMobileDevice }) => isMobileDevice && '360px'};
	width: ${({ isSmallMobileDevice }) => isSmallMobileDevice && '320px'};
`;

export const DangerLogo = styled.img.attrs((props: { src: any; }) => ({
    src: props.src,
}))`
	display: block;
	margin: 0 auto;
	width: 140px;
`;

export const BreakLine = styled.br``;
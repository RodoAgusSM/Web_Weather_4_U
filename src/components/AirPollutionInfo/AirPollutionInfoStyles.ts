import styled from 'styled-components';
import { Colors } from 'styles/colors';

export const AirPollutionItemContainer = styled.div<{ isDesktopOrLaptop: boolean, isMobileDevice: boolean, isSmallMobileDevice: boolean }>`
	display: flex;
	align-items: center;
	gap: 10px;
	margin-top: ${({ isDesktopOrLaptop }) => isDesktopOrLaptop && '20px'};
	margin-top: ${({ isMobileDevice }) => isMobileDevice && '22px'};
	margin-top: ${({ isSmallMobileDevice }) => isSmallMobileDevice && '18px'};
	font-size:  ${({ isMobileDevice, isSmallMobileDevice }) => (isMobileDevice || isSmallMobileDevice) && '13px'};
	background-color:  ${({ isDesktopOrLaptop }) => isDesktopOrLaptop && `${Colors.menthol}`};
	border-radius: 8px;
	padding: ${({ isDesktopOrLaptop }) => isDesktopOrLaptop && '8px'};
	box-shadow: ${({ isDesktopOrLaptop }) => isDesktopOrLaptop && `2px 2px 6px 1px ${Colors.sonicSilver}`};
`;

export const AirPollutionItemSpan = styled.span<{ color: string }>`
	width: 30px;
	height: 30px;
	background-color: ${({ color }) => color};
	border-radius: 25px;
	box-shadow: 2px 2px 6px 1px ${Colors.sonicSilver};
`;

export const AirPollutionLegendDesktopContainer = styled.div`
	margin-top: 45px;
	margin-bottom: 60px;
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
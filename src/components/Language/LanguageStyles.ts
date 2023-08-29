import styled from 'styled-components';
import { Colors } from 'styles/colors';

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
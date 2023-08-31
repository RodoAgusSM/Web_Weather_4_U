import { ToastContainer } from 'react-toastify';
import styled, { css, keyframes } from 'styled-components';

const expand = keyframes`
	from {
		width: 20%;
	}
	to {
		width: 100%;
	}
`;

const generateCompressAnimation = (widthValue: string) => keyframes`
	from {
		width: 100%;
	}
	to {
		width: ${widthValue};
	}
`;

export const SearchBarWrapper = styled.div`
	display: flex;
	flex-direction: column;
    align-items: center;
`;

export const SearchBarContainer = styled.div<{ $isDesktopOrLaptop: boolean; $isMobileDevice: boolean; $isSmallMobileDevice: boolean, $openSearchBar: boolean | null }>`
	width:  ${({ $isDesktopOrLaptop, $openSearchBar }) => $isDesktopOrLaptop && !$openSearchBar && '8%'};
	width:  ${({ $isMobileDevice, $isSmallMobileDevice, $openSearchBar }) => ($isMobileDevice || $isSmallMobileDevice) && !$openSearchBar && '12%'};
	width:  ${({ $openSearchBar }) => $openSearchBar && '100%'};
	cursor: pointer;
	height:40%;
	transform-origin: 50% 50%;
	${({ $openSearchBar }) =>
		$openSearchBar &&
		css`
		animation: ${expand} 1s linear forwards;
	`};
	${({ $openSearchBar, $isDesktopOrLaptop, $isMobileDevice, $isSmallMobileDevice }) =>
		$openSearchBar === false &&
		(($isDesktopOrLaptop && css`
		animation: ${generateCompressAnimation('8%')} 1s linear forwards;
	`) ||
			(($isMobileDevice || $isSmallMobileDevice) && css`
		animation: ${generateCompressAnimation('12%')} 1s linear forwards;
	`))};
`;

export const StyledToastContainer = styled(ToastContainer)`
  border-radius: 10px;
  padding: 10px;
  filter: drop-shadow(3px 3px 2px rgba(35, 31, 32, 0.7)); /* Replace with your preferred color */
`;
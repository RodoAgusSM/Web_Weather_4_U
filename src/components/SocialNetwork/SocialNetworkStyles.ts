import styled from 'styled-components';
import { Colors } from 'styles/colors';

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
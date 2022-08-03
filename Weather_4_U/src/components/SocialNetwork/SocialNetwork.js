import React, { useState } from 'react';
import {
	GlobalStyle,
	WeatherCard,
	MiInfo,
	SocialNetworkName,
	SocialNetworkItem,
	NetworkContainer,
	NetworkMapContainer,
	MiInfoContainer,
	BackContainer,
	BackIcon,
} from '../../styles/styles';
import { findLanguageByKey } from '../../languages/Languages';
import { useNavigate, useLocation } from 'react-router-dom';
import back_icon from '../../imgs/back_icon.png';
import back_icon_hover from '../../imgs/back_icon_hover.png';

const SocialNetwork = () => {
	let navigate = useNavigate();
	const { state } = useLocation();
	const { actualLanguage, actualCity } = state;
	const [mouseOver, setMouseOver] = useState(false);

	const fullLanguage = findLanguageByKey(actualLanguage);
	const socialNetworks = fullLanguage.socialNetworks;
	return (
		<>
			<GlobalStyle />
			<WeatherCard>
				<BackContainer
					onMouseEnter={() => setMouseOver(true)}
					onMouseLeave={() => setMouseOver(false)}
					onClick={() => {
						navigate(`/`, { state: { actualLanguage: actualLanguage, actualCity: actualCity } });
					}}>
					<BackIcon mouseOver={mouseOver} regular={back_icon} hover={back_icon_hover} />
					{fullLanguage.words.back}
				</BackContainer>
				<MiInfoContainer>
					{socialNetworks.myInfo.map((info, index) => (
						<MiInfo key={index}>
							{info.nameAndDegree} {info.likeAndView}
						</MiInfo>
					))}
				</MiInfoContainer>
				<NetworkContainer>
					{socialNetworks.networks.map((network) => (
						<NetworkMapContainer>
							<SocialNetworkName key={network.abbrebiation}>{network.abbrebiation}</SocialNetworkName>
							<SocialNetworkItem key={network.username} href={network.link} target='_blank'>
								{network.username}
							</SocialNetworkItem>
						</NetworkMapContainer>
					))}
				</NetworkContainer>
			</WeatherCard>
		</>
	);
};

export default SocialNetwork;

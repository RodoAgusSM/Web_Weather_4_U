import React, { useState } from 'react';
import {
	GlobalStyle,
	WeatherCard,
	MiInfo,
	SocialNetworkItem,
	NetworkContainer,
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
	const { actualLanguage } = state;
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
						navigate(`/`, { state: { actualLanguage: actualLanguage } });
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
						<SocialNetworkItem key={network.abbrebiation} href={network.link} target='_blank'>
							{network.abbrebiation} {network.username}
						</SocialNetworkItem>
					))}
				</NetworkContainer>
			</WeatherCard>
		</>
	);
};

export default SocialNetwork;

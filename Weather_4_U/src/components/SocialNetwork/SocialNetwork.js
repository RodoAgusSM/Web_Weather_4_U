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
import { useNavigate, useLocation } from 'react-router-dom';
import back_icon from '../../images/back_icon.png';
import back_icon_hover from '../../images/back_icon_hover.png';
import { useTranslation } from 'react-i18next';

const SocialNetwork = () => {
	const { t } = useTranslation();
	let navigate = useNavigate();
	const { state } = useLocation();
	const { actualCity, actualFullCity, savedLat, savedLon } = state;
	const [mouseOver, setMouseOver] = useState(false);
	return (
		<>
			<GlobalStyle />
			<WeatherCard>
				<BackContainer
					onMouseEnter={() => setMouseOver(true)}
					onMouseLeave={() => setMouseOver(false)}
					onClick={() => {
						navigate(`/`, {
							state: { actualCity: actualCity, actualFullCity: actualFullCity, savedLat: savedLat, savedLon: savedLon },
						});
					}}>
					<BackIcon mouseOver={mouseOver} regular={back_icon} hover={back_icon_hover} />
					{t('words.back')}
				</BackContainer>
				<MiInfoContainer>
					<MiInfo>{t('socialNetworks.myInfo.nameAndDegree')}</MiInfo>
					<MiInfo>{t('socialNetworks.myInfo.likeAndView')}</MiInfo>
				</MiInfoContainer>
				<NetworkContainer>
					{Object.values(t('socialNetworks.networks', { returnObjects: true })).map((socialNetworkItem) => (
						<NetworkMapContainer>
							<SocialNetworkName>{socialNetworkItem.abbrebiation}</SocialNetworkName>
							<SocialNetworkItem href={socialNetworkItem.link} target='_blank'>
								{socialNetworkItem.username}
							</SocialNetworkItem>
						</NetworkMapContainer>
					))}
				</NetworkContainer>
			</WeatherCard>
		</>
	);
};

export default SocialNetwork;

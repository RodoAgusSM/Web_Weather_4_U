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
import back_icon from '../../imgs/back_icon.png';
import back_icon_hover from '../../imgs/back_icon_hover.png';
import { useTranslation } from 'react-i18next';

const SocialNetwork = () => {
	const { t } = useTranslation();
	let navigate = useNavigate();
	const { state } = useLocation();
	const { actualCity } = state;
	const [mouseOver, setMouseOver] = useState(false);
	return (
		<>
			<GlobalStyle />
			<WeatherCard>
				<BackContainer
					onMouseEnter={() => setMouseOver(true)}
					onMouseLeave={() => setMouseOver(false)}
					onClick={() => {
						navigate(`/`, { state: { actualCity: actualCity } });
					}}>
					<BackIcon mouseOver={mouseOver} regular={back_icon} hover={back_icon_hover} />
					{t('words.back')}
				</BackContainer>
				<MiInfoContainer>
					<MiInfo>{t('socialNetworks.myInfo.nameAndDegree')}</MiInfo>
					<MiInfo>{t('socialNetworks.myInfo.likeAndView')}</MiInfo>
				</MiInfoContainer>
				<NetworkContainer>
					<NetworkMapContainer>
						<SocialNetworkName>{t('socialNetworks.networks.linkedIn.abbrebiation')}</SocialNetworkName>
						<SocialNetworkItem href={t('socialNetworks.networks.linkedIn.link')} target='_blank'>
							{t('socialNetworks.networks.linkedIn.username')}
						</SocialNetworkItem>
					</NetworkMapContainer>
					<NetworkMapContainer>
						<SocialNetworkName>{t('socialNetworks.networks.gitHub.abbrebiation')}</SocialNetworkName>
						<SocialNetworkItem href={t('socialNetworks.networks.gitHub.link')} target='_blank'>
							{t('socialNetworks.networks.gitHub.username')}
						</SocialNetworkItem>
					</NetworkMapContainer>
					<NetworkMapContainer>
						<SocialNetworkName>{t('socialNetworks.networks.iG.abbrebiation')}</SocialNetworkName>
						<SocialNetworkItem href={t('socialNetworks.networks.iG.link')} target='_blank'>
							{t('socialNetworks.networks.iG.username')}
						</SocialNetworkItem>
					</NetworkMapContainer>
					<NetworkMapContainer>
						<SocialNetworkName>{t('socialNetworks.networks.tW.abbrebiation')}</SocialNetworkName>
						<SocialNetworkItem href={t('socialNetworks.networks.tW.link')} target='_blank'>
							{t('socialNetworks.networks.tW.username')}
						</SocialNetworkItem>
					</NetworkMapContainer>
					<NetworkMapContainer>
						<SocialNetworkName>{t('socialNetworks.networks.fB.abbrebiation')}</SocialNetworkName>
						<SocialNetworkItem href={t('socialNetworks.networks.fB.link')} target='_blank'>
							{t('socialNetworks.networks.fB.username')}
						</SocialNetworkItem>
					</NetworkMapContainer>
				</NetworkContainer>
			</WeatherCard>
		</>
	);
};

export default SocialNetwork;

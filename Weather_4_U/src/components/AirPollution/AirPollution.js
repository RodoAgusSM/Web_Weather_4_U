import React, { useState } from 'react';
import { GlobalStyle, WeatherCard, BackContainer, BackIcon } from '../../styles/styles';
import { useNavigate } from 'react-router-dom';
import back_icon from '../../images/back_icon.png';
import back_icon_hover from '../../images/back_icon_hover.png';
import { useTranslation } from 'react-i18next';

const AirPollution = () => {
	const { t } = useTranslation();
	let navigate = useNavigate();
	const [mouseOver, setMouseOver] = useState(false);
	return (
		<>
			<GlobalStyle />
			<WeatherCard>
				<BackContainer
					onMouseEnter={() => setMouseOver(true)}
					onMouseLeave={() => setMouseOver(false)}
					onClick={() => {
						navigate(`/`);
					}}>
					<BackIcon mouseOver={mouseOver} regular={back_icon} hover={back_icon_hover} />
					{t('words.back')}
				</BackContainer>
			</WeatherCard>
		</>
	);
};

export default AirPollution;

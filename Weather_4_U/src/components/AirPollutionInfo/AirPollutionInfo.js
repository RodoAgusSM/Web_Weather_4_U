import React, { useState } from 'react';
import {
	GlobalStyle,
	WeatherCard,
	BackContainer,
	BackIcon,
	AirPollutionItemLegendIcon,
	AirPollutionLegendText,
	AirPollutionItemContainer,
	AirPollutionItemSpan,
} from '../../styles/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import back_icon from '../../images/back_icon.png';
import back_icon_hover from '../../images/back_icon_hover.png';
import { useTranslation } from 'react-i18next';

const AirPollutionInfo = () => {
	const { t } = useTranslation();
	const { state } = useLocation();
	const { airPollution } = state;
	let navigate = useNavigate();
	const [mouseOver, setMouseOver] = useState(false);

	const generateLabel = (label, value) => {
		switch (label) {
			case 'AQI':
				console.log();
			case 'carbonMonoxide':
				return console.log();
			case 'nitrogenMonoxide':
				return console.log();
			case 'nitrogenDioxide':
				return labelNitrogenDioxide(value);
			case 'ozone':
				return labelOzone(value);
			case 'sulphurDioxide':
				return console.log();
			case 'fineParticlesMatter':
				return labelFineParticlesMatter(value);
			case 'coarseParticulateMatter':
				return labelCoarseParticulateMatter(value);
			case 'ammonia':
				return console.log();
		}
	};

	const labelNitrogenDioxide = (value) => {
		const label = `${t('words.airPollution.elements.nitrogenDioxide')} (NO2)`;
		if (value >= 0 && value < 50)
			return (
				<AirPollutionItemContainer>
					{label}
					<AirPollutionItemSpan color={'#79BC6A'} />
				</AirPollutionItemContainer>
			);
		else if (value >= 50 && value < 100)
			return (
				<AirPollutionItemContainer>
					{label}
					<AirPollutionItemSpan color={'#BBCf4C'} />
				</AirPollutionItemContainer>
			);
		else if (value >= 100 && value < 200)
			return (
				<AirPollutionItemContainer>
					{label}
					<AirPollutionItemSpan color={'#EEC209'} />
				</AirPollutionItemContainer>
			);
		else if (value >= 200 && value < 400)
			return (
				<AirPollutionItemContainer>
					{label}
					<AirPollutionItemSpan color={'#F39307'} />
				</AirPollutionItemContainer>
			);
		if (value > 400)
			return (
				<AirPollutionItemContainer>
					{label}
					<AirPollutionItemSpan color={'#E8406F'} />
				</AirPollutionItemContainer>
			);
	};

	const labelOzone = (value) => {
		const label = `${t('words.airPollution.elements.ozone')} (O3)`;
		if (value >= 0 && value < 60)
			return (
				<AirPollutionItemContainer>
					{label}
					<AirPollutionItemSpan color={'#79BC6A'} />
				</AirPollutionItemContainer>
			);
		else if (value >= 60 && value < 120)
			return (
				<AirPollutionItemContainer>
					{label}
					<AirPollutionItemSpan color={'#BBCf4C'} />
				</AirPollutionItemContainer>
			);
		else if (value >= 120 && value < 180)
			return (
				<AirPollutionItemContainer>
					{label}
					<AirPollutionItemSpan color={'#EEC209'} />
				</AirPollutionItemContainer>
			);
		else if (value >= 180 && value < 240)
			return (
				<AirPollutionItemContainer>
					{label}
					<AirPollutionItemSpan color={'#F39307'} />
				</AirPollutionItemContainer>
			);
		if (value > 240)
			return (
				<AirPollutionItemContainer>
					{label}
					<AirPollutionItemSpan color={'#E8406F'} />
				</AirPollutionItemContainer>
			);
	};

	const labelFineParticlesMatter = (value) => {
		const label = `${t('words.airPollution.elements.fineParticlesMatter')} (PM2.5)`;
		if (value >= 0 && value < 15)
			return (
				<AirPollutionItemContainer>
					{label}
					<AirPollutionItemSpan color={'#79BC6A'} />
				</AirPollutionItemContainer>
			);
		else if (value >= 15 && value < 30)
			return (
				<AirPollutionItemContainer>
					{label}
					<AirPollutionItemSpan color={'#BBCf4C'} />
				</AirPollutionItemContainer>
			);
		else if (value >= 30 && value < 55)
			return (
				<AirPollutionItemContainer>
					{label}
					<AirPollutionItemSpan color={'#EEC209'} />
				</AirPollutionItemContainer>
			);
		else if (value >= 55 && value < 110)
			return (
				<AirPollutionItemContainer>
					{label}
					<AirPollutionItemSpan color={'#F39307'} />
				</AirPollutionItemContainer>
			);
		if (value > 110)
			return (
				<AirPollutionItemContainer>
					{label}
					<AirPollutionItemSpan color={'#E8406F'} />
				</AirPollutionItemContainer>
			);
	};

	const labelCoarseParticulateMatter = (value) => {
		const label = `${t('words.airPollution.elements.coarseParticulateMatter')} (PM10)`;
		if (value >= 0 && value < 25)
			return (
				<AirPollutionItemContainer>
					{label}
					<AirPollutionItemSpan color={'#79BC6A'} />
				</AirPollutionItemContainer>
			);
		else if (value >= 25 && value < 50)
			return (
				<AirPollutionItemContainer>
					{label}
					<AirPollutionItemSpan color={'#BBCf4C'} />
				</AirPollutionItemContainer>
			);
		else if (value >= 50 && value < 90)
			return (
				<AirPollutionItemContainer>
					{label}
					<AirPollutionItemSpan color={'#EEC209'} />
				</AirPollutionItemContainer>
			);
		else if (value >= 90 && value < 180)
			return (
				<AirPollutionItemContainer>
					{label}
					<AirPollutionItemSpan color={'#F39307'} />
				</AirPollutionItemContainer>
			);
		if (value > 240)
			return (
				<AirPollutionItemContainer>
					{label}
					<AirPollutionItemSpan color={'#E8406F'} />
				</AirPollutionItemContainer>
			);
	};

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
				<div
					style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 40, marginBottom: 65 }}>
					<AirPollutionItemLegendIcon color={'#79BC6A'} />
					<AirPollutionLegendText>
						{Object.values(t('words.airPollution.status', { returnObjects: true }))[0]}
					</AirPollutionLegendText>
					<AirPollutionItemLegendIcon color={'#BBCf4C'} />
					<AirPollutionLegendText>
						{Object.values(t('words.airPollution.status', { returnObjects: true }))[1]}
					</AirPollutionLegendText>
					<AirPollutionItemLegendIcon color={'#EEC209'} />
					<AirPollutionLegendText>
						{Object.values(t('words.airPollution.status', { returnObjects: true }))[2]}
					</AirPollutionLegendText>
					<AirPollutionItemLegendIcon color={'#F39307'} />
					<AirPollutionLegendText>
						{Object.values(t('words.airPollution.status', { returnObjects: true }))[3]}
					</AirPollutionLegendText>
					<AirPollutionItemLegendIcon color={'#E8406F'} />
					<AirPollutionLegendText>
						{Object.values(t('words.airPollution.status', { returnObjects: true }))[4]}
					</AirPollutionLegendText>
				</div>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}>
					{Object.entries(airPollution).map((entry) => generateLabel(entry[0], entry[1]))}
				</div>
			</WeatherCard>
		</>
	);
};

export default AirPollutionInfo;

import React, { useState } from 'react';
import { GlobalStyle, WeatherCard, BackContainer, BackIcon, BreakLine } from '../../styles/styles';
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
				return console.log();
			case 'sulphurDioxide':
				return console.log();
			case 'fineParticlesMatter':
				return console.log();
			case 'coarseParticulateMatter':
				return console.log();
			case 'ammonia':
				return console.log();
		}
	};

	const labelNitrogenDioxide = (value) => {
		if (value >= 0 && value < 49)
			return (
				<div
					style={{
						marginTop: 15,
						display: 'flex',
						alignItems: 'center',
					}}>
					Doxido de Nitrógeno
					<span style={{ width: 30, height: 30, background: '#79BC6A', borderRadius: 25, marginLeft: 5 }} />
				</div>
			);
		else if (value >= 50 && value < 99)
			return (
				<div
					style={{
						marginTop: 15,
						display: 'flex',
						alignItems: 'center',
					}}>
					{value}
					<span style={{ width: 30, height: 30, background: '#BBCf4C', borderRadius: 25, marginLeft: 5 }} />
				</div>
			);
		else if (value >= 100 && value < 199)
			return (
				<div
					style={{
						marginTop: 15,
						display: 'flex',
						alignItems: 'center',
					}}>
					{value}
					<span style={{ width: 30, height: 30, background: '#EEC209', borderRadius: 25, marginLeft: 5 }} />
				</div>
			);
		else if (value >= 200 && value < 399)
			return (
				<div
					style={{
						marginTop: 15,
						display: 'flex',
						alignItems: 'center',
					}}>
					{value}
					<span style={{ width: 30, height: 30, background: '#F39307', borderRadius: 25, marginLeft: 5 }} />
				</div>
			);
		if (value > 400)
			return (
				<div
					style={{
						marginTop: 15,
						display: 'flex',
						alignItems: 'center',
					}}>
					{value}
					<span style={{ width: 30, height: 30, background: '#E8406F', borderRadius: 25, marginLeft: 5 }} />
				</div>
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
				<BreakLine />
				<BreakLine />
				<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<span style={{ width: 30, height: 30, background: '#79BC6A', borderRadius: 25 }} />
					<code style={{ marginLeft: 3, marginRight: 12 }}>
						{Object.values(t('words.airPollution.status', { returnObjects: true }))[0]}
					</code>
					<span style={{ width: 30, height: 30, background: '#BBCf4C', borderRadius: 25 }} />
					<code style={{ marginLeft: 3, marginRight: 12 }}>
						{Object.values(t('words.airPollution.status', { returnObjects: true }))[1]}
					</code>
					<span style={{ width: 30, height: 30, background: '#EEC209', borderRadius: 25 }} />
					<code style={{ marginLeft: 3, marginRight: 12 }}>
						{Object.values(t('words.airPollution.status', { returnObjects: true }))[2]}
					</code>
					<span style={{ width: 30, height: 30, background: '#F39307', borderRadius: 25 }} />
					<code style={{ marginLeft: 3, marginRight: 12 }}>
						{Object.values(t('words.airPollution.status', { returnObjects: true }))[3]}
					</code>
					<span style={{ width: 30, height: 30, background: '#E8406F', borderRadius: 25 }} />
					<code style={{ marginLeft: 3, marginRight: 12 }}>
						{Object.values(t('words.airPollution.status', { returnObjects: true }))[4]}
					</code>
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

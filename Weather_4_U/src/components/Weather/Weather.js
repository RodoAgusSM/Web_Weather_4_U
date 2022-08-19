import React, { useState, useEffect, useRef } from 'react';
import logo from '../../images/sun_half.svg';
import locationNotFound from '../../images/location_not_found_icon.png';
import loading from '../../images/loading.gif';
import danger from '../../images/danger.png';
import notFoundIcon from '../../images/not_found_icon.png';
import {
	GlobalStyle,
	WeatherIcon,
	WeatherCard,
	LocationNotFoundIcon,
	LocationNotFoundCode,
	LogoApp,
	TitleApp,
	Code,
	WeatherMain,
	WeatherMainTemperature,
	WeatherData,
	DangerLogo,
	SpinnerLogo,
	BreakLine,
	Subtitle,
	SocialNetworkIconContainer,
	SocialNetworkIcon,
	MoreInfoButton,
} from '../../styles/styles';
import { openWeatherMapURL, paramsURL, iconURL, Directions, iconExtension } from '../../config/config';
import CitySearchBar from '../CitySearchBar/CitySearchBar';
import SunriseSunsetInfo from '../SunriseSunsetInfo/SunsetSunriseInfo';
import Language from '../Language/Language';
import { useNavigate } from 'react-router-dom';
import social_network from '../../images/social_network.png';
import social_network_hover from '../../images/social_network_hover.png';
import { useTranslation } from 'react-i18next';
import AirPollution from '../../class/AirPollution';

const Weather = () => {
	const { t, i18n } = useTranslation();
	let navigate = useNavigate();
	const [mouseOver, setMouseOver] = useState(false);
	let [validCoordinates, setValidCoordinates] = useState(true);
	let [siteWorking, setIsSiteWorking] = useState([]);
	let [iconWorking, setIsIconWorking] = useState([]);
	let [cityName, setCityName] = useState(localStorage.getItem('cityName') ?? 'Montevideo');
	let [fullCityName, setFullCityName] = useState(localStorage.getItem('cityFullName') ?? 'Montevideo, Uruguay');
	let [lat, setLat] = useState(localStorage.getItem('lat') ?? -34.8335);
	let [lon, setLon] = useState(localStorage.getItem('lon') ?? -56.1674);
	let [language, setLanguage] = useState(i18n.language);
	let [countryNameShort, setCountryNameShort] = useState([]);
	let [realFeel, setRealFeel] = useState([]);
	let [icon, setIcon] = useState('');
	let [description, setDescription] = useState([]);
	let [feelsLike, setFeelsLike] = useState([]);
	let [time, setTime] = useState([]);
	let [date, setDate] = useState([]);
	let [humidity, setHumidity] = useState([]);
	let [pressure, setPressure] = useState([]);
	let [windSpeed, setWindSpeed] = useState([]);
	let [windDirection, setWindDirection] = useState([]);
	let [visibility, setVisibility] = useState([]);
	let [airPollution, setAirPollution] = useState([]);
	let [sunrise, setSunrise] = useState([]);
	let [sunset, setSunset] = useState([]);
	let [isLoading, setIsLoading] = useState(true);
	let iconValue = useRef(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const fullUrl = openWeatherMapURL + 'weather' + '?lat=' + lat + '&lon=' + lon + '&lang=' + language + paramsURL;
				const response = await fetch(fullUrl);
				if (response.ok) {
					const data = await response.json();
					setIsSiteWorking(true);
					setCountryNameShort(data.sys.country);
					setRealFeel(Math.trunc(data.main.temp));
					iconValue.current = data.weather[0].icon;
					setDescription(data.weather[0].description);
					setFeelsLike(Math.trunc(data.main.feels_like));
					setHumidity(data.main.humidity);
					setPressure(data.main.pressure);
					setWindSpeed(parseInt(Math.trunc(data.wind.speed) * 3.6));
					const degrees = parseInt(data.wind.deg);
					const cardinal = parseInt((degrees + 11.25) / 22.5);
					setWindDirection(Directions[cardinal % 16]);
					setVisibility(data.visibility);
					const dateNow = new Date();
					const minutesNow = dateNow.getMinutes();
					const minutes = minutesNow > 10 ? minutesNow : '0' + minutesNow;
					const time = dateNow.getHours() + ':' + minutes;
					setTime(time);
					const date = dateNow.getDate() + '/' + (dateNow.getMonth() + 1) + '/' + dateNow.getFullYear();
					setDate(date);
					setSunrise(data.sys.sunrise);
					setSunset(data.sys.sunset);
				} else console.log(response.status, response.text);
			} catch (error) {
				if (error.response.data.message === 'city not found') setValidCoordinates(false);
				else setIsSiteWorking(false);
			}
			try {
				setIsIconWorking(true);
				const iconUrl = iconURL + iconValue.current + iconExtension;
				const response = await fetch(iconUrl);
				if (response.ok) {
					setIcon(response?.url);
				} else console.log(response.status, response.text);
			} catch (error) {
				setIsIconWorking(false);
			}
			try {
				const fullUrl =
					openWeatherMapURL + 'air_pollution' + '?lat=' + lat + '&lon=' + lon + '&lang=' + language + paramsURL;
				const response = await fetch(fullUrl);
				if (response.ok) {
					const data = await response.json();
					setAirPollution(new AirPollution(data));
				} else console.log(response.status, response.text);
				setIsLoading(false);
			} catch (error) {}
		};
		fetchData();
	}, [lat, lon, language]);

	const changeCity = (newCity) => {
		if (fullCityName !== newCity.label) {
			localStorage.setItem('cityName', newCity.value.name);
			localStorage.setItem('cityFullName', newCity.label);
			localStorage.setItem('lat', newCity.value.lat);
			localStorage.setItem('lon', newCity.value.lon);
			setFullCityName(newCity.label);
			setCityName(newCity.value.name);
			setLat(newCity.value.lat);
			setLon(newCity.value.lon);
			setIsLoading(true);
		}
	};

	const changeLanguage = (newLanguage) => {
		if (language !== newLanguage) {
			localStorage.setItem('language', newLanguage);
			i18n.changeLanguage(newLanguage);
			setLanguage(newLanguage);
			setIsLoading(true);
		}
	};

	let toShow;
	if (siteWorking) {
		let showIcon;
		if (iconWorking) showIcon = <WeatherIcon src={icon} alt='' />;
		else showIcon = <WeatherIcon src={notFoundIcon} alt='' />;
		if (isLoading || icon === '')
			toShow = (
				<>
					<SpinnerLogo src={loading} alt='' />
				</>
			);
		else
			toShow = (
				<WeatherCard>
					<CitySearchBar changeCity={changeCity} />
					{validCoordinates ? (
						<>
							<LogoApp src={logo} alt='' />
							<TitleApp>
								<Subtitle>
									{t('words.weatherIn')} {cityName} ({countryNameShort})
								</Subtitle>
							</TitleApp>
							{showIcon}
							<WeatherMain>
								<WeatherMainTemperature>{realFeel}°C</WeatherMainTemperature>
								<BreakLine />
								<Code>
									{t('words.feelsLike')} {feelsLike}°C
								</Code>
								<BreakLine />
								<Code>{description}</Code>
								<BreakLine />
								<SunriseSunsetInfo lat={lat} lon={lon} sunrise={sunrise} sunset={sunset} />
							</WeatherMain>
							<WeatherData>
								<Code>
									{t('words.humidity')} {humidity}%
								</Code>
								<BreakLine />
								<Code>
									{t('words.pressure')} {pressure} hPa
								</Code>
								<BreakLine />
								<Code>
									{t('words.wind')} {windDirection} {windSpeed} km/h
								</Code>
								<BreakLine />
								<Code>
									{t('words.visibility')} {visibility} m
								</Code>
								<BreakLine />
								<Code>
									{t('words.airPollution.aqi')}
									{Object.values(t('words.airPollution.status', { returnObjects: true }))[airPollution.AQI]}{' '}
									<MoreInfoButton
										onClick={() => {
											navigate(`/air_pollution_info`, { state: { airPollution } });
										}}>
										{t('words.airPollution.moreInfo')}
									</MoreInfoButton>
								</Code>
								<BreakLine />
								<BreakLine />
								<Code>
									{t('words.updatedAt')} {time}
								</Code>
								<BreakLine />
								<Code>
									{t('words.date')} {date}
								</Code>
							</WeatherData>
						</>
					) : (
						<>
							<LocationNotFoundIcon src={locationNotFound} alt='' />
							<LocationNotFoundCode>
								{t('words.locationNotFound.funnyMessage')} "{cityName}"
							</LocationNotFoundCode>
							<BreakLine />
							<LocationNotFoundCode>{t('words.locationNotFound.realMessage')}</LocationNotFoundCode>
						</>
					)}
					<Language actualLanguage={language} changeLanguage={changeLanguage} />
					<SocialNetworkIconContainer
						onMouseEnter={() => setMouseOver(true)}
						onMouseLeave={() => setMouseOver(false)}
						onClick={() => {
							navigate(`/social_network`);
						}}>
						<SocialNetworkIcon mouseOver={mouseOver} regular={social_network} hover={social_network_hover} />
					</SocialNetworkIconContainer>
				</WeatherCard>
			);
	} else
		toShow = (
			<>
				<DangerLogo src={danger} alt='' />
				<BreakLine />
				<Code>{t('words.conectionError')}</Code>
			</>
		);
	return (
		<>
			<GlobalStyle />
			{toShow}
		</>
	);
};

export default Weather;

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
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
} from '../../styles/styles';
import {
	openWeatherMapURL,
	paramsURL,
	openStreetMapURL,
	iconURL,
	Directions,
	iconExtension,
} from '../../config/config';
import CitySearchBar from '../CitySearchBar/CitySearchBar';
import SunriseSunsetInfo from '../SunriseSunsetInfo/SunsetSunriseInfo';
import Language from '../Language/Language';
import { useNavigate, useLocation } from 'react-router-dom';
import social_network from '../../images/social_network.png';
import social_network_hover from '../../images/social_network_hover.png';
import { useTranslation } from 'react-i18next';

const Weather = () => {
	const { t, i18n } = useTranslation();
	let navigate = useNavigate();
	const { state } = useLocation();
	const [mouseOver, setMouseOver] = useState(false);
	let [validCoordinates, setValidCoordinates] = useState(true);
	let validCoordinatesHelper = true;
	let [siteWorking, setIsSiteWorking] = useState([]);
	let [iconWorking, setIsIconWorking] = useState([]);
	let [cityName, setCityName] = useState(state?.actualCity ?? 'Montevideo');
	let [lat, setLat] = useState();
	let [lon, setLon] = useState();
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
	let [sunrise, setSunrise] = useState([]);
	let [sunset, setSunset] = useState([]);
	let [isLoading, setIsLoading] = useState(true);
	let iconValue = useRef(null);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const fullUrl = openStreetMapURL + '&city=' + cityName;
				const response = await axios.get(fullUrl);
				validCoordinatesHelper = true;
				setValidCoordinates(true);
				setLat(response.data[0].lat);
				setLon(response.data[0].lon);
			} catch (error) {
				validCoordinatesHelper = false;
				setValidCoordinates(false);
			}
			if (validCoordinates && validCoordinatesHelper) {
				try {
					const fullUrl =
						openWeatherMapURL + 'q=' + cityName + '&lat=' + lat + '&lon=' + lon + '&lang=' + language + paramsURL;
					const response = await axios.get(fullUrl);
					setIsSiteWorking(true);
					setCountryNameShort(response.data.sys.country);
					setRealFeel(Math.trunc(response.data.main.temp));
					iconValue.current = response.data.weather[0].icon;
					setDescription(response.data.weather[0].description);
					setFeelsLike(Math.trunc(response.data.main.feels_like));
					setHumidity(response.data.main.humidity);
					setPressure(response.data.main.pressure);
					setWindSpeed(parseInt(Math.trunc(response.data.wind.speed) * 3.6));
					const degrees = parseInt(response.data.wind.deg);
					const cardinal = parseInt((degrees + 11.25) / 22.5);
					setWindDirection(Directions[cardinal % 16]);
					setVisibility(response.data.visibility);
					const dateNow = new Date();
					const time = dateNow.getHours() + ':' + dateNow.getMinutes();
					setTime(time);
					const date = dateNow.getDate() + '/' + (dateNow.getMonth() + 1) + '/' + dateNow.getFullYear();
					setDate(date);
					setSunrise(response.data.sys.sunrise);
					setSunset(response.data.sys.sunset);
				} catch (error) {
					if (error.response.data.message === 'city not found') setValidCoordinates(false);
					else setIsSiteWorking(false);
				}
				try {
					setIsIconWorking(true);
					setTimeout(async () => {
						const iconUrl = iconURL + iconValue.current + iconExtension;
						const iconFetched = await axios.get(iconUrl);
						setIcon(iconFetched?.config?.url);
						setIsLoading(false);
					}, 1500);
				} catch (error) {
					setIsIconWorking(false);
				}
			} else setIsLoading(false);
		};
		fetchData();
		setInterval(() => {
			fetchData();
		}, 900000);
	}, [cityName, language]);

	const changeCity = (newCity) => {
		if (cityName !== newCity) {
			setCityName(newCity);
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
					<CitySearchBar actualLanguage={language} changeCity={changeCity} />
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
								<Code>
									{t('words.updatedAt')} {time}
								</Code>
								<BreakLine />
								<Code>
									{t('words.date')} {date}
								</Code>
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
								<BreakLine />
								<SunriseSunsetInfo lat={lat} lon={lon} sunrise={sunrise} sunset={sunset} />
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
							navigate(`/social_network`, { state: { actualCity: cityName } });
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

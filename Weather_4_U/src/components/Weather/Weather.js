import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import logo from '../../imgs/sun_half.svg';
import loading from '../../imgs/loading.gif';
import danger from '../../imgs/danger.png';
import notFoundIcon from '../../imgs/not_found_icon.png';
import {
	GlobalStyle,
	WeatherIcon,
	WeatherCard,
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
} from '../../styles/styles';
import { openWeatherMapURL, paramsURL, iconURL, Directions, iconExtension } from '../../config/config';
import { findCityCoordsByName } from '../../coordinates/CityCoordinates';
import { findLanguageByKey } from '../../languages/Languages';
import City from '../City/City';
import Language from '../Language/Language';

const Weather = () => {
	let [siteWorking, setIsSiteWorking] = useState([]);
	let [iconWorking, setIsIconWorking] = useState([]);
	let [cityName, setCityName] = useState('Montevideo');
	let [language, setLanguage] = useState('sp');
	let [countryNameShort, setCountryNameShort] = useState([]);
	let [realFeel, setRealFeel] = useState([]);
	let [icon, setIcon] = useState('');
	let [description, setDescription] = useState([]);
	let [feelsLike, setFeelsLike] = useState([]);
	let [humidity, setHumidity] = useState([]);
	let [pressure, setPressure] = useState([]);
	let [windSpeed, setWindSpeed] = useState([]);
	let [windDirection, setWindDirection] = useState([]);
	let [time, setTime] = useState([]);
	let [date, setDate] = useState([]);
	let [isLoading, setIsLoading] = useState(true);
	let iconValue = useRef(null);
	const fullLanguage = findLanguageByKey(language);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const coords = findCityCoordsByName(cityName);
				const fullUrl =
					openWeatherMapURL +
					'q=' +
					cityName +
					'&lat=' +
					coords.lat +
					'&lon=' +
					coords.lon +
					'&lang=' +
					language +
					paramsURL;
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
				const dateNow = new Date();
				const time = dateNow.getHours() + ':' + dateNow.getMinutes();
				setTime(time);
				const date = dateNow.getDate() + '/' + (dateNow.getMonth() + 1) + '/' + dateNow.getFullYear();
				setDate(date);
			} catch (error) {
				setIsSiteWorking(false);
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
		};
		fetchData();
		setInterval(() => {
			fetchData();
		}, 120000);
	}, [cityName, language]);

	const changeCity = (newCity) => {
		if (cityName !== newCity) {
			setCityName(newCity);
			setIsLoading(true);
		}
	};

	const changeLanguage = (newLanguage) => {
		if (language !== newLanguage) {
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
					<City actualCity={cityName} changeCity={changeCity} />
					<LogoApp src={logo} alt='' />
					<TitleApp>
						<Subtitle>
							{fullLanguage.words.weatherIn} {cityName} ({countryNameShort})
						</Subtitle>
					</TitleApp>
					{showIcon}
					<WeatherMain>
						<WeatherMainTemperature>{realFeel}°C</WeatherMainTemperature>
						<BreakLine />
						<Code>
							{fullLanguage.words.feelsLike} {feelsLike}°C
						</Code>
						<BreakLine />
						<Code>{description}</Code>
						<BreakLine />
						<Code>
							{fullLanguage.words.updatedAt} {time}
						</Code>
						<BreakLine />
						<Code>
							{fullLanguage.words.date} {date}
						</Code>
					</WeatherMain>
					<WeatherData>
						<Code>
							{fullLanguage.words.humidity} {humidity}%
						</Code>
						<BreakLine />
						<Code>
							{fullLanguage.words.pressure} {pressure} hPa
						</Code>
						<BreakLine />
						<Code>
							{fullLanguage.words.wind} {windDirection} {windSpeed} km/h
						</Code>
						<BreakLine />
					</WeatherData>
					<Language actualLanguage={language} changeLanguage={changeLanguage} />
				</WeatherCard>
			);
	} else
		toShow = (
			<>
				<DangerLogo src={danger} alt='' />
				<BreakLine />
				<Code>{fullLanguage.words.conectionError}</Code>
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

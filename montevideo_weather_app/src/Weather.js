import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import logo from './imgs/sun_half.svg';
import loading from './imgs/loading.gif';
import danger from './imgs/danger.png';
import notFoundIcon from './imgs/not_found_icon.png';
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
} from './styles/styles';
import { openWeatherMapURL, iconURL, Directions, iconExtension } from './config/config';

function Weather() {
	let [siteWorking, setIsSiteWorking] = useState([]);
	let [iconWorking, setIsIconWorking] = useState([]);
	let [cityName, setCityName] = useState([]);
	let [countryNameShort, setCountryNameShort] = useState([]);
	let [realFeel, setRealFeel] = useState([]);
	let [icon, setIcon] = useState('');
	let [description, setDescription] = useState([]);
	let [feelsLike, setFeelsLike] = useState([]);
	let [humidity, setHumidity] = useState([]);
	let [pressure, setPressure] = useState([]);
	let [windSpeed, setWindSpeed] = useState([]);
	let [windDirection, setWindDirection] = useState([]);
	let [date, setDate] = useState([]);
	let [isLoading, setIsLoading] = useState(true);
	let iconValue = useRef(null);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(openWeatherMapURL);
				setIsSiteWorking(true);
				setCityName(response.data.name);
				setCountryNameShort(response.data.sys.country);
				setRealFeel(Math.trunc(response.data.main.temp));
				iconValue.current = response.data.weather[0].icon;
				setDescription(response.data.weather[0].description);
				setFeelsLike(Math.trunc(response.data.main.feels_like));
				setHumidity(response.data.main.humidity);
				setPressure(response.data.main.pressure);
				setWindSpeed(parseInt(Math.trunc(response.data.wind.speed) * 3.6));
				let degrees = parseInt(response.data.wind.deg);
				let cardinal = parseInt((degrees + 11.25) / 22.5);
				setWindDirection(Directions[cardinal % 16]);
				let date = new Date();
				let time =
					date.getHours() +
					':' +
					date.getMinutes() +
					' ' +
					date.getDate() +
					'/' +
					(date.getMonth() + 1) +
					'/' +
					date.getFullYear();
				setDate(time);
				setIsLoading(false);
			} catch (error) {
				setIsSiteWorking(false);
			}
			try {
				setIsIconWorking(true);
				setTimeout(async () => {
					let iconUrl = iconURL + iconValue.current + iconExtension;
					let iconFetched = await axios.get(iconUrl);
					setIcon(iconFetched?.config?.url);
				}, 1200);
			} catch (error) {
				setIsIconWorking(false);
			}
		};
		fetchData();
		setInterval(() => {
			fetchData();
		}, 120000);
	}, []);

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
					<LogoApp src={logo} alt='' />
					<TitleApp>
						<Subtitle>
							Tiempo actual en {cityName} ({countryNameShort})
						</Subtitle>
					</TitleApp>
					{showIcon}
					<WeatherMain>
						<WeatherMainTemperature>{realFeel}°C</WeatherMainTemperature>
						<BreakLine />
						<Code>Sensación térmica: {feelsLike}°C</Code>
						<BreakLine />
						<Code>{description}</Code>
						<BreakLine />
						<Code>{date}</Code>
					</WeatherMain>
					<WeatherData>
						<Code>Humedad: {humidity}%</Code>
						<BreakLine />
						<Code>Presión: {pressure} hPa</Code>
						<BreakLine />
						<Code>
							Viento: {windDirection} {windSpeed} km/h
						</Code>
						<BreakLine />
					</WeatherData>
				</WeatherCard>
			);
	} else
		toShow = (
			<>
				<DangerLogo src={danger} alt='' />
				<BreakLine />
				<Code>Problema en la conexión con el proveedor del tiempo</Code>
			</>
		);
	return (
		<>
			<GlobalStyle />
			{toShow}
		</>
	);
}

export default Weather;

import React, { useState, useEffect } from 'react';
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
import { findLanguageByKey } from '../../languages/Languages';
import { Code, BreakLine } from '../../styles/styles';

const SunriseSunsetInfo = ({ actualLanguage, timezone, sunrise, sunset }) => {
	const fullLanguage = findLanguageByKey(actualLanguage);
	let [timeChanged, setTimeChanged] = useState([]);
	useEffect(() => {
		//toLocalCityTime();
	}, [timeChanged]);

	/* const toLocalCityTime = (offset) => {
		let date = new Date();
		let utc = date.getTime() + date.getTimezoneOffset() * 60000;
		let nd = new Date(utc + 3600000 * offset);
		console.log(nd.toLocaleString());
	}; */

	return (
		<div>
			<Code>
				{fullLanguage.words.sunrise} {sunrise}
			</Code>
			<BreakLine />
			<Code>
				{fullLanguage.words.sunset} {sunset}
			</Code>
		</div>
	);
};

export default SunriseSunsetInfo;

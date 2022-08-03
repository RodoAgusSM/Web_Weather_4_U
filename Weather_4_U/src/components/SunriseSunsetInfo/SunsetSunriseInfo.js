import React from 'react';
import { findLanguageByKey } from '../../languages/Languages';
import { Code, BreakLine } from '../../styles/styles';

const SunriseSunsetInfo = ({ actualLanguage, lat, lon, sunrise, sunset }) => {
	const { find } = require('geo-tz');
	const timeZone = find(lat, lon)[0];
	const fullLanguage = findLanguageByKey(actualLanguage);
	sunrise = new Date(sunrise * 1000).toLocaleString([], {
		timeStyle: 'short',
		timeZone: timeZone,
	});

	sunset = new Date(sunset * 1000).toLocaleString([], {
		timeStyle: 'short',
		timeZone: timeZone,
	});

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

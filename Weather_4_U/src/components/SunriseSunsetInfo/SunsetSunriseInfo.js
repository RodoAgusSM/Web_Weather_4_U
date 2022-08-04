import React from 'react';
import { findLanguageByKey } from '../../languages/Languages';
import { Code, BreakLine } from '../../styles/styles';

const SunriseSunsetInfo = ({ actualLanguage, lat, lon, sunrise, sunset }) => {
	const { find } = require('geo-tz');
	const fullLanguage = findLanguageByKey(actualLanguage);
	try {
		const timeZone = find(lat, lon)[0];
		console.log(timeZone);
		sunrise = new Date(sunrise * 1000).toLocaleString([], {
			timeStyle: 'short',
			timeZone: timeZone,
		});

		sunset = new Date(sunset * 1000).toLocaleString([], {
			timeStyle: 'short',
			timeZone: timeZone,
		});
	} catch (error) {
		sunrise = fullLanguage.words.locationNotFound.noData;
		sunset = fullLanguage.words.locationNotFound.noData;
	}

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

export const TranslationEn = {
	name: 'English',
	languages: {
		sp: 'Spanish',
		pt: 'Portuguese',
		fr: 'French',
	},
	words: {
		writeCity: 'Search city',
		lookingForSuggestions: 'Looking for matches...',
		noSuggestions: 'No matches',
		unit: {
			imperial: "Imperial",
			metric: "Metric",
		},
		weatherIn: 'Weather in ',
		temperature: {
			feelsLike: 'Feels like: ',
			unit: {
				imperial: '°F',
				metric: '°C',
			},
		},
		updatedAt: 'Updated at ',
		date: 'Date ',
		humidity: 'Humidity: ',
		pressure: 'Pressure: ',
		windInfo: {
			wind: 'Wind: ',
			unit: {
				imperial: 'mph',
				metric: 'km/h',
			},
			windDirection: {
				north: 'N',
				northNorthEast: 'NNE',
				northEast: 'NE',
				eastNorthEast: 'ENE',
				east: 'E',
				eastSouthEast: 'ESE',
				southEast: 'SE',
				southSouthEast: 'SSE',
				South: 'S',
				southSouthWest: 'SSW',
				southWest: 'SW',
				westSouthWest: 'WSW',
				west: 'W',
				westNorthWest: 'WNW',
				northWest: 'NW',
				northNorthWest: 'NNW',
			}
		},
		visibilityInfo: {
			visibility: 'Visibility: ',
			unit: {
				imperial: 'mi',
				metric: 'm',
			},
		},
		airPollution: {
			aqi: 'Air quality: ',
			status: { 0: 'Good', 1: 'Fair', 2: 'Moderate', 3: 'Poor', 4: 'Very Poor' },
			moreInfo: 'i',
			elements: {
				AQI: { label: 'Air Quality Index', symbol: '(AQI)' },
				carbonMonoxide: { label: 'Carbon monoxide', symbol: '(NO)' },
				nitrogenMonoxide: { label: 'Nitrogen monoxide', symbol: '(CO)' },
				nitrogenDioxide: { label: 'Nitrogen dioxide', symbol: '(NO₂)' },
				ozone: { label: 'Ozone', symbol: '(O₃)' },
				sulphurDioxide: { label: 'Sulpgur dioxide', symbol: '(SO₂)' },
				fineParticlesMatter: { label: 'Fine particles matter', symbol: '(PM2.5)' },
				coarseParticulateMatter: { label: 'Coarse particulate matter', symbol: '(PM₁₀)' },
				ammonia: { label: 'Ammonia', symbol: '(NH₃)' },
			},
		},
		sunrise: 'Sunrise: ',
		sunset: 'Sunset: ',
		locationNotFound: {
			funnyMessage: 'Our compass did not find the city ',
			realMessage: 'Please try again with another location',
			noData: 'No data',
		},
		conectionError: 'Problem connecting to weather provider',
		back: 'Back',
	},
	socialNetworks: {
		myInfo: {
			nameAndDegree: 'Hello, I am Rodolfo Agustín Silva Messano Software Engineer.',
			likeAndView: 'If you liked my app, I invite you to visit my social networks.',
		},
		networks: {
			linkedIn: {
				abbreviation: 'LinkedIn',
				username: 'rodolfosilvamessano',
				link: 'https://www.linkedin.com/in/rodolfosilvamessano/',
			},
			gitHub: { abbreviation: 'GitHub', username: 'RodoAgusSM', link: 'https://github.com/RodoAgusSM' },
			iG: { abbreviation: 'Instagram', username: 'rodoagus_94', link: 'https://www.instagram.com/rodoagus_94' },
			tW: { abbreviation: 'X', username: 'RodoAgusSM', link: 'https://twitter.com/RodoAgusSM' },
			fB: { abbreviation: 'Facebook', username: 'RodoAgusSM', link: 'https://www.facebook.com/RodoAgusSM' },
		},
	},
	errors: {
		errorFetchingSuggestions: "Network Error: An error occurred while fetching suggestions. Please try again later",
	}
};

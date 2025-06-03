export const TranslationSp = {
	name: 'Español',
	languages: {
		en: 'Inglés',
		pt: 'Portugués',
		fr: 'Francés',
	},
	words: {
		writeCity: 'Buscar cuidad',
		lookingForSuggestions: 'Buscando coincidencias...',
		noSuggestions: 'Sin coincidencias',
		unit: {
			imperial: "Imperial",
			metric: "Métrico",
		},
		weatherIn: 'Clima en ',
		temperature: {
			feelsLike: 'Sensación térmica: ',
			unit: {
				imperial: '°F',
				metric: '°C',
			},
		},
		updatedAt: 'Actualizado a las ',
		date: 'Fecha ',
		humidity: 'Humedad: ',
		pressure: 'Presión: ',
		windInfo: {
			wind: 'Viento: ',
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
				southSouthWest: 'SSO',
				southWest: 'SO',
				westSouthWest: 'OSO',
				west: 'O',
				westNorthWest: 'ONO',
				northWest: 'NO',
				northNorthWest: 'NNO',
			}
		},
		visibilityInfo: {
			visibility: 'Visibilidad: ',
			unit: {
				imperial: 'mi',
				metric: 'm',
			},
		},
		airPollution: {
			aqi: 'Calidad del aire: ',
			status: { 0: 'Buena', 1: 'Aceptable', 2: 'Moderada', 3: 'Pobre', 4: 'Muy pobre' },
			moreInfo: 'i',
			elements: {
				AQI: { label: 'Calidad del aire', symbol: '(AQI)' },
				carbonMonoxide: { label: 'Monóxido de carbono', symbol: '(NO)' },
				nitrogenMonoxide: { label: 'Monóxido de nitrógeno', symbol: '(CO)' },
				nitrogenDioxide: { label: 'Dioxido de nitrogeno', symbol: '(NO₂)' },
				ozone: { label: 'Ozono', symbol: '(O₃)' },
				sulphurDioxide: { label: 'Dióxido de azufre', symbol: '(SO₂)' },
				fineParticlesMatter: { label: 'Partículas finas de materia', symbol: '(PM2.5)' },
				coarseParticulateMatter: { label: 'Partículas gruesas de materia', symbol: '(PM₁₀)' },
				ammonia: { label: 'Amoníaco', symbol: '(NH₃)' },
			},
		},
		sunrise: 'Amanece: ',
		sunset: 'Oscurece: ',
		locationNotFound: {
			funnyMessage: 'Nuestra brújula no encontró la cuidad ',
			realMessage: 'Vuelva a intentar con otra ubicación',
			noData: 'Sin datos',
		},
		conectionError: 'Problema en la conexión con el proveedor del clima',
		back: 'Volver',
	},
	socialNetworks: {
		myInfo: {
			nameAndDegree: 'Hola, soy Rodolfo Agustín Silva Messano Ingeniero en Sistemas.',
			likeAndView: 'Si te gustó mi app, te invito a que visites mis redes sociales.',
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
		errorFetchingSuggestions: "Error de red: se produjo un error al buscar sugerencias. Por favor, inténtelo de nuevo más tarde",
	}
};

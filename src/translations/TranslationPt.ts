export const TranslationPt = {
	name: 'Português',
	languages: {
		sp: 'Espanhol',
		en: 'Inglês',
		fr: 'Francês',
	},
	words: {
		writeCity: 'Escreva uma cidade',
		lookingForSuggestions: 'Procurando por partidas...',
		noSuggestions: 'Sem combinações',
		unit: {
			imperial: "Imperial",
			metric: "Métrico",
		},
		weatherIn: 'Clima em ',
		temperature: {
			feelsLike: 'Sensação termica',
			unit: {
				imperial: '°F',
				metric: '°C',
			},
		},
		updatedAt: 'Atualizado em ',
		date: 'Encontro ',
		humidity: 'Umidade',
		pressure: 'Pressão',
		windInfo: {
			wind: 'Vento',
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
			visibility: 'Visibilidade',
			unit: {
				imperial: 'mi',
				metric: 'm',
			},
		},
		airPollution: {
			aqi: 'Qualidade do ar',
			status: { 1: 'Bom', 2: 'Aceitável', 3: 'Moderado', 4: 'Pobre', 5: 'Muito pobre' },
			moreInfo: 'i',
			elements: {
				AQI: { label: 'Qualidade do ar', symbol: '(AQI)' },
				carbonMonoxide: { label: 'Monóxido de carbono', symbol: '(CO)' },
				nitrogenMonoxide: { label: 'Monóxido de nitrogênio', symbol: '(NO)' },
				nitrogenDioxide: { label: 'Dióxido de nitrogênio', symbol: '(NO₂)' },
				ozone: { label: 'Ozônio', symbol: '(O₃)' },
				sulphurDioxide: { label: 'Dióxido de enxofre', symbol: '(SO₂)' },
				fineParticlesMatter: { label: 'Partículas finas de matéria', symbol: '(PM2.5)' },
				coarseParticulateMatter: { label: 'Partículas grossas de matéria', symbol: '(PM₁₀)' },
				ammonia: { label: 'Amônia', symbol: '(NH₃)' },
			},
		},
		sunrise: 'Nascer do sol',
		sunset: 'Pôr do sol',
		locationNotFound: {
			funnyMessage: 'Nossa bússola não encontrou a cidade ',
			realMessage: 'Tente novamente com outro local',
			noData: 'Não há dados',
		},
		conectionError: 'Problema ao conectar ao provedor de clima',
		back: 'Retorna',
	},
	socialNetworks: {
		myInfo: {
			nameAndDegree: 'Olá, sou Rodolfo Agustín Silva Messano Engenheiro de Sistemas.',
			likeAndView: 'Se você gostou do meu aplicativo, convido você a visitar minhas redes sociais.',
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
		errorFetchingSuggestions: "Erro de rede: ocorreu um erro ao buscar sugestões. Por favor, tente novamente mais tarde",
	}
};

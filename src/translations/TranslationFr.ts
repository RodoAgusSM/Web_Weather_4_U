export const TranslationFr = {
	name: 'Français',
	languages: {
		sp: 'Spanish',
		en: 'Anglais',
		pt: 'Portugais',
	},
	words: {
		writeCity: 'Écrivez une ville',
		lookingForSuggestions: 'À la recherche de matchs...',
		noSuggestions: 'Pas de correspondance',
		unit: {
			imperial: "Impérial",
			metric: "Métrique",
		},
		weatherIn: 'Météo à ',
		temperature: {
			feelsLike: 'Sensation thermique',
			unit: {
				imperial: '°F',
				metric: '°C',
			},
		},
		updatedAt: 'Mis à jour à ',
		date: 'Date ',
		humidity: 'Humidité',
		pressure: 'Pression',
		windInfo: {
			wind: 'Vent',
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
			visibility: 'Visibilité',
			unit: {
				imperial: 'mi',
				metric: 'm',
			},
		},
		airPollution: {
			aqi: "Qualité de l'aire",
			status: { 1: 'Bonne', 2: 'Acceptable', 3: 'Modérée', 4: 'Pauvre', 5: 'Très pauvre' },
			moreInfo: 'i',
			elements: {
				AQI: { label: `Qualité de l'aire`, symbol: '(AQI)' },
				carbonMonoxide: { label: 'Monoxyde de carbone', symbol: '(CO)' },
				nitrogenMonoxide: { label: `Monoxyde d'azote`, symbol: '(NO)' },
				nitrogenDioxide: { label: `Dioxyde d'azote`, symbol: '(NO₂)' },
				ozone: { label: 'Ozone', symbol: '(O₃)' },
				sulphurDioxide: { label: 'Dioxyde de soufre', symbol: '(SO₂)' },
				fineParticlesMatter: { label: 'Fines particules de matière', symbol: '(PM2.5)' },
				coarseParticulateMatter: { label: 'Particules de matière grossière', symbol: '(PM₁₀)' },
				ammonia: { label: 'Ammoniac', symbol: '(NH₃)' },
			},
		},
		sunrise: 'Lever du soleil',
		sunset: 'Coucher de soleil',
		locationNotFound: {
			funnyMessage: "Notre boussole n'a pas trouvé la ville ",
			realMessage: 'Veuillez réessayer avec un autre emplacement',
			noData: 'Aucune donnée',
		},
		conectionError: 'Problème de connexion au service météo',
		back: 'Derrière',
	},
	socialNetworks: {
		myInfo: {
			nameAndDegree: 'Bonjour, je suis Rodolfo Agustín Silva Messano Ingénieur des Systèmes.',
			likeAndView: 'Si vous avez aimé mon application, je vous invite à visiter mes réseaux sociaux.',
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
		errorFetchingSuggestions: "Erreur réseau : une erreur s'est produite lors de la récupération des suggestions. Veuillez réessayer plus tard",
	}
};

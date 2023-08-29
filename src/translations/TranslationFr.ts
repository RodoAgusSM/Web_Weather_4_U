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
			feelsLike: 'Sensation thermique: ',
			unit: {
				imperial: '°F',
				metric: '°C',
			},
		},
		updatedAt: 'Mis à jour à ',
		date: 'Date ',
		humidity: 'Humidité: ',
		pressure: 'Pression: ',
		windInfo: {
			wind: 'Vent: ',
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
			visibility: 'Visibilité: ',
			unit: {
				imperial: 'mi',
				metric: 'm',
			},
		},
		airPollution: {
			aqi: "Qualité de l'aire: ",
			status: { 1: 'Bonne', 2: 'Acceptable', 3: 'Modérée', 4: 'Pauvre', 5: 'Très pauvre' },
			moreInfo: 'i',
			elements: {
				AQI: `Qualité de l'aire`,
				carbonMonoxide: 'Monoxyde de carbone',
				nitrogenMonoxide: `Monoxyde d'azote`,
				nitrogenDioxide: `Dioxyde d'azote`,
				ozone: 'Ozone',
				sulphurDioxide: 'Dioxyde de soufre',
				fineParticlesMatter: 'Fines particules de matière',
				coarseParticulateMatter: 'Particules de matière grossière',
				ammonia: 'Ammoniac',
			},
		},
		sunrise: 'Lever du soleil: ',
		sunset: 'Coucher de soleil: ',
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
				abbrebiation: 'LinkedIn: ',
				username: 'rodolfosilvamessano',
				link: 'https://www.linkedin.com/in/rodolfosilvamessano/',
			},
			gitHub: { abbrebiation: 'GitHub: ', username: 'RodoAgusSM', link: 'https://github.com/RodoAgusSM' },
			iG: { abbrebiation: 'Instagram: ', username: 'rodoagus_94', link: 'https://www.instagram.com/rodoagus_94' },
			tW: { abbrebiation: 'Twitter: ', username: 'RodoAgusSM', link: 'https://twitter.com/RodoAgusSM' },
			fB: { abbrebiation: 'Facebook: ', username: 'RodoAgusSM', link: 'https://www.facebook.com/RodoAgusSM' },
		},
	},
	errors: {
		errorFetchingSuggestions: "Erreur réseau : une erreur s'est produite lors de la récupération des suggestions. Veuillez réessayer plus tard",
	}
};

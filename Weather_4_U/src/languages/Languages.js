export const findLanguageByKey = (key) => {
	const language = languages.find((language) => language.key === key);
	const data = {
		key: language.key,
		words: language.words,
		socialNetworks: language.socialNetworks,
	};
	return data;
};

export const getLanguagesNames = () => {
	let items = [];
	languages.forEach((language) => {
		const item = { name: language.name, key: language.key };
		items.push(item);
	});
	return items;
};

const languages = [
	{
		name: 'Español',
		key: 'sp',
		languages: {
			english: 'Inglés',
			portugues: 'Portugués',
			french: 'Francés',
		},
		words: {
			weatherIn: 'Clima actual en ',
			feelsLike: 'Sensación térmica: ',
			updatedAt: 'Actualizado a las ',
			date: 'Fecha ',
			humidity: 'Humedad: ',
			pressure: 'Presión: ',
			wind: 'Viento: ',
			conectionError: 'Problema en la conexión con el proveedor del clima',
			back: 'Volver',
		},
		socialNetworks: {
			myInfo: [
				{ nameAndDegree: 'Hola, soy Rodolfo Agustín Silva Messano Ingeniero en Sistemas.' },
				{ likeAndView: 'Si te estas disfrutando mi app, te invito a que visites mis redes sociales.' },
			],
			networks: [
				{
					abbrebiation: 'linkedIn: ',
					username: 'rodolfosilvamessano',
					link: 'https://www.linkedin.com/in/rodolfosilvamessano/',
				},
				{ abbrebiation: 'github: ', username: 'RodoAgusSM', link: 'https://github.com/RodoAgusSM' },
				{ abbrebiation: 'ig: ', username: 'rodoagus_94', link: 'https://www.instagram.com/rodoagus_94' },
				{ abbrebiation: 'tw: ', username: 'RodoAgusSM', link: 'https://twitter.com/RodoAgusSM' },
				{ abbrebiation: 'fb: ', username: 'RodoAgusSM', link: 'https://www.facebook.com/RodoAgusSM' },
			],
		},
	},
	{
		name: 'English',
		key: 'en',
		languages: {
			spanish: 'Spanish',
			portugues: 'Portuguese',
			french: 'French',
		},
		words: {
			weatherIn: 'Current weather in ',
			feelsLike: 'Feels like: ',
			updatedAt: 'Updated at ',
			date: 'Date ',
			humidity: 'Humidity: ',
			pressure: 'Pression: ',
			wind: 'Wind: ',
			conectionError: 'Problem connecting to weather provider',
			back: 'Back',
		},
		socialNetworks: {
			myInfo: [
				{ nameAndDegree: 'Hello, I am Rodolfo Agustín Silva Messano Software Engineer.' },
				{ likeAndView: 'If you are enjoying my app, I invite you to visit my social networks.' },
			],
			networks: [
				{
					abbrebiation: 'linkedIn: ',
					username: 'rodolfosilvamessano',
					link: 'https://www.linkedin.com/in/rodolfosilvamessano/',
				},
				{ abbrebiation: 'github: ', username: 'RodoAgusSM', link: 'https://github.com/RodoAgusSM' },
				{ abbrebiation: 'ig: ', username: 'rodoagus_94', link: 'https://www.instagram.com/rodoagus_94' },
				{ abbrebiation: 'tw: ', username: 'RodoAgusSM', link: 'https://twitter.com/RodoAgusSM' },
				{ abbrebiation: 'fb: ', username: 'RodoAgusSM', link: 'https://www.facebook.com/RodoAgusSM' },
			],
		},
	},
	{
		name: 'Português',
		key: 'pt',
		languages: {
			spanish: 'Espanhol',
			english: 'Inglês',
			french: 'Francês',
		},
		words: {
			weatherIn: 'Clima atual em ',
			feelsLike: 'Sensação termica: ',
			updatedAt: 'Atualizado em ',
			date: 'Encontro ',
			humidity: 'Umidade: ',
			pressure: 'Pressão: ',
			wind: 'Vento: ',
			conectionError: 'Problema ao conectar ao provedor de clima',
			back: 'Retorna',
		},
		socialNetworks: {
			myInfo: [
				{ nameAndDegree: 'Olá, sou Rodolfo Agustín Silva Messano Engenheiro de Sistemas.' },
				{ likeAndView: 'Se você está gostando do meu aplicativo, convido você a visitar minhas redes sociais.' },
			],
			networks: [
				{
					abbrebiation: 'linkedIn: ',
					username: 'rodolfosilvamessano',
					link: 'https://www.linkedin.com/in/rodolfosilvamessano/',
				},
				{ abbrebiation: 'github: ', username: 'RodoAgusSM', link: 'https://github.com/RodoAgusSM' },
				{ abbrebiation: 'ig: ', username: 'rodoagus_94', link: 'https://www.instagram.com/rodoagus_94' },
				{ abbrebiation: 'tw: ', username: 'RodoAgusSM', link: 'https://twitter.com/RodoAgusSM' },
				{ abbrebiation: 'fb: ', username: 'RodoAgusSM', link: 'https://www.facebook.com/RodoAgusSM' },
			],
		},
	},
	{
		name: 'Français',
		key: 'fr',
		languages: {
			spanish: 'Spanish',
			english: 'Anglais',
			portugues: 'Portugais',
		},
		words: {
			weatherIn: 'Météo actuelle à ',
			feelsLike: 'Sensation thermique: ',
			updatedAt: 'Mis à jour à ',
			date: 'Date ',
			humidity: 'Humidité: ',
			pressure: 'Pression: ',
			wind: 'Vent: ',
			conectionError: 'Problème de connexion au service météo',
			back: 'Derrière',
		},
		socialNetworks: {
			myInfo: [
				{ nameAndDegree: 'Bonjour, je suis Rodolfo Agustín Silva Messano Ingénieur des Systèmes.' },
				{ likeAndView: 'Si vous appréciez mon application, je vous invite à visiter mes réseaux sociaux.' },
			],
			networks: [
				{
					abbrebiation: 'linkedIn: ',
					username: 'rodolfosilvamessano',
					link: 'https://www.linkedin.com/in/rodolfosilvamessano/',
				},
				{ abbrebiation: 'github: ', username: 'RodoAgusSM', link: 'https://github.com/RodoAgusSM' },
				{ abbrebiation: 'ig: ', username: 'rodoagus_94', link: 'https://www.instagram.com/rodoagus_94' },
				{ abbrebiation: 'tw: ', username: 'RodoAgusSM', link: 'https://twitter.com/RodoAgusSM' },
				{ abbrebiation: 'fb: ', username: 'RodoAgusSM', link: 'https://www.facebook.com/RodoAgusSM' },
			],
		},
	},
];

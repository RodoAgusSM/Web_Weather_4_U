export const findLanguageByKey = (key) => {
	const language = languages.find((language) => language.key === key);
	const data = {
		key: language.key,
		words: language.words,
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
		},
	},
];

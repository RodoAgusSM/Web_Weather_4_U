export let openWeatherMapURL =
	'https://api.openweathermap.org/data/2.5/weather?q=Montevideo&units=Metric&lang=sp&APPID=' +
	process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
export let iconURL = 'https://openweathermap.org/img/wn/';
export let Directions = [
	'N',
	'NNE',
	'NE',
	'ENE',
	'E',
	'ESE',
	'SE',
	'SSE',
	'S',
	'SSO',
	'SO',
	'OSO',
	'O',
	'ONO',
	'NO',
	'NNO',
];
export let iconExtension = '@2x.png';

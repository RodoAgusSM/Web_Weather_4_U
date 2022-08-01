export const findCityCoordsByName = (name) => {
	return coordinates.find((coordinates) => coordinates.name === name).coords;
};

export const citiesNames = () => {
	let cities = [];
	coordinates.forEach((item) => {
		cities.push(item.name);
	});
	return cities;
};

const coordinates = [
	{ name: 'Montevideo', coords: { lat: -34.8335, lon: 56.1674 } },
	{ name: 'Punta del Este', coords: { lat: -34.9667, lon: -54.95 } },
	{ name: 'Colonia', coords: { lat: -34.1667, lon: -57.5 } },
	{ name: 'Buenos Aires', coords: { lat: -34.6132, lon: 58.3772 } },
	{ name: 'Canelones', coords: { lat: -34.5228, lon: -56.2778 } },
	{ name: 'Salto', coords: { lat: -31.3833, lon: -57.9667 } },
	{ name: 'Paysandú', coords: { lat: -32.3214, lon: -58.0756 } },
	{ name: 'Tacuarembo', coords: { lat: -31.7333, lon: -55.9833 } },
	{ name: 'Durazno', coords: { lat: -33.4131, lon: -56.5006 } },
	{ name: 'Florida', coords: { lat: -33.8333, lon: -55.9167 } },
	{ name: 'Cerro Largo', coords: { lat: -32.3333, lon: -54.3333 } },
	{ name: 'Río Negro', coords: { lat: -33.1325, lon: -58.2956 } },
	{ name: 'Soriano', coords: { lat: -33.5, lon: -57.75 } },
	{ name: 'Flores', coords: { lat: -33.5389, lon: -56.8886 } },
	{ name: 'Paso de los Toros', coords: { lat: -32.8167, lon: -56.5167 } },
	{ name: 'New York', coords: { lat: 40.7143, lon: -74.006 } },
	{ name: 'Rio de Janeiro', coords: { lat: -22.90283, lon: -43.2075 } },
	{ name: 'Florianópolis', coords: { lat: -27.6146, lon: -48.5012 } },
	{ name: 'Santiago', coords: { lat: -33.4569, lon: -70.6483 } },
	{ name: 'Cancún', coords: { lat: 21.1743, lon: -86.8466 } },
];

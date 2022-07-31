import React from 'react';
import { citiesNames } from '../../coordinates/CityCoordinates';
import { CitiesContainer, CityButton } from '../../styles/styles';
const Cities = ({ actualCity, changeCity }) => {
	const cities = citiesNames().filter((cityName) => cityName !== actualCity);
	return (
		<CitiesContainer>
			{cities.map((name) => (
				<CityButton
					key={name}
					onClick={() => {
						changeCity(name);
					}}>
					{name}
				</CityButton>
			))}
		</CitiesContainer>
	);
};

export default Cities;

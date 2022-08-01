import React from 'react';
import { getCitiesNames } from '../../coordinates/CityCoordinates';
import { CitiesContainer, CityButton } from '../../styles/styles';
const City = ({ actualCity, changeCity }) => {
	const cities = getCitiesNames().filter((cityName) => cityName !== actualCity);
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

export default City;

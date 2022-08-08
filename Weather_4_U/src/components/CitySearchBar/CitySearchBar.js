import React from 'react';
import { SearchBarContainer, SearchBar } from '../../styles/styles';
import { useTranslation } from 'react-i18next';

const CitySearchBar = ({ changeCity }) => {
	const { t } = useTranslation();
	const _handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			changeCity(namesToUpperCase(e.target.value));
		}
	};

	const namesToUpperCase = (newCityName) => {
		const words = newCityName.split(' ');
		let cityName = '';
		let firstWord = true;
		words.forEach((element) => {
			if (firstWord) {
				cityName = element.charAt(0).toUpperCase() + element.slice(1);
				firstWord = false;
			} else cityName = cityName + ' ' + element.charAt(0).toUpperCase() + element.slice(1);
		});
		return cityName;
	};

	return (
		<SearchBarContainer>
			<SearchBar type='text' placeholder={t('words.writeCity')} onKeyDown={_handleKeyDown}></SearchBar>
		</SearchBarContainer>
	);
};

export default CitySearchBar;

import React from 'react';
import { SearchBarContainer, SearchBar } from '../../styles/styles';
import { findLanguageByKey } from '../../languages/Languages';

const CitySearchBar = ({ actualLanguage, changeCity }) => {
	const fullLanguage = findLanguageByKey(actualLanguage);
	const _handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			changeCity(e.target.value);
		}
	};

	return (
		<SearchBarContainer>
			<SearchBar type='text' placeholder={fullLanguage.words.writeCity} onKeyDown={_handleKeyDown}></SearchBar>
		</SearchBarContainer>
	);
};

export default CitySearchBar;

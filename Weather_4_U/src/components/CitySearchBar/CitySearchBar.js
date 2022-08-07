import React from 'react';
import { SearchBarContainer, SearchBar } from '../../styles/styles';
import { useTranslation } from 'react-i18next';

const CitySearchBar = ({ actualLanguage, changeCity }) => {
	const { t } = useTranslation();
	const _handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			changeCity(e.target.value);
		}
	};

	return (
		<SearchBarContainer>
			<SearchBar type='text' placeholder={t('words.writeCity')} onKeyDown={_handleKeyDown}></SearchBar>
		</SearchBarContainer>
	);
};

export default CitySearchBar;

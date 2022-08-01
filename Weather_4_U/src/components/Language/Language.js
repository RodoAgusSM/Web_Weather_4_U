import React from 'react';
import { getLanguagesNames } from '../../languages/Languages';
import { LanguagesContainer, LanguageButton } from '../../styles/styles';
const Language = ({ actualLanguage, changeLanguage }) => {
	const languages = getLanguagesNames().filter((language) => language.key !== actualLanguage);
	return (
		<LanguagesContainer>
			{languages.map((language) => (
				<LanguageButton
					key={language.key}
					onClick={() => {
						changeLanguage(language.key);
					}}>
					{language.name}
				</LanguageButton>
			))}
		</LanguagesContainer>
	);
};

export default Language;

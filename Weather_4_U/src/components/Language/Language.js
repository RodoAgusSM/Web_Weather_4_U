import React from 'react';
import { LanguagesContainer, LanguageButton } from '../../styles/styles';
import { useTranslation } from 'react-i18next';

const Language = ({ changeLanguage }) => {
	const { t, i18n } = useTranslation();
	return (
		<LanguagesContainer>
			{Object.entries(t('languages', { returnObjects: true })).map((languageItem) => (
				<LanguageButton
					key={languageItem[0]}
					onClick={() => {
						changeLanguage(languageItem[0]);
					}}>
					{languageItem[1]}
				</LanguageButton>
			))}
		</LanguagesContainer>
	);
};

export default Language;

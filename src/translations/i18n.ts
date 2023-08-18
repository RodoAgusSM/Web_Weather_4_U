import { StorageKeys } from 'enums';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { TranslationEn } from './TranslationEn';
import { TranslationFr } from './TranslationFr';
import { TranslationPt } from './TranslationPt';
import { TranslationSp } from './TranslationSp';

const resources = {
	sp: { translation: TranslationSp },
	en: { translation: TranslationEn },
	pt: { translation: TranslationPt },
	fr: { translation: TranslationFr },
};

i18n
	.use(initReactI18next)
	.init({
		resources,
		lng: localStorage.getItem(StorageKeys.language) ?? 'sp',
		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { TranslationEn } from './TranslationEn';
import { TranslationSp } from './TranslationSp';
import { TranslationPt } from './TranslationPt';
import { TranslationFr } from './TranslationFr';

const resources = {
	sp: { translation: TranslationSp },
	en: { translation: TranslationEn },
	pt: { translation: TranslationPt },
	fr: { translation: TranslationFr },
};

i18n
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources,
		lng: localStorage.getItem('language') ?? 'sp',
		interpolation: {
			escapeValue: false, // react already safes from xss
		},
	});

export default i18n;

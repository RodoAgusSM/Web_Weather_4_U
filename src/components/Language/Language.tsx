import { StorageKeys } from 'enums/index';
import { useTranslation } from 'react-i18next';
import { LanguageButton, LanguagesContainer } from 'styles/styles';

const Language = ({ changeLanguage }: any) => {
  const { t } = useTranslation();
  return (
    <LanguagesContainer>
      {Object.entries(
        t(StorageKeys.LANGUAGES, {
          returnObjects: true,
        })
      ).map((languageItem) => (
        <LanguageButton
          key={languageItem[0]}
          onClick={() => {
            changeLanguage(languageItem[0]);
          }}
        >
          {languageItem[1]}
        </LanguageButton>
      ))}
    </LanguagesContainer>
  );
};

export default Language;

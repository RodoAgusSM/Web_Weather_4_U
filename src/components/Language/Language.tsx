import { StorageKeys } from 'enums/index';
import useDimensions from 'hooks/useDimensions';
import { useTranslation } from 'react-i18next';

import { LanguageButton, LanguagesContainer } from './LanguageStyles';

const Language = ({ changeLanguage }: any) => {
  const { isMobileDevice, isSmallMobileDevice } = useDimensions();
  const { t } = useTranslation();
  return (
    <LanguagesContainer isMobileDevice={isMobileDevice} isSmallMobileDevice={isSmallMobileDevice}>
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

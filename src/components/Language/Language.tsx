import useDimensions from 'hooks/useDimensions';
import { useTranslation } from 'react-i18next';

import { LanguageButton, LanguagesContainer } from './LanguageStyles';

interface LanguageProps {
  changeLanguage: (languageCode: string) => void;
}

const Language = ({ changeLanguage }: LanguageProps) => {
  const { isMobileDevice, isSmallMobileDevice } = useDimensions();
  const { t } = useTranslation();
  return (
    <LanguagesContainer $isMobileDevice={isMobileDevice} $isSmallMobileDevice={isSmallMobileDevice}>
      {Object.entries(
        t('languages', {
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

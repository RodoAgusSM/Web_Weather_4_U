import { useEffect, useState } from 'react';
import useResponsiveDesign from 'hooks/useResponsiveDesign';
import { useTranslation } from 'react-i18next';

import { LanguageButton, LanguagesContainer } from './LanguageStyles';

interface LanguageProps {
  changeLanguage: (languageCode: string) => void;
}

const Language = ({ changeLanguage }: LanguageProps) => {
  const { isMobileDevice, isSmallMobileDevice, isTouchDevice, screenWidth } = useResponsiveDesign();

  const { t, i18n } = useTranslation();
  const [useAbbreviatedLabels, setUseAbbreviatedLabels] = useState(screenWidth < 360);

  // Monitor screen width and update abbreviation state
  useEffect(() => {
    const handleResize = () => {
      setUseAbbreviatedLabels(window.innerWidth < 360);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Choose shorter labels for very small screens
  const getLanguageLabel = (code: string, label: string): string => {
    // On small screens or when window width is below threshold, use abbreviated labels
    if (useAbbreviatedLabels || isSmallMobileDevice || screenWidth < 360) {
      switch (code) {
        case 'en':
          return 'EN';
        case 'es':
          return 'ES';
        case 'pt':
          return 'PT';
        case 'fr':
          return 'FR';
        default:
          return code.toUpperCase();
      }
    }
    return label;
  };

  return (
    <LanguagesContainer
      $isMobileDevice={isMobileDevice}
      $isSmallMobileDevice={isSmallMobileDevice}
      $isTouchDevice={isTouchDevice}
      $useAbbreviatedLabels={useAbbreviatedLabels}
    >
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
          style={{
            fontWeight: i18n.language === languageItem[0] ? '600' : '400',
            opacity: i18n.language === languageItem[0] ? 1 : 0.8,
          }}
          $isActive={i18n.language === languageItem[0]}
        >
          {getLanguageLabel(languageItem[0], languageItem[1] as string)}
        </LanguageButton>
      ))}
    </LanguagesContainer>
  );
};

export default Language;

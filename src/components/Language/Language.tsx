import { useCallback, useMemo } from 'react';
import useResponsiveDesign from 'hooks/useResponsiveDesign';
import { useTranslation } from 'react-i18next';

import { LanguageButton, LanguagesContainer } from './LanguageStyles';

interface LanguageProps {
  changeLanguage: (languageCode: string) => void;
}

const Language = ({ changeLanguage }: LanguageProps) => {
  const { isMobileDevice, isSmallMobileDevice, isTouchDevice, screenWidth } = useResponsiveDesign();
  const { t, i18n } = useTranslation();

  const useAbbreviatedLabels = useMemo(() =>
    screenWidth < 360 || isSmallMobileDevice,
    [screenWidth, isSmallMobileDevice]
  );

  const getLanguageLabel = useCallback((code: string, label: string): string => {
    if (useAbbreviatedLabels) {
      switch (code) {
        case 'en': return 'EN';
        case 'es': return 'ES';
        case 'pt': return 'PT';
        case 'fr': return 'FR';
        default:   return code.toUpperCase();
      }
    }
    return label;
  }, [useAbbreviatedLabels]);

  const languageItems = useMemo(() => {
    const items = t('languages', { returnObjects: true }) as Record<string, string>;
    return Object.entries(items).map(([code, label]) => ({
      code,
      label: getLanguageLabel(code, label),
      isActive: i18n.language === code
    }));
  }, [t, i18n.language, getLanguageLabel]);

  const handleLanguageChange = useCallback((code: string) => {
    changeLanguage(code);
  }, [changeLanguage]);

  return (
    <LanguagesContainer
      $isMobileDevice={isMobileDevice}
      $isSmallMobileDevice={isSmallMobileDevice}
      $isTouchDevice={isTouchDevice}
      $useAbbreviatedLabels={useAbbreviatedLabels}
    >
      {languageItems.map(({ code, label, isActive }) => (
        <LanguageButton
          key={code}
          onClick={() => handleLanguageChange(code)}
          style={{
            fontWeight: isActive ? '600' : '400',
            opacity: isActive ? 1 : 0.8,
          }}
          $isActive={isActive}
        >
          {label}
        </LanguageButton>
      ))}
    </LanguagesContainer>
  );
};

export default Language;

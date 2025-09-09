import { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StorageKey } from 'shared/enums/index';

import brasilFlag from '../../../images/brasilFlag.png';
import franceFlag from '../../../images/franceFlag.png';
import spainFlag from '../../../images/spainFlag.png';
import usaFlag from '../../../images/usaFlag.png';
import useResponsiveDesign from '../../hooks/useResponsiveDesign';
import { Dropdown, DropdownItem } from '../Dropdown/Dropdown';

import { LanguageContainer } from './LanguageStyles';

const FlagImage = ({ src, alt }: { src: string; alt: string }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        style={{
          width: '20px',
          height: '15px',
          borderRadius: '2px',
          backgroundColor: '#e0e0e0',
        }}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      style={{
        width: '20px',
        height: '15px',
        borderRadius: '2px',
        objectFit: 'cover',
      }}
    />
  );
};

const LANGUAGE_DATA: Record<string, { label: string; flagUrl: string }> = {
  en: {
    label: 'English',
    flagUrl: usaFlag,
  },
  fr: {
    label: 'French',
    flagUrl: franceFlag,
  },
  pt: {
    label: 'Portuguese',
    flagUrl: brasilFlag,
  },
  sp: {
    label: 'Spanish',
    flagUrl: spainFlag,
  },
};

interface LanguageProps {
  changeLanguage: (languageCode: string) => void;
}

const Language = ({ changeLanguage }: LanguageProps) => {
  const { isMobileDevice, isSmallMobileDevice, isTouchDevice } = useResponsiveDesign();
  const { t, i18n } = useTranslation();

  const languageDropdownItems = useMemo(() => {
    const items = t('languages', { returnObjects: true }) as Record<string, string>;
    return Object.entries(items).map(([code, label]) => ({
      id: code,
      value: code,
      label: label,
      icon: LANGUAGE_DATA[code]?.flagUrl ? (
        <FlagImage src={LANGUAGE_DATA[code].flagUrl} alt={`${label} flag`} />
      ) : undefined,
    }));
  }, [t]);

  const currentLanguageItem = useMemo(() => {
    return languageDropdownItems.find(item => item.value === i18n.language);
  }, [languageDropdownItems, i18n.language]);

  const handleLanguageSelect = useCallback(
    (item: DropdownItem<string>) => {
      changeLanguage(item.value);
    },
    [changeLanguage],
  );

  const language = localStorage.getItem(StorageKey.Language) ?? 'sp';
  const langData = LANGUAGE_DATA[language] || LANGUAGE_DATA.sp;

  const defaultLanguage: DropdownItem<string> = {
    id: language,
    value: language,
    label: langData.label,
    icon: <FlagImage src={langData.flagUrl} alt={`${langData.label} flag`} />,
  };

  return (
    <LanguageContainer
      $isMobileDevice={isMobileDevice}
      $isSmallMobileDevice={isSmallMobileDevice}
      $isTouchDevice={isTouchDevice}>
      <Dropdown
        items={languageDropdownItems}
        selectedValue={currentLanguageItem}
        defaultValue={defaultLanguage}
        onSelect={handleLanguageSelect}
        placeholder={t('selectLanguage')}
      />
    </LanguageContainer>
  );
};

export default memo(Language);
(Language as any).displayName = 'Language';

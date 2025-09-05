import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { openStreetMapURL } from 'config/config';
import useResponsiveDesign from 'hooks/useResponsiveDesign';
import { City } from 'interfaces/index';
import { useTranslation } from 'react-i18next';
import { SingleValue } from 'react-select';
import AsyncSelect from 'react-select/async';
import { toast } from 'react-toastify';

import { SearchBarContainer, SearchBarWrapper, StyledToastContainer } from './CitySearchBarStyles';

import 'react-toastify/dist/ReactToastify.css';

interface CitySearchBarProps {
  changeCity: (
    city: SingleValue<{ label: string; value: { lat: string; lon: string; name: string } }>,
  ) => void;
}

const CitySearchBar = ({ changeCity }: CitySearchBarProps) => {
  const { t } = useTranslation();
  const { isDesktopOrLaptop, isMobileDevice, isSmallMobileDevice, isTouchDevice } =
    useResponsiveDesign();
  const [openSearchBar, setOpenSearchBar] = useState<boolean | null>(null);
  const [inputVal, setInputVal] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const selectRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const collapseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        openSearchBar
      ) {
        setIsMenuOpen(false);
        setInputVal('');
        setOpenSearchBar(false);
        if (selectRef.current) {
          selectRef.current.blur();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (collapseTimeoutRef.current) {
        clearTimeout(collapseTimeoutRef.current);
      }
    };
  }, [openSearchBar]);

  const handleMouseEnter = useCallback(() => {
    if (collapseTimeoutRef.current) {
      clearTimeout(collapseTimeoutRef.current);
    }
    setOpenSearchBar(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    collapseTimeoutRef.current = setTimeout(() => {
      setIsMenuOpen(false);
      setInputVal('');
      setOpenSearchBar(false);
      if (selectRef.current) {
        isDesktopOrLaptop && selectRef.current.blur();
      }
    }, 300);
  }, []);

  const notifyError = (message: string) => {
    toast.error(message);
  };

  const fetchSuggestions = useCallback(async (inputValue: string) => {
    const fullUrl = `${openStreetMapURL}&city=${inputValue}`;
    try {
      const response = await fetch(fullUrl);
      if (response.ok) {
        const data = await response.json();
        return handleSuggestions(data);
      } else {
        const errorMessage = `Error: ${response.status} ${await response.text()}`;
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error(t('errors.errorFetchingSuggestions'));
    }
    return [];
  }, []);

  const handleSuggestions = useCallback((cities: City[]) => {
    return cities.map(({ display_name, lat, lon }) => ({
      label: display_name,
      value: {
        name: display_name.split(',')[0],
        lat,
        lon,
      },
    }));
  }, []);

  const handleChangeCity = useCallback(
    (
      newCity: SingleValue<{ label: string; value: { lat: string; lon: string; name: string } }>,
    ) => {
      if (newCity) {
        changeCity(newCity);
      }
    },
    [changeCity],
  );

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      display: 'flex',
      backgroundColor: 'rgba(255, 255, 255, 0.55)',
      borderRadius: '8px',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      cursor: 'pointer',
      boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
      minHeight: '38px',
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.55)',
        boxShadow: '0 4px 8px rgba(0,0,0,0.12)',
      },
      overflow: 'hidden',
    }),
    placeholder: (provided: any) => ({
      ...provided,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '90%',
      color: '#2C3E50',
      opacity: 0.8,
      fontWeight: 500,
      fontSize: '0.9rem',
    }),
    input: (provided: any) => ({
      ...provided,
      color: '#2C3E50',
      fontFamily: "'Poppins', sans-serif",
      fontSize: '0.9rem',
    }),
    singleValue: (provided: any, state: any) => ({
      ...provided,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      opacity: state.isDisabled ? 0.5 : 1,
      transition: 'opacity 300ms',
      color: '#2C3E50',
      fontWeight: 500,
      fontSize: '0.9rem',
    }),
    option: (provided: any, { isFocused, isSelected }: any) => ({
      ...provided,
      cursor: 'pointer',
      backgroundColor: isSelected
        ? '#3498DB'
        : isFocused
        ? 'rgba(52, 152, 219, 0.1)'
        : 'transparent',
      color: isSelected ? 'white' : '#2C3E50',
      fontWeight: isSelected ? 600 : 400,
      fontSize: '0.9rem',
      padding: '8px 12px',
      fontFamily: "'Poppins', sans-serif",
      transition: 'background-color 0.2s ease',
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    }),
    noOptionsMessage: (provided: any) => ({
      ...provided,
      color: '#7F8C8D',
      fontSize: '0.85rem',
      fontFamily: "'Poppins', sans-serif",
    }),
    loadingMessage: (provided: any) => ({
      ...provided,
      color: '#7F8C8D',
      fontSize: '0.85rem',
      fontFamily: "'Poppins', sans-serif",
    }),
  };

  const handleTouchInteraction = useCallback(() => {
    if (isTouchDevice) {
      setOpenSearchBar(true);

      if (selectRef.current) {
        setTimeout(() => {
          selectRef.current.focus();
        }, 100);
      }
    }
  }, [isTouchDevice]);

  const getTouchStyles = useCallback(() => {
    if (isTouchDevice) {
      return {
        control: (base: any) => ({
          ...base,
          borderRadius: '8px',
          minHeight: '44px',
        }),
        input: (base: any) => ({
          ...base,
          borderRadius: '8px',
          fontSize: '16px',
        }),
      };
    }
    return {};
  }, [isTouchDevice]);

  return (
    <>
      <StyledToastContainer position="bottom-center" theme="light" />
      <SearchBarWrapper>
        <SearchBarContainer
          ref={containerRef}
          $isDesktopOrLaptop={isDesktopOrLaptop}
          $isMobileDevice={isMobileDevice}
          $isSmallMobileDevice={isSmallMobileDevice}
          $openSearchBar={openSearchBar}
          onClick={() => {
            setOpenSearchBar(true);
            if (isTouchDevice && selectRef.current) {
              selectRef.current.focus();
            }
          }}
          onMouseEnter={isTouchDevice ? undefined : handleMouseEnter}
          onMouseLeave={isTouchDevice ? undefined : handleMouseLeave}
          onTouchStart={handleTouchInteraction}>
          <AsyncSelect
            ref={selectRef}
            inputValue={inputVal}
            placeholder={openSearchBar ? t('words.writeCity') : '🔍'}
            loadOptions={(inputValue, callback) => {
              fetchSuggestions(inputValue)
                .then(callback)
                .catch(() => {
                  notifyError(t('words.errors.errorFetchingSuggestions'));
                  callback([]);
                });
            }}
            menuIsOpen={isMenuOpen}
            onInputChange={value => setInputVal(value)}
            onChange={handleChangeCity}
            loadingMessage={({ inputValue }) => inputValue && t('words.lookingForSuggestions')}
            noOptionsMessage={({ inputValue }) => inputValue && t('words.noSuggestions')}
            styles={{ ...customStyles, ...getTouchStyles() }}
            components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
            filterOption={null}
            onMenuOpen={() => {
              if (collapseTimeoutRef.current) {
                clearTimeout(collapseTimeoutRef.current);
              }
              setIsMenuOpen(true);
            }}
          />
        </SearchBarContainer>
      </SearchBarWrapper>
    </>
  );
};

export default memo(CitySearchBar);
(CitySearchBar as any).displayName = 'CitySearchBar';

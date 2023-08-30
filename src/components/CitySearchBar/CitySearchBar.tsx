import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { openStreetMapURL } from 'config/config';
import useDimensions from 'hooks/useDimensions';
import { City } from 'interfaces/index';
import { useTranslation } from 'react-i18next';
import { SingleValue } from 'react-select';
import AsyncSelect from 'react-select/async';
import { toast } from 'react-toastify';
import { Colors } from 'styles/colors';

import { SearchBarContainer, SearchBarWrapper, StyledToastContainer } from './CitySearchBarStyles';

import 'react-toastify/dist/ReactToastify.css';

const CitySearchBar = ({ changeCity }: any) => {
  const { t } = useTranslation();
  const { isDesktopOrLaptop, isMobileDevice, isSmallMobileDevice } = useDimensions();
  const [openSearchBar, setOpenSearchBar] = useState<boolean | null>(null);
  const [inputVal, setInputVal] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const selectRef = useRef<any>(null);
  const collapseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (collapseTimeoutRef.current) {
        clearTimeout(collapseTimeoutRef.current);
      }
    };
  }, []);

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
        selectRef.current.blur();
      }
    }, 300);
  }, []);

  const notifyError = (message: string) => {
    console.log('HERE IS ::', message);
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
      newCity: SingleValue<{ label: string; value: { lat: string; lon: string; name: string } }>
    ) => {
      if (newCity) {
        changeCity(newCity);
      }
    },
    [changeCity]
  );

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      display: 'flex',
      backgroundColor: Colors.veryPaleOrange,
      borderRadius: openSearchBar ? '8px' : '25px',
      border: `2px solid ${Colors.whiteChocolate}`,
      cursor: 'pointer',
      boxShadow: `2px 2px 6px 1px ${Colors.sonicSilver}`,
      '&:hover': {
        backgroundColor: Colors.whiteChocolate,
        boxShadow: `2px 2px 6px 1px ${Colors.darkCharcoal}`,
      },
      overflow: 'hidden',
    }),
    placeholder: (provided: any) => ({
      ...provided,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '90%',
    }),
    singleValue: (provided: any, state: any) => {
      const whiteSpace = 'nowrap';
      const overflow = 'hidden';
      const textOverflow = 'ellipsis';
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, whiteSpace, overflow, textOverflow, opacity, transition };
    },
    option: (provided: any) => ({
      ...provided,
      cursor: 'pointer', // This will give options a cursor pointer
    }),
  };

  return (
    <>
      <StyledToastContainer position="bottom-center" theme="light" />
      <SearchBarWrapper>
        <SearchBarContainer
          isDesktopOrLaptop={isDesktopOrLaptop}
          isMobileDevice={isMobileDevice}
          isSmallMobileDevice={isSmallMobileDevice}
          openSearchBar={openSearchBar}
          onClick={() => setOpenSearchBar(true)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
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
            onInputChange={(value) => setInputVal(value)}
            onChange={handleChangeCity}
            loadingMessage={({ inputValue }) => inputValue && t('words.lookingForSuggestions')}
            noOptionsMessage={({ inputValue }) => inputValue && t('words.noSuggestions')}
            styles={customStyles}
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

import { useState } from 'react';
import { openStreetMapURL } from 'config/config';
import useDimensions from 'hooks/useDimensions';
import { useTranslation } from 'react-i18next';
import { SingleValue } from 'react-select';
import AsyncSelect from 'react-select/async';
import { Colors } from 'styles/colors';
import { SearchBarContainer, SearchBarWrapper } from 'styles/styles';

const CitySearchBar = ({ changeCity }: any) => {
  const { t } = useTranslation();
  const { isDesktopOrLaptop, isMobileDevice, isSmallMobileDevice } = useDimensions();
  const [openSearchBar, setOpenSearchBar] = useState<boolean | null>(null);

  const fetchSuggestions = async (inputValue: string) => {
    try {
      const fullUrl = openStreetMapURL + '&city=' + inputValue;
      const response = await fetch(fullUrl);
      if (response.ok) {
        const data = await response.json();
        return handleSuggestions(data);
      } else {
        console.log(response.status, response.text);
      }
    } catch (error) {
      console.log(error);
    }
    return [];
  };

  const handleSuggestions = async (cities: any[]) => {
    console.log(cities);
    return cities.map((city) => ({
      label: city.display_name,
      value: {
        name: city.display_name.split(',')[0],
        lat: city.lat,
        lon: city.lon,
      },
    }));
  };

  const handleChangeCity = (
    newCity: SingleValue<{ label: string; value: { lat: string; lon: string; name: string } }>
  ) => {
    if (newCity) {
      changeCity(newCity);
    }
  };

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      borderBottom: `1px dotted ${Colors.pearlAqua}`,
      color: state.isSelected ? 'green' : Colors.black,
      backgroundColor: Colors.veryPaleOrange,
      fontSize: '14px',
      padding: 15,
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: Colors.whiteChocolate,
        color: Colors.darkSlateGray,
      },
    }),
    control: () => ({
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
      '::placeholder': {
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: Colors.sonicSilver,
        opacity: 1 /* Firefox */,
      },
      ':-ms-input-placeholder': {
        /* Internet Explorer 10-11 */
        color: Colors.sonicSilver,
      },
      '::-ms-input-placeholder': {
        /* Microsoft Edge */
        color: Colors.sonicSilver,
      },
    }),
    singleValue: (provided: any, state: any) => {
      const whiteSpace = 'nowrap';
      const overflow = 'hidden';
      const textOverflow = 'ellipsis';
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, whiteSpace, overflow, textOverflow, opacity, transition };
    },
  };

  return (
    <SearchBarWrapper>
      <SearchBarContainer
        isDesktopOrLaptop={isDesktopOrLaptop}
        isMobileDevice={isMobileDevice}
        isSmallMobileDevice={isSmallMobileDevice}
        openSearchBar={openSearchBar}
        onClick={() => setOpenSearchBar(true)}
        onMouseEnter={() => setOpenSearchBar(true)}
      >
        <AsyncSelect
          placeholder={openSearchBar ? t('words.writeCity') : '🔍'}
          loadOptions={(inputValue: string, callback) => {
            fetchSuggestions(inputValue)
              .then((options) => callback(options))
              .catch((error) => {
                console.error(error);
                callback([]);
              });
          }}
          onChange={handleChangeCity}
          loadingMessage={({ inputValue }) =>
            !inputValue ? null : t('words.lookingForSuggestions')
          }
          noOptionsMessage={({ inputValue }) => (!inputValue ? null : t('words.noSuggestions'))}
          styles={customStyles}
          components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
          filterOption={null}
          onBlur={() => setOpenSearchBar(false)}
        />
      </SearchBarContainer>
    </SearchBarWrapper>
  );
};

export default CitySearchBar;

import { useState } from 'react';
import { openStreetMapURL } from 'config/config';
import { StorageKeys } from 'enums';
import useDimensions from 'hooks/useDimensions';
import { useTranslation } from 'react-i18next';
import { SingleValue } from 'react-select';
import AsyncSelect from 'react-select/async';
import { Colors } from 'styles/colors';
import {
  CleanSearchBarButton,
  CleanSearchBarButtonContainer,
  CleanSearchBarContainer,
  SearchBarContainer,
} from 'styles/styles';

const CitySearchBar = ({ changeCity }: any) => {
  const { t } = useTranslation();
  const { isDesktopOrLaptop, isMobileDevice, isSmallMobileDevice } = useDimensions();
  let [city, setCity] = useState(localStorage.getItem(StorageKeys.FULLCITYNAME) || '');

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
      setCity(newCity.label);
      changeCity(newCity);
    }
  };

  const handleInputChange = (inputValue: string, action: { action: string }) => {
    if (action.action !== 'input-blur' && action.action !== 'menu-close') {
      setCity(inputValue);
    }
  };

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      borderBottom: `1px dotted ${Colors.wateryGreenToneDown}`,
      color: state.isSelected ? 'green' : Colors.black,
      backgroundColor: Colors.lightOrange,
      fontSize: '14px',
      padding: 15,
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: Colors.lightWhite,
        color: Colors.darkerGreen,
      },
    }),
    control: () => ({
      display: 'flex',
      width: isDesktopOrLaptop
        ? '470px'
        : isMobileDevice
        ? '450px'
        : isSmallMobileDevice
        ? '270px'
        : '',
      backgroundColor: Colors.lightOrange,
      borderRadius: '8px',
      border: `2px solid ${Colors.lightWhite}`,
      cursor: 'pointer',
      boxShadow: `2px 2px 6px 1px ${Colors.shadowGrey}`,
      '&:hover': {
        backgroundColor: Colors.lightWhite,
        boxShadow: `2px 2px 6px 1px ${Colors.shadowBlack}`,
      },
      '::placeholder': {
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: Colors.shadowGrey,
        opacity: 1 /* Firefox */,
      },
      ':-ms-input-placeholder': {
        /* Internet Explorer 10-11 */
        color: Colors.shadowGrey,
      },
      '::-ms-input-placeholder': {
        /* Microsoft Edge */
        color: Colors.shadowGrey,
      },
    }),
    singleValue: (provided: any, state: any) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition };
    },
  };

  return (
    <SearchBarContainer>
      <AsyncSelect
        placeholder={t('words.writeCity')}
        loadOptions={(inputValue: string, callback) => {
          fetchSuggestions(inputValue)
            .then((options) => callback(options))
            .catch((error) => {
              console.error(error);
              callback([]);
            });
        }}
        onChange={handleChangeCity}
        onInputChange={handleInputChange}
        defaultInputValue={city}
        inputValue={city}
        loadingMessage={({ inputValue }) => (!inputValue ? null : t('words.lookingForSuggestions'))}
        noOptionsMessage={({ inputValue }) => (!inputValue ? null : t('words.noSuggestions'))}
        styles={customStyles}
        filterOption={null}
      />
      <CleanSearchBarContainer>
        <CleanSearchBarButtonContainer>
          <CleanSearchBarButton onClick={() => setCity('')}>X</CleanSearchBarButton>
        </CleanSearchBarButtonContainer>
      </CleanSearchBarContainer>
    </SearchBarContainer>
  );
};

export default CitySearchBar;

import { useState } from 'react';
import { openStreetMapURL } from 'config/config';
import { useTranslation } from 'react-i18next';
import AsyncSelect from 'react-select/async';
import { Colors } from 'styles/colors';
import { CleanSearchBarButton, CleanSearchBarContainer, SearchBarContainer } from 'styles/styles';

const CitySearchBar = ({ changeCity }: any) => {
  const { t } = useTranslation();
  let [city, setCity] = useState(localStorage.getItem('cityFullName') || '');

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

  const handleChangeCity = (cityItem: any) => {
    setCity(cityItem.label);
    changeCity(cityItem);
  };

  const handleInputChange = (inputValue: any, action: any) => {
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
      width: '89%',
      backgroundColor: Colors.lightOrange,
      borderRadius: '8px',
      border: `2px solid ${Colors.lightWhite}`,
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: Colors.lightWhite,
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
      <CleanSearchBarContainer onClick={() => setCity('')}>
        <CleanSearchBarButton onClick={() => setCity('')}>X</CleanSearchBarButton>
      </CleanSearchBarContainer>
    </SearchBarContainer>
  );
};

export default CitySearchBar;

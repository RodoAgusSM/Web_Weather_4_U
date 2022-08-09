import React, { useState, useEffect } from 'react';
import { SearchBarContainer, CleanSearchBarContainer, CleanSearchBarButton } from '../../styles/styles';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Colors } from '../../styles/colors';
import { openStreetMapURL } from '../../config/config';
import AsyncSelect from 'react-select/async';

const CitySearchBar = ({ changeCity }) => {
	const { t } = useTranslation();
	let [city, setCity] = useState(localStorage.getItem('cityFullName') ?? '');

	useEffect(() => {}, [city]);

	const fetchSuggestions = async (name) => {
		try {
			const fullUrl = openStreetMapURL + '&city=' + name;
			const response = await axios.get(fullUrl);
			return handleSuggestions(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSuggestions = async (cities) => {
		let suggestions = [];
		cities.map((city) => {
			let item = {
				label: city.display_name,
				value: {
					name: city.display_name.split(',')[0],
					lat: city.lat,
					lon: city.lon,
				},
			};
			suggestions.push(item);
		});
		return suggestions;
	};

	const handleChangeCity = (cityItem) => {
		setCity(cityItem.label);
		changeCity(cityItem);
	};

	const handleInputChange = (inputValue, action) => {
		if (action.action !== 'input-blur' && action.action !== 'menu-close') {
			setCity(inputValue);
		}
	};

	const customStyles = {
		option: (provided, state) => ({
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
		singleValue: (provided, state) => {
			const opacity = state.isDisabled ? 0.5 : 1;
			const transition = 'opacity 300ms';

			return { ...provided, opacity, transition };
		},
	};

	return (
		<SearchBarContainer>
			<AsyncSelect
				placeholder={t('words.writeCity')}
				loadOptions={fetchSuggestions}
				onChange={handleChangeCity}
				onInputChange={handleInputChange}
				defaultInputValue={city}
				inputValue={city}
				loadingMessage={({ inputValue }) => (!inputValue ? null : t('words.lookingForSuggestions'))}
				noOptionsMessage={({ inputValue }) => (!inputValue ? null : t('words.noSuggestions'))}
				styles={customStyles}
				filterOptions={false}
			/>
			<CleanSearchBarContainer onClick={() => setCity('')}>
				<CleanSearchBarButton onClick={() => setCity('')}>X</CleanSearchBarButton>
			</CleanSearchBarContainer>
		</SearchBarContainer>
	);
};

export default CitySearchBar;

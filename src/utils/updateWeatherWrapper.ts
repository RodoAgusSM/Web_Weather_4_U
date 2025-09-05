import { StorageKey, Units } from 'enums/index';
import { Weather } from 'interfaces/index';

import {
  celsiusToFahrenheit,
  convertFrom12To24Hours,
  convertFrom24To12Hours,
  fahrenheitToCelsius,
  getLastDateChecked,
  getLastDateCheckedAmerican,
  getLastTimeChecked,
  getLastTimeChecked12HoursFormat,
  kmToMiles,
  milesToKm,
} from './helpers';

const formatTimeByLanguage = (weatherData: Weather): Weather => {
  const isEnglish = localStorage.getItem(StorageKey.Language) === 'en';

  return {
    ...weatherData,
    sunrise: isEnglish
      ? convertFrom24To12Hours(weatherData.sunrise)
      : convertFrom12To24Hours(weatherData.sunrise),
    sunset: isEnglish
      ? convertFrom24To12Hours(weatherData.sunset)
      : convertFrom12To24Hours(weatherData.sunset),
    lastTimeChecked: isEnglish ? getLastTimeChecked12HoursFormat() : getLastTimeChecked(),
    lastDateChecked: isEnglish ? getLastDateCheckedAmerican() : getLastDateChecked(),
  };
};

const convertMeasurementUnits = (weatherData: Weather, targetUnit: string): Weather => {
  const isImperial = targetUnit === Units.Imperial;
  const isCurrentlyMetric = typeof weatherData.realFeel === 'number' && weatherData.realFeel < 50;
  const needsConversion = isImperial ? isCurrentlyMetric : !isCurrentlyMetric;

  if (!needsConversion) {
    return weatherData;
  }

  return {
    ...weatherData,
    realFeel: isImperial
      ? celsiusToFahrenheit(weatherData.realFeel)
      : fahrenheitToCelsius(weatherData.realFeel),
    feelsLike: isImperial
      ? celsiusToFahrenheit(weatherData.feelsLike)
      : fahrenheitToCelsius(weatherData.feelsLike),
    windSpeed: isImperial ? kmToMiles(weatherData.windSpeed) : milesToKm(weatherData.windSpeed),
    visibility: isImperial ? kmToMiles(weatherData.visibility) : milesToKm(weatherData.visibility),
  };
};

export { convertMeasurementUnits, formatTimeByLanguage };

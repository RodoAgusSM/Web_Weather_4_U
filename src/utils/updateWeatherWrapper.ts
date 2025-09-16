import { StorageKey, Units } from 'shared/enums/index';

import Weather from '../domain/entities/Weather';

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

const convertMeasurementUnits = (weatherData: Weather, targetUnit: string): Weather => {
  const isImperial = targetUnit === Units.Imperial;
  const isCurrentlyMetric = typeof weatherData.realFeel === 'number' && weatherData.realFeel < 50;
  const needsConversion = isImperial ? isCurrentlyMetric : !isCurrentlyMetric;

  if (!needsConversion) {
    return weatherData;
  }

  const convertedWeather = {
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

  return ensureCorrectTimeFormat(convertedWeather);
};

const ensureCorrectTimeFormat = (weatherData: Weather): Weather => {
  const currentLanguage = localStorage.getItem(StorageKey.Language);
  const isEnglish = currentLanguage === 'en';

  if (!weatherData || typeof weatherData !== 'object') {
    return weatherData;
  }

  const formatTimeForLanguage = (timeString: string): string => {
    if (!timeString || typeof timeString !== 'string') {
      return timeString;
    }

    const hasAmPm = timeString.includes('AM') || timeString.includes('PM');

    if (isEnglish) {
      if (hasAmPm) {
        return timeString;
      } else {
        const converted = convertFrom24To12Hours(timeString);
        return converted || timeString;
      }
    } else {
      if (!hasAmPm) {
        return timeString;
      } else {
        const converted = convertFrom12To24Hours(timeString);
        return converted || timeString;
      }
    }
  };

  const result = {
    ...weatherData,
    sunrise: formatTimeForLanguage(weatherData.sunrise),
    sunset: formatTimeForLanguage(weatherData.sunset),
  };

  console.log(
    `[Time Format] Language: ${currentLanguage}, Sunrise: ${weatherData.sunrise} → ${result.sunrise}, Sunset: ${weatherData.sunset} → ${result.sunset}`,
  );

  return result;
};

const formatTimeByLanguage = (weatherData: Weather): Weather => {
  const timeFormattedWeather = ensureCorrectTimeFormat(weatherData);

  const currentLanguage = localStorage.getItem(StorageKey.Language);
  const isEnglish = currentLanguage === 'en';

  return {
    ...timeFormattedWeather,
    lastTimeChecked: isEnglish ? getLastTimeChecked12HoursFormat() : getLastTimeChecked(),
    lastDateChecked: isEnglish ? getLastDateCheckedAmerican() : getLastDateChecked(),
  };
};

export { convertMeasurementUnits, ensureCorrectTimeFormat, formatTimeByLanguage };

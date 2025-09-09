import { ClimateType, StorageKey, Units } from 'shared/enums/index';

import AirPollution from '../domain/entities/AirPollution';
import Weather from '../domain/entities/Weather';

import {
  formatTimeToPreferredFormat,
  getLastDateChecked,
  getLastDateCheckedAmerican,
  getLastTimeChecked,
  getLastTimeChecked12HoursFormat,
  getWindDirection,
  truncateToOneDecimal,
} from './helpers';

export const convertOpenWeatherMapResponseToInterface = (
  climateType: ClimateType,
  object: any,
  unit: Units,
): Weather | AirPollution => {
  switch (climateType) {
    case ClimateType.Weather:
      return convertToWeather(object, unit);
    case ClimateType.AirPollution:
      return convertToAirPollution(object);
    default:
      throw new Error(`Unsupported ClimateType: ${String(climateType)}`);
  }
};

const convertToWeather = (object: any, unit: Units) => {
  return {
    realFeel: Math.round(object.main.temp),
    feelsLike: Math.round(object.main.feels_like),
    description:
      object.weather[0].description.charAt(0).toUpperCase() +
      object.weather[0].description.substring(1),
    icon: object.weather[0]?.icon
      ? `https://openweathermap.org/img/wn/${object.weather[0].icon}@4x.png`
      : '',
    humidity: object.main.humidity,
    pressure: object.main.pressure,
    windSpeed:
      Units.Imperial === unit
        ? truncateToOneDecimal(object.wind.speed)
        : truncateToOneDecimal(object.wind.speed * 3.6),
    windDirection: getWindDirection(object),
    visibility:
      Units.Imperial === unit
        ? truncateToOneDecimal(object.visibility / 1609.344)
        : object.visibility,
    sunrise:
      localStorage.getItem(StorageKey.Language) === 'en'
        ? formatTimeToPreferredFormat(object.sys.sunrise, true)
        : formatTimeToPreferredFormat(object.sys.sunrise),
    sunset:
      localStorage.getItem(StorageKey.Language) === 'en'
        ? formatTimeToPreferredFormat(object.sys.sunset, true)
        : formatTimeToPreferredFormat(object.sys.sunset),
    clouds: object.clouds.all,
    lastTimeChecked:
      localStorage.getItem(StorageKey.Language) === 'en'
        ? getLastTimeChecked12HoursFormat()
        : getLastTimeChecked(),
    lastDateChecked:
      localStorage.getItem(StorageKey.Language) === 'en'
        ? getLastDateCheckedAmerican()
        : getLastDateChecked(),
  } as Weather;
};

const convertToAirPollution = (object: any) => {
  const mainAQI = object?.main?.aqi;
  const components = object?.components;
  return {
    AQI: mainAQI,
    ammonia: components?.nh3,
    carbonMonoxide: components?.co,
    coarseParticulateMatter: components?.pm10,
    nitrogenDioxide: components?.no2,
    nitrogenMonoxide: components?.no,
    ozone: components?.o3,
    sulphurDioxide: components?.so2,
    fineParticlesMatter: components?.pm2_5,
  } as AirPollution;
};

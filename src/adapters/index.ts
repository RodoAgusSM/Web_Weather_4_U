import { APIWeatherProvider, ClimateType, Units } from 'shared/enums/index';
import { convertMeasurementUnits, formatTimeByLanguage } from 'utils/updateWeatherWrapper';

import AirPollution from '../domain/entities/AirPollution';
import Weather from '../domain/entities/Weather';

import { adaptOpenWeatherMap } from './openWeatherMapAdapter';

type AdapterResult = Weather | AirPollution;

export const Adapter = (
  apiWeatherProvider: APIWeatherProvider,
  climateType: ClimateType,
  unit: Units,
  object: unknown,
): AdapterResult => {
  switch (apiWeatherProvider) {
    case APIWeatherProvider.OpenWeatherMap:
      return adaptOpenWeatherMap(climateType, object, unit);
    default:
      throw new Error(`Unsupported APIWeatherProvider: ${String(apiWeatherProvider)}`);
  }
};

export { Adapter as default };

export const convertWeatherUnits = (targetUnit: Units, weatherData: Weather) => {
  return convertMeasurementUnits(weatherData, targetUnit);
};

export const formatWeatherTimeByLanguage = (weatherData: Weather) => {
  return formatTimeByLanguage(weatherData);
};

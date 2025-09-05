import { APIWeatherProvider, ClimateType, Units } from 'enums/index';
import { AirPollution, Weather } from 'interfaces/index';
import { convertOpenWeatherMapResponseToInterface } from 'utils/openWeatherMapInterfaceWrapper';
import { convertMeasurementUnits, formatTimeByLanguage } from 'utils/updateWeatherWrapper';

type AdapterResult = Weather | AirPollution;

const Adapter = (
  apiWeatherProvider: APIWeatherProvider,
  climateType: ClimateType,
  unit: Units,
  object: unknown,
): AdapterResult => {
  switch (apiWeatherProvider) {
    case APIWeatherProvider.OpenWeatherMap: {
      const result = convertOpenWeatherMapResponseToInterface(climateType, object, unit);
      if (!result) throw new Error(`Adapter could not convert payload for ${String(climateType)}`);
      return result;
    }
    default:
      throw new Error(`Unsupported APIWeatherProvider: ${String(apiWeatherProvider)}`);
  }
};

const formatWeatherTimeByLanguage = (weatherData: Weather) => {
  return formatTimeByLanguage(weatherData);
};

const convertWeatherUnits = (targetUnit: Units, weatherData: Weather) => {
  return convertMeasurementUnits(weatherData, targetUnit);
};

export { Adapter, convertWeatherUnits, formatWeatherTimeByLanguage };

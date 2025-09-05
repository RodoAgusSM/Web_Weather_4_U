import { ClimateType, Units } from 'enums/index';
import { AirPollution, Weather } from 'interfaces/index';
import { convertOpenWeatherMapResponseToInterface } from 'utils/openWeatherMapInterfaceWrapper';

export function adaptOpenWeatherMap(
  climateType: ClimateType,
  object: unknown,
  unit: Units,
): Weather | AirPollution {
  const result = convertOpenWeatherMapResponseToInterface(climateType, object, unit);
  if (!result)
    throw new Error(`OpenWeatherMap adapter could not convert payload for ${String(climateType)}`);
  return result;
}

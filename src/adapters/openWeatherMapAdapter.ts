import { ClimateType, Units } from 'shared/enums/index';
import { convertOpenWeatherMapResponseToInterface } from 'utils/openWeatherMapInterfaceWrapper';

import AirPollution from '../domain/entities/AirPollution';
import Weather from '../domain/entities/Weather';

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

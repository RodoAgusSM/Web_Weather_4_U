import { Adapter } from 'adapter/adapter';
import { APIWeatherProvider, ClimateType, Units } from 'enums/index';
import { AppRequest } from 'interfaces/index';
import { generateURL } from 'utils/helpers';

import { IWeatherProvider } from './IWeatherProvider';

export class OpenWeatherMapProvider implements IWeatherProvider {
  constructor() {}

  async getWeather(request: AppRequest) {
    const url = generateURL(request);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const raw = await res.json();
    const units = request.units as unknown as Units;
    const adapted = Adapter(APIWeatherProvider.OpenWeatherMap, ClimateType.Weather, units, raw);
    return { adapted, raw };
  }

  async getAirPollution(request: AppRequest) {
    const url = generateURL(request);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const raw = await res.json();
    const list = raw?.list?.[0] ?? raw;
    const units2 = request.units as unknown as Units;
    const adapted = Adapter(
      APIWeatherProvider.OpenWeatherMap,
      ClimateType.AirPollution,
      units2,
      list,
    );
    return { adapted, raw };
  }
}

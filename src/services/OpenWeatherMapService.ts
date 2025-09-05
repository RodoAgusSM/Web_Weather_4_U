import { AppRequest } from 'interfaces/index';
import { OpenWeatherMapAirRaw, OpenWeatherMapWeatherRaw } from 'types/OpenWeatherMapTypes';
import { generateURL } from 'utils/helpers';

import { IWeatherService } from './IWeatherService';

export class OpenWeatherMapService implements IWeatherService {
  constructor() {}

  async getWeather(request: AppRequest): Promise<OpenWeatherMapWeatherRaw> {
    const url = generateURL(request);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const raw = (await res.json()) as OpenWeatherMapWeatherRaw;
    return raw;
  }

  async getAirPollution(request: AppRequest): Promise<OpenWeatherMapAirRaw> {
    const url = generateURL(request);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const raw = (await res.json()) as OpenWeatherMapAirRaw;
    return raw;
  }
}

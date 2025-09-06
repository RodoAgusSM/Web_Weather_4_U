import { AppRequest } from 'interfaces/index';
import { OpenWeatherMapAirRaw, OpenWeatherMapWeatherRaw } from 'types/OpenWeatherMapTypes';

export interface IWeatherService {
  getWeather(request: AppRequest): Promise<OpenWeatherMapWeatherRaw>;
  getAirPollution(request: AppRequest): Promise<OpenWeatherMapAirRaw>;
}

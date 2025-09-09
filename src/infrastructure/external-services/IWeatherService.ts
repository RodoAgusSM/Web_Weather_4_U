import AppRequest from '../../shared/types/AppRequest';
import {
  OpenWeatherMapAirRaw,
  OpenWeatherMapWeatherRaw,
} from '../../shared/types/OpenWeatherMapTypes';

export interface IWeatherService {
  getWeather(request: AppRequest): Promise<OpenWeatherMapWeatherRaw>;
  getAirPollution(request: AppRequest): Promise<OpenWeatherMapAirRaw>;
}

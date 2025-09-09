import AppRequest from '../../shared/types/AppRequest';
import {
  OpenWeatherMapAirRaw,
  OpenWeatherMapWeatherRaw,
} from '../../shared/types/OpenWeatherMapTypes';
import AirPollution from '../entities/AirPollution';
import Weather from '../entities/Weather';

export interface WeatherResponse {
  adapted: Weather;
  raw: OpenWeatherMapWeatherRaw;
}

export interface AirPollutionResponse {
  adapted: AirPollution;
  raw: OpenWeatherMapAirRaw;
}

export interface IWeatherRepository {
  fetchWeather(request: AppRequest): Promise<WeatherResponse>;
  fetchAirPollution(request: AppRequest): Promise<AirPollutionResponse>;
  clearAllCache(): void;
  getCacheInfo(): { size: number; keys: string[] };
}

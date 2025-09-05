import { AppRequest } from 'interfaces/index';

export interface IWeatherProvider {
  getWeather(request: AppRequest): Promise<{ adapted: any; raw: any }>;
  getAirPollution(request: AppRequest): Promise<{ adapted: any; raw: any }>;
}

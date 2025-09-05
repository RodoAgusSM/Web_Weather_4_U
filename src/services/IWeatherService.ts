import { AppRequest } from 'interfaces/index';

export interface IWeatherService {
  getWeather(request: AppRequest): Promise<{ adapted: any; raw: any }>;
  getAirPollution(request: AppRequest): Promise<{ adapted: any; raw: any }>;
}

// Use named export for interface compatibility across the codebase

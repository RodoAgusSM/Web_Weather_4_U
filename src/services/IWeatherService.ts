import { AppRequest } from 'interfaces/index';
import { OpenWeatherMapAirRaw, OpenWeatherMapWeatherRaw } from 'types/OpenWeatherMapTypes';

// Provider/services return raw payloads only. Adapting to domain models is the
// responsibility of the repository (adapter layer).
export interface IWeatherService {
  getWeather(request: AppRequest): Promise<OpenWeatherMapWeatherRaw>;
  getAirPollution(request: AppRequest): Promise<OpenWeatherMapAirRaw>;
}

// Use named export for interface compatibility across the codebase

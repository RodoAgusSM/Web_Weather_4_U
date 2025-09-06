import { IWeatherService } from 'services/IWeatherService';
import { OpenWeatherMapService } from 'services/OpenWeatherMapService';

export type WeatherProviderType = string;

type ProviderFactory = () => IWeatherService;

const registry = new Map<WeatherProviderType, ProviderFactory>();

export const registerWeatherProvider = (type: WeatherProviderType, factory: ProviderFactory) => {
  if (registry.has(type)) throw new Error(`Provider already registered for type: ${type}`);
  registry.set(type, factory);
};

export const getWeatherProvider = (type: WeatherProviderType): IWeatherService => {
  const factory = registry.get(type);
  if (!factory) throw new Error(`Unknown provider type: ${type}`);
  return factory();
};

export const DEFAULT_WEATHER_PROVIDER: WeatherProviderType = 'OpenWeatherMap';

registerWeatherProvider(DEFAULT_WEATHER_PROVIDER, () => new OpenWeatherMapService());

export const WeatherProviderFactory = {
  getProvider: getWeatherProvider,
  registerProvider: registerWeatherProvider,
};

export default WeatherProviderFactory;

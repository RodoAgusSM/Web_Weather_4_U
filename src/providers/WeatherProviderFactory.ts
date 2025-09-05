import { IWeatherService } from 'services/IWeatherService';
import { OpenWeatherMapService } from 'services/OpenWeatherMapService';

// ProviderType is an extensible string so new providers can be registered
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

// Default provider name
export const DEFAULT_WEATHER_PROVIDER: WeatherProviderType = 'OpenWeatherMap';

// Register built-in providers here (keeps module closed for modification elsewhere)
registerWeatherProvider(DEFAULT_WEATHER_PROVIDER, () => new OpenWeatherMapService());

// Backwards-compatible aliases
export const WeatherProviderFactory = {
  getProvider: getWeatherProvider,
  registerProvider: registerWeatherProvider,
};

export default WeatherProviderFactory;

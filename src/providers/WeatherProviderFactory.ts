import { APIWeatherProvider } from 'shared/enums/index';

import { IWeatherService } from '../infrastructure/external-services/IWeatherService';
import { OpenWeatherMapService } from '../infrastructure/external-services/OpenWeatherMapService';

export class ServiceFactory {
  private static services = new Map<APIWeatherProvider, IWeatherService>();
  private static factories = new Map<APIWeatherProvider, () => IWeatherService>();
  private static initialized = false;

  private static initialize(): void {
    if (!this.initialized) {
      this.registerFactory(APIWeatherProvider.OpenWeatherMap, () => new OpenWeatherMapService());
      this.initialized = true;
    }
  }

  static registerFactory(provider: APIWeatherProvider, factory: () => IWeatherService): void {
    this.factories.set(provider, factory);
  }

  static createWeatherService(provider: APIWeatherProvider): IWeatherService {
    this.initialize();

    if (this.services.has(provider)) {
      return this.services.get(provider)!;
    }

    const factory = this.factories.get(provider);
    if (!factory) {
      throw new Error(`Unsupported weather provider: ${provider}`);
    }

    const service = factory();
    this.services.set(provider, service);
    return service;
  }

  static clearCache(): void {
    this.services.clear();
  }

  static clearFactory(provider: APIWeatherProvider): void {
    this.services.delete(provider);
    this.factories.delete(provider);
  }

  static getAvailableProviders(): APIWeatherProvider[] {
    return Array.from(this.factories.keys());
  }
}

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
  createService: ServiceFactory.createWeatherService,
  clearCache: ServiceFactory.clearCache,
};

export default WeatherProviderFactory;

import { Adapter } from '../../adapters';
import AirPollution from '../../domain/entities/AirPollution';
import Weather from '../../domain/entities/Weather';
import {
  AirPollutionResponse,
  IWeatherRepository,
  WeatherResponse,
} from '../../domain/repositories/IWeatherRepository';
import {
  DEFAULT_WEATHER_PROVIDER,
  getWeatherProvider,
  WeatherProviderFactory,
} from '../../providers/WeatherProviderFactory';
import { APIWeatherProvider, ClimateType } from '../../shared/enums/index';
import AppRequest from '../../shared/types/AppRequest';
import {
  OpenWeatherMapAirListItem,
  OpenWeatherMapAirRaw,
  OpenWeatherMapWeatherRaw,
} from '../../shared/types/OpenWeatherMapTypes';
import { NetworkError, ProviderError } from '../errors';
import { IWeatherService } from '../external-services/IWeatherService';
import { retry } from '../retry';

import { BaseRepository } from './BaseRepository';

interface WeatherCacheData {
  adapted: Weather | AirPollution;
  raw: OpenWeatherMapWeatherRaw | OpenWeatherMapAirRaw;
}

export class WeatherRepository
  extends BaseRepository<WeatherCacheData, string>
  implements IWeatherRepository
{
  private provider: IWeatherService;

  constructor(provider?: IWeatherService) {
    super();
    if (provider) {
      this.provider = provider;
      return;
    }

    const providerType =
      (typeof localStorage !== 'undefined' && localStorage.getItem('weatherProviderType')) ||
      DEFAULT_WEATHER_PROVIDER;
    try {
      this.provider = getWeatherProvider(providerType);
    } catch {
      this.provider = WeatherProviderFactory.getProvider(providerType as any);
    }
  }

  private createCacheKey(request: AppRequest): string {
    return `${request.lat}_${request.lon}_${request.units}_${request.toFetch}`;
  }

  async fetchWeather(request: AppRequest): Promise<WeatherResponse> {
    const cacheKey = this.createCacheKey(request);
    const cached = this.getCache(cacheKey);

    if (cached && cached.adapted) {
      return {
        adapted: cached.adapted as Weather,
        raw: cached.raw as OpenWeatherMapWeatherRaw,
      };
    }

    try {
      const raw = (await retry(() =>
        this.provider.getWeather(request),
      )) as OpenWeatherMapWeatherRaw;

      const adapted = Adapter(
        APIWeatherProvider.OpenWeatherMap,
        ClimateType.Weather,
        request.units,
        raw,
      ) as Weather;

      this.setCache(cacheKey, { adapted, raw });
      return { adapted, raw };
    } catch (err: any) {
      if (err instanceof Error && /network|failed to fetch/i.test(err.message)) {
        throw new NetworkError(err.message);
      }
      throw new ProviderError(err?.message ?? 'Unknown provider error');
    }
  }

  async fetchAirPollution(request: AppRequest): Promise<AirPollutionResponse> {
    const cacheKey = this.createCacheKey(request);
    const cached = this.getCache(cacheKey);

    if (cached && cached.adapted) {
      return {
        adapted: cached.adapted as AirPollution,
        raw: cached.raw as OpenWeatherMapAirRaw,
      };
    }

    try {
      const raw = (await retry(() =>
        this.provider.getAirPollution(request),
      )) as OpenWeatherMapAirRaw;
      const list: OpenWeatherMapAirListItem =
        raw?.list?.[0] ?? ({ main: raw?.main, components: raw?.components } as any);
      const adapted = Adapter(
        APIWeatherProvider.OpenWeatherMap,
        ClimateType.AirPollution,
        request.units,
        list,
      ) as AirPollution;

      this.setCache(cacheKey, { adapted, raw });
      return { adapted, raw };
    } catch (err: any) {
      if (err instanceof Error && /network|failed to fetch/i.test(err.message)) {
        throw new NetworkError(err.message);
      }
      throw new ProviderError(err?.message ?? 'Unknown provider error');
    }
  }

  async findById(id: string): Promise<WeatherCacheData> {
    const cached = this.getCache(id);
    if (!cached) {
      throw new Error(`Weather data not found for id: ${id}`);
    }
    return cached;
  }

  async save(entity: WeatherCacheData): Promise<WeatherCacheData> {
    return entity;
  }

  async delete(id: string): Promise<void> {
    this.clearCache(id);
  }

  // Additional utility methods
  clearAllCache(): void {
    this.clearCache();
  }

  getCacheInfo(): { size: number; keys: string[] } {
    return {
      size: this.getCacheSize(),
      keys: Array.from(this.cache.keys()),
    };
  }
}

import { Adapter } from 'adapters';
import { APIWeatherProvider, ClimateType } from 'enums/index';
import { NetworkError, ProviderError } from 'infrastructure/errors';
import { retry } from 'infrastructure/retry';
import AirPollution from 'interfaces/AirPollution';
import { AppRequest } from 'interfaces/index';
import Weather from 'interfaces/Weather';
import {
  DEFAULT_WEATHER_PROVIDER,
  getWeatherProvider,
  WeatherProviderFactory,
} from 'providers/WeatherProviderFactory';
import { IWeatherService } from 'services/IWeatherService';
import {
  OpenWeatherMapAirListItem,
  OpenWeatherMapAirRaw,
  OpenWeatherMapWeatherRaw,
} from 'types/OpenWeatherMapTypes';

export class WeatherRepository {
  private provider: IWeatherService;

  constructor(provider?: IWeatherService) {
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

  async fetchWeather(
    request: AppRequest,
  ): Promise<{ adapted: Weather; raw: OpenWeatherMapWeatherRaw }> {
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
      return { adapted, raw };
    } catch (err: any) {
      if (err instanceof Error && /network|failed to fetch/i.test(err.message)) {
        throw new NetworkError(err.message);
      }
      throw new ProviderError(err?.message ?? 'Unknown provider error');
    }
  }

  async fetchAirPollution(
    request: AppRequest,
  ): Promise<{ adapted: AirPollution; raw: OpenWeatherMapAirRaw }> {
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
      return { adapted, raw };
    } catch (err: any) {
      if (err instanceof Error && /network|failed to fetch/i.test(err.message)) {
        throw new NetworkError(err.message);
      }
      throw new ProviderError(err?.message ?? 'Unknown provider error');
    }
  }
}

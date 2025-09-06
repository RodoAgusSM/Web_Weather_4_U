import { ClimateType } from 'enums/index';
import AirPollution from 'interfaces/AirPollution';
import { AppRequest } from 'interfaces/index';
import Weather from 'interfaces/Weather';
import { WeatherRepository } from 'repositories/WeatherRepository';
import { OpenWeatherMapAirRaw, OpenWeatherMapWeatherRaw } from 'types/OpenWeatherMapTypes';

export class WeatherUseCase {
  constructor(private repo: WeatherRepository) {}

  async getCombinedWeather(request: AppRequest): Promise<{
    weather: Weather;
    air: AirPollution;
    rawWeather: OpenWeatherMapWeatherRaw;
    rawAir: OpenWeatherMapAirRaw;
  }> {
    try {
      const weatherReq: AppRequest = { ...request, toFetch: ClimateType.Weather };
      const airReq: AppRequest = { ...request, toFetch: ClimateType.AirPollution };

      const [weatherResp, airResp] = await Promise.all([
        this.repo.fetchWeather(weatherReq),
        this.repo.fetchAirPollution(airReq),
      ]);

      if (!weatherResp || !weatherResp.adapted) {
        throw new Error('Missing weather data from repository');
      }
      if (!airResp || !airResp.adapted) {
        throw new Error('Missing air pollution data from repository');
      }

      return {
        weather: weatherResp.adapted,
        rawWeather: weatherResp.raw,
        air: airResp.adapted,
        rawAir: airResp.raw,
      };
    } catch (err: any) {
      const { DomainError } = await import('infrastructure/errors');
      if (err instanceof DomainError) throw err;
      throw new DomainError(err?.message ?? 'Unknown domain error');
    }
  }
}

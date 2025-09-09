import AirPollution from '../../domain/entities/AirPollution';
import Weather from '../../domain/entities/Weather';
import { WeatherRepository } from '../../infrastructure/repositories/WeatherRepository';
import { ClimateType, Units } from '../../shared/enums/index';
import { Result } from '../../shared/result/Result';
import AppRequest from '../../shared/types/AppRequest';
import { GetCombinedWeatherCommand } from '../commands/weather/WeatherCommands';

export class WeatherUseCase {
  constructor(private repo: WeatherRepository) {}

  async getCombinedWeather(request: AppRequest): Promise<
    Result<
      {
        weather: Weather;
        air: AirPollution;
      },
      Error
    >
  > {
    try {
      const command = new GetCombinedWeatherCommand(request, this.repo);
      const result = await command.execute();

      return Result.ok({
        weather: result.weather,
        air: result.air,
      });
    } catch (error) {
      return Result.err(error instanceof Error ? error : new Error('Unknown error occurred'));
    }
  }

  async getWeatherByCity(
    cityName: string,
    units: Units,
    language: string,
  ): Promise<Result<Weather, Error>> {
    try {
      const request: AppRequest = {
        lat: 0,
        lon: 0,
        units,
        language,
        toFetch: ClimateType.Weather,
        cityName,
      };

      const result = await this.repo.fetchWeather(request);

      if (!result || !result.adapted) {
        return Result.err(new Error('Failed to fetch weather data'));
      }

      return Result.ok(result.adapted as Weather);
    } catch (error) {
      return Result.err(error instanceof Error ? error : new Error('Unknown error occurred'));
    }
  }

  async getAirPollution(lat: number, lon: number): Promise<Result<AirPollution, Error>> {
    try {
      const request: AppRequest = {
        lat,
        lon,
        units: Units.Metric,
        language: 'en',
        toFetch: ClimateType.AirPollution,
      };

      const result = await this.repo.fetchAirPollution(request);

      if (!result || !result.adapted) {
        return Result.err(new Error('Failed to fetch air pollution data'));
      }

      return Result.ok(result.adapted as AirPollution);
    } catch (error) {
      return Result.err(error instanceof Error ? error : new Error('Unknown error occurred'));
    }
  }
}

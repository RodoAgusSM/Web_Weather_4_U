import AirPollution from '../../../domain/entities/AirPollution';
import Weather from '../../../domain/entities/Weather';
import { WeatherRepository } from '../../../infrastructure/repositories/WeatherRepository';
import { ClimateType } from '../../../shared/enums/index';
import AppRequest from '../../../shared/types/AppRequest';
import { ICommand } from '../ICommand';

export class GetWeatherCommand implements ICommand<Weather> {
  constructor(
    private readonly request: AppRequest,
    private readonly weatherRepository: WeatherRepository,
  ) {}

  async execute(): Promise<Weather> {
    const weatherReq: AppRequest = { ...this.request, toFetch: ClimateType.Weather };
    const response = await this.weatherRepository.fetchWeather(weatherReq);

    if (!response || !response.adapted) {
      throw new Error('Failed to fetch weather data');
    }

    return response.adapted;
  }
}

export class GetAirPollutionCommand implements ICommand<AirPollution> {
  constructor(
    private readonly request: AppRequest,
    private readonly weatherRepository: WeatherRepository,
  ) {}

  async execute(): Promise<AirPollution> {
    const airReq: AppRequest = { ...this.request, toFetch: ClimateType.AirPollution };
    const response = await this.weatherRepository.fetchAirPollution(airReq);

    if (!response || !response.adapted) {
      throw new Error('Failed to fetch air pollution data');
    }

    return response.adapted;
  }
}

export class GetCombinedWeatherCommand
  implements
    ICommand<{
      weather: Weather;
      air: AirPollution;
    }>
{
  constructor(
    private readonly request: AppRequest,
    private readonly weatherRepository: WeatherRepository,
  ) {}

  async execute(): Promise<{ weather: Weather; air: AirPollution }> {
    const weatherCommand = new GetWeatherCommand(this.request, this.weatherRepository);
    const airCommand = new GetAirPollutionCommand(this.request, this.weatherRepository);

    const [weather, air] = await Promise.all([weatherCommand.execute(), airCommand.execute()]);

    return { weather, air };
  }
}

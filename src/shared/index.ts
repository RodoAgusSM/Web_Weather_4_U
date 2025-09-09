// Result Pattern
export * from './enums';
export type {
  AirPollutionUpdateEvent,
  ErrorEvent,
  IObserver,
  ISubject,
  IWeatherObserver,
  WeatherEvent,
  WeatherUpdateEvent,
} from './observer/Observer';
export { Subject, WeatherSubject } from './observer/Observer';
export { Result } from './result/Result';

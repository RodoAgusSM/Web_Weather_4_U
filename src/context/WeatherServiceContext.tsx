// Compatibility stub
// NOTE: The app has moved to a ServiceContainer pattern where providers are
// created and injected by `ServiceContainerProvider`. Direct use of
// `WeatherServiceContext` is deprecated. Keep this file as a clear failure
// message to prevent accidental direct provider usage.

export function useWeatherService(): never {
  throw new Error(
    'useWeatherService is deprecated. Use useServiceContainer() from context/ServiceContainerContext instead.',
  );
}

export default null;

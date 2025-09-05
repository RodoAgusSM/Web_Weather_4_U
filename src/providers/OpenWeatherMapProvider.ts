// Compatibility shim: OpenWeatherMapProvider was previously responsible for fetching
// and adapting data. The codebase now places fetching in `services/` and adapting
// in the repository via `adapters`. To avoid breaking imports, re-export the
// service implementation here.

export { OpenWeatherMapService as OpenWeatherMapProvider } from '../services/OpenWeatherMapService';

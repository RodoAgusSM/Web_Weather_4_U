import { useCallback, useEffect, useRef, useState } from 'react';
import { useWeatherService } from 'context/WeatherServiceContext';
import { ClimateType, Units } from 'enums/index';
import { AppRequest } from 'interfaces/index';
import { IWeatherService } from 'services/IWeatherService';
import { OpenWeatherMapService } from 'services/OpenWeatherMapService';

export interface UseWeatherOptions {
  lat: number;
  lon: number;
  language: string;
  unit: Units;
  fetchIntervalMs?: number;
}

export interface UseWeatherResult {
  weather: any;
  airPollution: any;
  isLoading: boolean;
  siteWorking: boolean;
  iconWorking: boolean;
  error?: any;
  refetch: () => Promise<void>;
  rawWeather?: any;
  rawAir?: any;
}

const defaultFetchInterval = 600000;

const useWeather = (
  { lat, lon, language, unit, fetchIntervalMs }: UseWeatherOptions,
  provider?: IWeatherService,
): UseWeatherResult => {
  const [weather, setWeather] = useState<any>({});
  const [airPollution, setAirPollution] = useState<any>({});
  const [rawWeather, setRawWeather] = useState<any>(null);
  const [rawAir, setRawAir] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [siteWorking, setSiteWorking] = useState(true);
  const [iconWorking, setIconWorking] = useState(true);
  const [error, setError] = useState<any>(null);

  const intervalRef = useRef<number | null>(null);
  const initialLoadRef = useRef(true);

  // prefer injected provider from context when available
  let injected: IWeatherService | null = null;
  try {
    injected = useWeatherService();
  } catch (e) {
    // not wrapped in provider, fallback to default
  }

  const weatherProvider = provider ?? injected ?? new OpenWeatherMapService();
  const providerRef = useRef<IWeatherService | null>(null);
  if (!providerRef.current) providerRef.current = weatherProvider;

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    try {
      const weatherReq: AppRequest = {
        toFetch: ClimateType.Weather,
        lat,
        lon,
        language,
        units: unit,
      };
      const airReq: AppRequest = {
        toFetch: ClimateType.AirPollution,
        lat,
        lon,
        language,
        units: unit,
      };

      const [weatherResp, airResp] = await Promise.all([
        providerRef.current!.getWeather(weatherReq),
        providerRef.current!.getAirPollution(airReq),
      ]);

      setSiteWorking(true);
      setIconWorking(true);

      setWeather(weatherResp.adapted ?? {});
      setAirPollution(airResp.adapted ?? {});

      setRawWeather(weatherResp.raw);
      setRawAir(airResp.raw);

      setError(null);
    } catch (err) {
      console.error('useWeather fetch error', err);
      setError(err);
      setSiteWorking(false);
    } finally {
      setIsLoading(false);
      initialLoadRef.current = false;
    }
  }, [lat, lon, language, unit]);

  useEffect(() => {
    fetchAll();

    const interval = window.setInterval(fetchAll, fetchIntervalMs ?? defaultFetchInterval);
    intervalRef.current = interval;

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [fetchAll, fetchIntervalMs]);

  const refetch = useCallback(async () => {
    await fetchAll();
  }, [fetchAll]);

  return {
    weather,
    airPollution,
    isLoading,
    siteWorking,
    iconWorking,
    error,
    refetch,
    rawWeather,
    rawAir,
  } as any;
};

export default useWeather;

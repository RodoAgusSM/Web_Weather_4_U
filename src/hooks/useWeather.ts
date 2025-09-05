import { useCallback, useEffect, useRef, useState } from 'react';
import { WeatherUseCase } from 'app/useCases/WeatherUseCase';
import { useOptionalServiceContainer } from 'context/ServiceContainerContext';
import { ClimateType, Units } from 'enums/index';
import AirPollution from 'interfaces/AirPollution';
import { AppRequest } from 'interfaces/index';
import Weather from 'interfaces/Weather';
import { WeatherRepository } from 'repositories/WeatherRepository';
import { OpenWeatherMapAirRaw, OpenWeatherMapWeatherRaw } from 'types/OpenWeatherMapTypes';

export interface UseWeatherOptions {
  lat: number;
  lon: number;
  language: string;
  unit: Units;
  fetchIntervalMs?: number;
}

export interface UseWeatherResult {
  weather: Partial<Weather>;
  airPollution: Partial<AirPollution>;
  isLoading: boolean;
  siteWorking: boolean;
  iconWorking: boolean;
  error?: Error | null;
  refetch: () => Promise<void>;
  rawWeather?: OpenWeatherMapWeatherRaw | null;
  rawAir?: OpenWeatherMapAirRaw | null;
}

const defaultFetchInterval = 600000;

const useWeather = ({
  lat,
  lon,
  language,
  unit,
  fetchIntervalMs,
}: UseWeatherOptions): UseWeatherResult => {
  const [weather, setWeather] = useState<Partial<Weather>>({});
  const [airPollution, setAirPollution] = useState<Partial<AirPollution>>({});
  const [rawWeather, setRawWeather] = useState<OpenWeatherMapWeatherRaw | null>(null);
  const [rawAir, setRawAir] = useState<OpenWeatherMapAirRaw | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [siteWorking, setSiteWorking] = useState(true);
  const [iconWorking, setIconWorking] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const intervalRef = useRef<number | null>(null);
  const initialLoadRef = useRef(true);

  const container = useOptionalServiceContainer();
  const repoRef = useRef<import('repositories/WeatherRepository').WeatherRepository | null>(null);
  const useCaseRef = useRef<import('app/useCases/WeatherUseCase').WeatherUseCase | null>(null);

  if (container) {
    if (!repoRef.current) repoRef.current = container.repository;
    if (!useCaseRef.current) useCaseRef.current = container.useCase;
  } else {
    if (!repoRef.current) repoRef.current = new WeatherRepository();
    if (!useCaseRef.current && repoRef.current)
      useCaseRef.current = new WeatherUseCase(repoRef.current);
  }

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    try {
      const req: AppRequest = {
        toFetch: ClimateType.Weather,
        lat,
        lon,
        language,
        units: unit,
      };

      if (!useCaseRef.current) {
        // ensure repository is the only layer interacting with providers
        const [weatherResp, airResp] = await Promise.all([
          repoRef.current!.fetchWeather({ ...req, toFetch: ClimateType.Weather }),
          repoRef.current!.fetchAirPollution({ ...req, toFetch: ClimateType.AirPollution }),
        ]);

        const w = weatherResp.adapted as Weather;
        const a = airResp.adapted as AirPollution;
        const rw = weatherResp.raw as OpenWeatherMapWeatherRaw;
        const ra = airResp.raw as OpenWeatherMapAirRaw;

        setSiteWorking(true);
        setIconWorking(true);

        setWeather(w ?? {});
        setAirPollution(a ?? {});

        setRawWeather(rw);
        setRawAir(ra);

        setError(null);
        return;
      }

      const {
        weather: w,
        air: a,
        rawWeather: rw,
        rawAir: ra,
      } = await useCaseRef.current.getCombinedWeather(req);

      setSiteWorking(true);
      setIconWorking(true);

      setWeather(w ?? {});
      setAirPollution(a ?? {});

      setRawWeather(rw);
      setRawAir(ra);

      setError(null);
    } catch (err) {
      console.error('useWeather fetch error', err);
      const e = err instanceof Error ? err : new Error(String(err));
      setError(e);
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

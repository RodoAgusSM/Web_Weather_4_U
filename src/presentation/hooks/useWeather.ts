import { useCallback, useEffect, useRef, useState } from 'react';

import { WeatherUseCase } from '../../application/use-cases/WeatherUseCase';
import { useOptionalServiceContainer } from '../../context/ServiceContainerContext';
import AirPollution from '../../domain/entities/AirPollution';
import Weather from '../../domain/entities/Weather';
import { WeatherRepository } from '../../infrastructure/repositories/WeatherRepository';
import { ClimateType, Units } from '../../shared/enums/index';
import AppRequest from '../../shared/types/AppRequest';
import {
  OpenWeatherMapAirRaw,
  OpenWeatherMapWeatherRaw,
} from '../../shared/types/OpenWeatherMapTypes';

export interface UseWeatherOptions {
  lat: number;
  lon: number;
  language: string;
  unit: Units;
  fetchIntervalMs?: number;
  enableObserver?: boolean;
  observerId?: string;
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

const useWeather = (options: UseWeatherOptions): UseWeatherResult => {
  const {
    lat,
    lon,
    language,
    unit,
    fetchIntervalMs = 5 * 60 * 1000,
    enableObserver = false,
    observerId = 'default',
  } = options;

  const [weather, setWeather] = useState<Partial<Weather>>({});
  const [airPollution, setAirPollution] = useState<Partial<AirPollution>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [siteWorking, setSiteWorking] = useState<boolean>(false);
  const [iconWorking, setIconWorking] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [rawWeather, setRawWeather] = useState<OpenWeatherMapWeatherRaw | null>(null);
  const [rawAir, setRawAir] = useState<OpenWeatherMapAirRaw | null>(null);

  const intervalRef = useRef<number | null>(null);
  const initialLoadRef = useRef(true);

  const container = useOptionalServiceContainer();
  const repoRef = useRef<WeatherRepository | null>(null);
  const useCaseRef = useRef<WeatherUseCase | null>(null);

  if (container) {
    if (!repoRef.current) repoRef.current = container.repository;
    if (!useCaseRef.current) useCaseRef.current = container.useCase;
  } else {
    if (!repoRef.current) repoRef.current = new WeatherRepository();
    if (!useCaseRef.current && repoRef.current)
      useCaseRef.current = new WeatherUseCase(repoRef.current);
  }

  useEffect(() => {
    if (!enableObserver) return;

    // Note: Observer pattern ready for future implementation
    // When a global weather subject is available, you can subscribe here:
    //
    // const observer: IWeatherObserver = {
    //     getId: () => observerId,
    //     update: (data: WeatherEvent) => {
    //         switch (data.type) {
    //             case 'weather_update':
    //                 setWeather(prev => ({ ...prev, ...data.data }));
    //                 break;
    //             case 'air_pollution_update':
    //                 setAirPollution(prev => ({ ...prev, ...data.data }));
    //                 break;
    //             case 'error':
    //                 setError(data.error);
    //                 break;
    //         }
    //     },
    // };
    // weatherSubject.subscribe(observer);

    return () => {
      // Cleanup observer subscription
      // weatherSubject.unsubscribe(observer);
    };
  }, [enableObserver, observerId]);

  const fetchAll = useCallback(async () => {
    console.log('🔄 Fetching weather data...');
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

      const result = await useCaseRef.current.getCombinedWeather(req);

      if (result.isErr()) {
        const error = result.getError();
        console.error('useWeather fetch error', error);
        setError(error);
        setSiteWorking(false);
        setIconWorking(false);
        return;
      }

      const result_data = result.getValue();
      const w = result_data.weather;
      const a = result_data.air;

      const rawWeatherResp = await repoRef.current!.fetchWeather({
        ...req,
        toFetch: ClimateType.Weather,
      });
      const rw = rawWeatherResp.raw as OpenWeatherMapWeatherRaw;

      setSiteWorking(true);
      setIconWorking(true);

      setWeather(w ?? {});
      setAirPollution(a ?? {});

      setRawWeather(rw);
      setRawAir(null);

      setError(null);
      console.log('✅ Weather data fetched successfully');
    } catch (err) {
      console.error('❌ useWeather fetch error', err);
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
  };
};

export default useWeather;

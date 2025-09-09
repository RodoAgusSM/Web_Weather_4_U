import { useCallback, useEffect, useRef, useState } from 'react';

import { GetCombinedWeatherCommand } from '../../application/commands/weather/WeatherCommands';
import AirPollution from '../../domain/entities/AirPollution';
import Weather from '../../domain/entities/Weather';
import { WeatherRepository } from '../../infrastructure/repositories/WeatherRepository';
import { Result } from '../../shared/result/Result';
import AppRequest from '../../shared/types/AppRequest';

import { useCommand } from './useCommand';

interface UseWeatherState {
  weather: Weather | null;
  airPollution: AirPollution | null;
  loading: boolean;
  error: Error | null;
}

interface UseWeatherOptions {
  enableCaching?: boolean;
  enableObserver?: boolean;
  observerId?: string;
  enableAutoRefresh?: boolean;
  autoRefreshIntervalMs?: number;
}

export const useWeather = (options: UseWeatherOptions = {}) => {
  const {
    enableCaching = true,
    enableObserver = false,
    observerId = 'default',
    enableAutoRefresh = true,
    autoRefreshIntervalMs = 10 * 60 * 1000,
  } = options;

  const [state, setState] = useState<UseWeatherState>({
    weather: null,
    airPollution: null,
    loading: false,
    error: null,
  });

  const [hasInitialRequest, setHasInitialRequest] = useState<boolean>(false);

  const weatherRepository = new WeatherRepository();
  const { execute, loading, result, error } = useCommand<{
    weather: Weather;
    air: AirPollution;
  }>();

  const lastRequestRef = useRef<AppRequest | null>(null);
  const autoRefreshIntervalRef = useRef<NodeJS.Timeout | null>(null);

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
    //                 setState(prev => ({ ...prev, weather: data.data, error: null }));
    //                 break;
    //             case 'air_pollution_update':
    //                 setState(prev => ({ ...prev, airPollution: data.data, error: null }));
    //                 break;
    //             case 'error':
    //                 setState(prev => ({ ...prev, error: data.error }));
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

  const fetchCombinedWeather = useCallback(
    async (
      request: AppRequest,
    ): Promise<Result<{ weather: Weather; air: AirPollution }, Error>> => {
      lastRequestRef.current = request;
      setHasInitialRequest(true);

      setState(prev => ({ ...prev, loading: true, error: null }));

      const command = new GetCombinedWeatherCommand(request, weatherRepository);
      const result = await execute(command);

      if (result.isOk()) {
        const { weather, air } = result.getValue();
        setState({
          weather,
          airPollution: air,
          loading: false,
          error: null,
        });
      } else {
        setState(prev => ({
          ...prev,
          loading: false,
          error: result.getError(),
        }));
      }

      return result;
    },
    [execute, weatherRepository],
  );

  useEffect(() => {
    if (!enableAutoRefresh || !hasInitialRequest) return;

    const startAutoRefresh = () => {
      if (autoRefreshIntervalRef.current) {
        clearInterval(autoRefreshIntervalRef.current);
      }

      autoRefreshIntervalRef.current = setInterval(async () => {
        if (lastRequestRef.current) {
          console.log('🔄 Auto-refreshing weather data...');
          try {
            await fetchCombinedWeather(lastRequestRef.current);
            console.log('✅ Auto-refresh completed successfully');
          } catch (error) {
            console.error('❌ Auto-refresh failed:', error);
          }
        }
      }, autoRefreshIntervalMs);
    };

    startAutoRefresh();

    return () => {
      if (autoRefreshIntervalRef.current) {
        clearInterval(autoRefreshIntervalRef.current);
        autoRefreshIntervalRef.current = null;
      }
    };
  }, [enableAutoRefresh, autoRefreshIntervalMs, hasInitialRequest, fetchCombinedWeather]);

  const clearCache = useCallback(() => {
    if (enableCaching) {
      weatherRepository.clearAllCache();
    }
  }, [enableCaching, weatherRepository]);

  const getCacheInfo = useCallback(() => {
    if (enableCaching) {
      return weatherRepository.getCacheInfo();
    }
    return { size: 0, keys: [] };
  }, [enableCaching, weatherRepository]);

  const stopAutoRefresh = useCallback(() => {
    if (autoRefreshIntervalRef.current) {
      clearInterval(autoRefreshIntervalRef.current);
      autoRefreshIntervalRef.current = null;
      console.log('🛑 Auto-refresh stopped');
    }
  }, []);

  const startAutoRefresh = useCallback(() => {
    if (enableAutoRefresh && lastRequestRef.current && !autoRefreshIntervalRef.current) {
      autoRefreshIntervalRef.current = setInterval(async () => {
        if (lastRequestRef.current) {
          console.log('🔄 Auto-refreshing weather data...');
          try {
            await fetchCombinedWeather(lastRequestRef.current);
            console.log('✅ Auto-refresh completed successfully');
          } catch (error) {
            console.error('❌ Auto-refresh failed:', error);
          }
        }
      }, autoRefreshIntervalMs);
      console.log('▶️ Auto-refresh started');
    }
  }, [enableAutoRefresh, autoRefreshIntervalMs, fetchCombinedWeather]);

  return {
    ...state,
    loading: loading || state.loading,
    error: error || state.error,
    fetchCombinedWeather,
    clearCache,
    getCacheInfo,
    result,
    isSuccess: result?.isOk() ?? false,
    isError: result?.isErr() ?? false,
    stopAutoRefresh,
    startAutoRefresh,
    isAutoRefreshActive: autoRefreshIntervalRef.current !== null,
  };
};

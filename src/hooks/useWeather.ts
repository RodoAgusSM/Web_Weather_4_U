import { useCallback, useEffect, useRef, useState } from 'react';
import { Adapter } from 'adapter/adapter';
import { APIWeatherProvider, ClimateType, Units } from 'enums/index';
import { AppRequest } from 'interfaces/index';
import { generateURL } from 'utils/helpers';

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
}

const defaultFetchInterval = 600000;

const useWeather = ({ lat, lon, language, unit, fetchIntervalMs }: UseWeatherOptions): UseWeatherResult => {
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

    const fetchFromApi = useCallback(async (config: AppRequest) => {
        const url = generateURL(config);
        const res = await fetch(url);
        if (!res.ok) throw new Error(`API error ${res.status}: ${await res.text()}`);
        return await res.json();
    }, []);

    const fetchAll = useCallback(async () => {
        setIsLoading(true);
        try {
            const weatherReq: AppRequest = { toFetch: ClimateType.Weather, lat, lon, language, units: unit };
            const airReq: AppRequest = { toFetch: ClimateType.AirPollution, lat, lon, language, units: unit };

            const [weatherData, airData] = await Promise.all([
                fetchFromApi(weatherReq),
                fetchFromApi(airReq),
            ]);

            setSiteWorking(true);
            setIconWorking(true);

            const adaptedWeather = Adapter(APIWeatherProvider.OpenWeatherMap, ClimateType.Weather, unit, weatherData);
            setWeather(adaptedWeather ?? {});

            const airList = airData?.list?.[0] ?? airData;
            const adaptedAir = Adapter(APIWeatherProvider.OpenWeatherMap, ClimateType.AirPollution, unit, airList);
            setAirPollution(adaptedAir ?? {});

            setRawWeather(weatherData);
            setRawAir(airData);

            setError(null);
        } catch (err) {
            console.error('useWeather fetch error', err);
            setError(err);
            setSiteWorking(false);
        } finally {
            setIsLoading(false);
            initialLoadRef.current = false;
        }
    }, [lat, lon, language, unit, fetchFromApi]);

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

    return { weather, airPollution, isLoading, siteWorking, iconWorking, error, refetch, rawWeather, rawAir } as any;
};

export default useWeather;

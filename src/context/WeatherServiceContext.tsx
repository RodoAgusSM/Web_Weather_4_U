import React, { createContext, useContext } from 'react';
import { IWeatherService } from 'services/IWeatherService';
import { OpenWeatherMapService } from 'services/OpenWeatherMapService';

export const WeatherServiceContext = createContext<IWeatherService | null>(null);

export const WeatherServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = React.useRef<IWeatherService | null>(null);
  if (!ref.current) ref.current = new OpenWeatherMapService();
  return (
    <WeatherServiceContext.Provider value={ref.current}>{children}</WeatherServiceContext.Provider>
  );
};

export const useWeatherService = (): IWeatherService => {
  const svc = useContext(WeatherServiceContext);
  if (!svc) throw new Error('useWeatherService must be used within WeatherServiceProvider');
  return svc;
};

export default WeatherServiceProvider;

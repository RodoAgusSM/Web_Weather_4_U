import React, { createContext, useContext } from 'react';

import { WeatherUseCase } from '../application/use-cases/WeatherUseCase';
import { WeatherRepository } from '../infrastructure/repositories/WeatherRepository';

type ServiceContainer = {
  repository: WeatherRepository;
  useCase: WeatherUseCase;
};

const ServiceContainerContext = createContext<ServiceContainer | null>(null);

export function ServiceContainerProvider({ children }: { children: React.ReactNode }) {
  const repoRef = React.useRef<WeatherRepository | null>(null);
  if (!repoRef.current) repoRef.current = new WeatherRepository();

  const useCaseRef = React.useRef<WeatherUseCase | null>(null);
  if (!useCaseRef.current && repoRef.current)
    useCaseRef.current = new WeatherUseCase(repoRef.current);

  const value: ServiceContainer = {
    repository: repoRef.current!,
    useCase: useCaseRef.current!,
  };

  return (
    <ServiceContainerContext.Provider value={value}>{children}</ServiceContainerContext.Provider>
  );
}

export function useServiceContainer(): ServiceContainer {
  const c = useContext(ServiceContainerContext);
  if (!c) throw new Error('useServiceContainer must be used within ServiceContainerProvider');
  return c;
}

export function useOptionalServiceContainer(): ServiceContainer | null {
  return useContext(ServiceContainerContext);
}

export default ServiceContainerProvider;

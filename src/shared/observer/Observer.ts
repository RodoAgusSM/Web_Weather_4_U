export interface IObserver<T = any> {
  getId(): string;
  update(data: T): void;
}

export interface ISubject<T = any> {
  subscribe(observer: IObserver<T>): void;
  unsubscribe(observer: IObserver<T>): void;
  notify(data: T): void;
}

export class Subject<T> implements ISubject<T> {
  private observers: Map<string, IObserver<T>> = new Map();

  subscribe(observer: IObserver<T>): void {
    this.observers.set(observer.getId(), observer);
  }

  unsubscribe(observer: IObserver<T>): void {
    this.observers.delete(observer.getId());
  }

  unsubscribeById(id: string): void {
    this.observers.delete(id);
  }

  notify(data: T): void {
    this.observers.forEach(observer => {
      try {
        observer.update(data);
      } catch (error) {
        console.error(`Error notifying observer ${observer.getId()}:`, error);
      }
    });
  }

  getObserverCount(): number {
    return this.observers.size;
  }

  hasObserver(id: string): boolean {
    return this.observers.has(id);
  }

  clear(): void {
    this.observers.clear();
  }
}

export interface WeatherUpdateEvent {
  type: 'weather_update';
  data: any;
  timestamp: Date;
}

export interface AirPollutionUpdateEvent {
  type: 'air_pollution_update';
  data: any;
  timestamp: Date;
}

export interface ErrorEvent {
  type: 'error';
  error: Error;
  timestamp: Date;
}

export type WeatherEvent = WeatherUpdateEvent | AirPollutionUpdateEvent | ErrorEvent;

export interface IWeatherObserver extends IObserver<WeatherEvent> {}

export class WeatherSubject extends Subject<WeatherEvent> {
  notifyWeatherUpdate(data: any): void {
    const event: WeatherUpdateEvent = {
      type: 'weather_update',
      data,
      timestamp: new Date(),
    };
    this.notify(event);
  }

  notifyAirPollutionUpdate(data: any): void {
    const event: AirPollutionUpdateEvent = {
      type: 'air_pollution_update',
      data,
      timestamp: new Date(),
    };
    this.notify(event);
  }

  notifyError(error: Error): void {
    const event: ErrorEvent = {
      type: 'error',
      error,
      timestamp: new Date(),
    };
    this.notify(event);
  }
}

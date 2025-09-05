export class WeatherError extends Error {
  public readonly code?: string;
  constructor(message: string, code?: string) {
    super(message);
    this.name = 'WeatherError';
    this.code = code;
  }
}

export class NetworkError extends WeatherError {
  constructor(message = 'Network error') {
    super(message, 'NETWORK_ERROR');
    this.name = 'NetworkError';
  }
}

export class ProviderError extends WeatherError {
  constructor(message = 'Provider error') {
    super(message, 'PROVIDER_ERROR');
    this.name = 'ProviderError';
  }
}

export class DomainError extends WeatherError {
  constructor(message = 'Domain error') {
    super(message, 'DOMAIN_ERROR');
    this.name = 'DomainError';
  }
}

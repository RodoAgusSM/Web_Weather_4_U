import { ClimateType, Units } from 'shared/enums/index';

interface AppRequest {
  toFetch: ClimateType;
  lat: number;
  lon: number;
  language: string;
  units: Units;
  cityName?: string;
}

export default AppRequest;

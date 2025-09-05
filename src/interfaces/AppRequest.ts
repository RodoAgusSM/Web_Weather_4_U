import { ClimateType, Units } from 'enums/index';

interface AppRequest {
  toFetch: ClimateType;
  lat: number;
  lon: number;
  language: string;
  units: Units;
}

export default AppRequest;

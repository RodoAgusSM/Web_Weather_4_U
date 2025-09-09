export interface OwmWeatherMain {
  temp: number;
  feels_like: number;
  humidity: number;
  pressure: number;
}

export interface OwmWeatherWeatherItem {
  description: string;
  icon?: string;
}

export interface OwmWeatherWind {
  speed: number;
}

export interface OwmWeatherSys {
  sunrise: number;
  sunset: number;
  country?: string;
}

export interface OwmWeatherClouds {
  all: number;
}

export interface OpenWeatherMapWeatherRaw {
  main: OwmWeatherMain;
  weather: OwmWeatherWeatherItem[];
  wind: OwmWeatherWind;
  visibility?: number;
  sys: OwmWeatherSys;
  clouds: OwmWeatherClouds;
  [k: string]: any;
}

export interface OpenWeatherMapAirListItem {
  main?: { aqi?: number };
  components?: {
    co?: number;
    no?: number;
    no2?: number;
    o3?: number;
    so2?: number;
    pm2_5?: number;
    pm10?: number;
    nh3?: number;
    [k: string]: any;
  };
}

export interface OpenWeatherMapAirRaw {
  list?: OpenWeatherMapAirListItem[];
  main?: { aqi?: number };
  components?: OpenWeatherMapAirListItem['components'];
  [k: string]: any;
}

export default {};

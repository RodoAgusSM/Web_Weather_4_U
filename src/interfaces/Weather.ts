export interface Weather {
    realFeel: number;
    feelsLike: number;
    description: string;
    icon: string;
    humidity: number;
    pressure: number;
    windSpeed: number;
    windDirection: string;
    visibility: number;
    sunrise: number
    sunset: number;
    lastTimeChecked: string;
    lastDateChecked: string;
}

export default Weather;

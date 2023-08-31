import { ClimateType, StorageKey, Units } from 'enums/index';
import { AirPollution, Weather } from 'interfaces/index';

import { getLastDateChecked, getLastDateCheckedAmerican, getLastTimeChecked, getLastTimeChecked12HoursFormat, getWindDirection } from './helpers';

export const convertOpenWeatherMapResponseToInterface = (climateType: ClimateType, unit: Units, object: any) => {
    switch (climateType) {
        case ClimateType.Weather:
            return convertToWeather(object, unit);
        case ClimateType.AirPollution:
            return convertToAirPollution(object);
        default:
            break;
    }
}

const convertToWeather = (object: any, unit: Units) => {
    return {
        realFeel: Math.trunc(object.main.temp),
        feelsLike: Math.trunc(object.main.feels_like),
        description: object.weather[0].description.charAt(0).toUpperCase() + object.weather[0].description.substring(1),
        icon: "",
        humidity: object.main.humidity,
        pressure: object.main.pressure,
        windSpeed: Units.Imperial === unit ? Math.trunc(object.wind.speed) : Math.trunc(object.wind.speed * 3.6),
        windDirection: getWindDirection(object),
        visibility: Units.Imperial === unit ? Math.trunc(object.visibility / 1609.344) : object.visibility,
        sunrise: object.sys.sunrise,
        sunset: object.sys.sunset,
        lastTimeChecked: localStorage.getItem(StorageKey.Language) === 'en' ? getLastTimeChecked12HoursFormat() : getLastTimeChecked(),
        lastDateChecked: localStorage.getItem(StorageKey.Language) === 'en' ? getLastDateCheckedAmerican() : getLastDateChecked(),
    } as Weather
}

const convertToAirPollution = (object: any) => {
    const mainAQI = object?.main?.aqi;
    const components = object?.components
    return {
        AQI: mainAQI,
        ammonia: components?.so2,
        carbonMonoxide: components?.co,
        coarseParticulateMatter: components?.pm10,
        nitrogenDioxide: components?.no,
        nitrogenMonoxide: components?.nh3,
        ozone: components?.no2,
        sulphurDioxide: components?.o3,
        fineParticlesMatter: components?.pm2_5,
    } as AirPollution
}
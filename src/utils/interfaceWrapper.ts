import { InterfaceName } from 'enums/index';
import { AirPollution, Weather } from 'interfaces/index';

import { getLastDateChecked, getLastTimeChecked, getWindDirection } from './helpers';

export const convertToInterface = (interfaceName: InterfaceName, object: any) => {
    switch (interfaceName) {
        case InterfaceName.weather:
            return convertToWeather(object);
        case InterfaceName.airPollution:
            return convertToAirPollution(object);
        default:
            break;
    }
}

const convertToWeather = (object: any) => {
    return {
        realFeel: Math.trunc(object.main.temp),
        feelsLike: Math.trunc(object.main.feels_like),
        description: object.weather[0].description,
        icon: "",
        humidity: object.main.humidity,
        pressure: object.main.pressure,
        windSpeed: Math.trunc(object.wind.speed) * 3.6,
        windDirection: getWindDirection(object),
        visibility: object.visibility,
        sunrise: object.sys.sunrise,
        sunset: object.sys.sunset,
        lastTimeChecked: getLastTimeChecked(),
        lastDateChecked: getLastDateChecked(),
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
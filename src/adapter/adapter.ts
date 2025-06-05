import { APIWeatherProvider, ClimateType, Units } from "enums/index";
import { convertOpenWeatherMapResponseToInterface } from "utils/openWeatherMapInterfaceWrapper";
import { convertMeasurementUnits, formatTimeByLanguage } from "utils/updateWeatherWrapper";

const Adapter = (apiWeatherProvider: APIWeatherProvider, climateType: ClimateType, unit: Units, object: any) => {
    switch (apiWeatherProvider) {
        case APIWeatherProvider.OpenWeatherMap:
            return convertOpenWeatherMapResponseToInterface(climateType, object, unit);
        default:
            break;
    }
}

const formatWeatherTimeByLanguage = (weatherData: any) => {
    return formatTimeByLanguage(weatherData);
}

const convertWeatherUnits = (targetUnit: Units, weatherData: any) => {
    return convertMeasurementUnits(weatherData, targetUnit);
}

export { Adapter, convertWeatherUnits, formatWeatherTimeByLanguage };
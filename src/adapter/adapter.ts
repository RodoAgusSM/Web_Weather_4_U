import { APIWeatherProvider, ClimateType, Units } from "enums/index";
import { convertOpenWeatherMapResponseToInterface } from "utils/openWeatherMapInterfaceWrapper";

const Adapter = (apiWeatherProvider: APIWeatherProvider, climateType: ClimateType, unit: Units, object: any) => {
    switch (apiWeatherProvider) {
        case APIWeatherProvider.OpenWeatherMap:
            return convertOpenWeatherMapResponseToInterface(climateType, unit, object);
        default:
            break;
    }
}

export default Adapter;
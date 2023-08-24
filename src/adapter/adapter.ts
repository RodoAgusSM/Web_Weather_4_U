import { APIWeatherProvider, InterfaceName, Units } from "enums/index";
import { convertOpenWeatherMapResponseToInterface } from "utils/openWeatherMapInterfaceWrapper";

const Adapter = (apiWeatherProvider: APIWeatherProvider, interfaceName: InterfaceName, unit: Units, object: any) => {
    switch (apiWeatherProvider) {
        case APIWeatherProvider.OPENWEATHERMAP:
            return convertOpenWeatherMapResponseToInterface(interfaceName, unit, object);
        default:
            break;
    }
}

export default Adapter;
import { APIWeatherProvider, InterfaceName } from "enums/index";
import { convertOpenWeatherMapResponseToInterface } from "utils/openWeatherMapInterfaceWrapper";

const Adapter = (apiWeatherProvider: APIWeatherProvider, interfaceName: InterfaceName, object: any) => {
    switch (apiWeatherProvider) {
        case APIWeatherProvider.OPENWEATHERMAP:
            return convertOpenWeatherMapResponseToInterface(interfaceName, object);
        default:
            break;
    }
}

export default Adapter;
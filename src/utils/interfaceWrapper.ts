import { InterfaceName } from 'enums/index';
import { AirPollution } from 'interfaces/index';

export const convertToInterface = (interfaceName: string, object: any) => {
    switch (interfaceName) {
        case InterfaceName.AirPollution:
            return convertToAirPollution(object);
        default:
            break;
    }
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
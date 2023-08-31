import { ClimateType } from "enums/index";

interface AppRequest {
    toFetch: ClimateType;
    lat: number;
    lon: number;
    language: string;
    units: string;
}

export default AppRequest;

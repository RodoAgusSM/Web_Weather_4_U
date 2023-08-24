import { URLQuery } from "enums";

export interface AppRequest {
    toFetch: URLQuery;
    lat: number;
    lon: number;
    language: string;
    units: string;
}

export default AppRequest;

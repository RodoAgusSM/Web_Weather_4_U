import { openWeatherMapURL, paramsURL } from 'config/config';
import { AppRequest } from "interfaces";

export const getWindDirection = (object: any) => {
    const degrees = parseInt(object.wind.deg);
    const cardinal = Math.round((degrees + 11.25) / 22.5);
    return Directions[cardinal % 16];
}

export const getLastTimeChecked = () => {
    const dateNow = new Date();
    const minutesNow = dateNow.getMinutes();
    const minutes = minutesNow > 10 ? minutesNow : '0' + minutesNow;
    const time = dateNow.getHours() + ':' + minutes;
    return time;
}

export const getLastDateChecked = () => {
    const dateNow = new Date();
    const date =
        dateNow.getDate() + '/' + (dateNow.getMonth() + 1) + '/' + dateNow.getFullYear();
    return date;
}

const Directions = [
    'nort',
    'northNorthEast',
    'northEast',
    'eastNorthEast',
    'east',
    'eastSouthEast',
    'southEast',
    'southSouthEast',
    'South',
    'southSouthWest',
    'southWest',
    'westSouthWest',
    'west',
    'westNorthWest',
    'northWest',
    'northNorthWest',
];

export const generateURL = ({ toFetch, lat, lon, language }: AppRequest) => {
    return openWeatherMapURL + toFetch + '?lat=' + lat + '&lon=' + lon + '&lang=' + language + paramsURL;
}
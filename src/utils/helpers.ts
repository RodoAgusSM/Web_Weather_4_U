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

export const getLastTimeChecked12HoursFormat = () => {
    var dt = new Date();
    var hours = dt.getHours();
    var AmOrPm = hours >= 12 ? 'PM' : 'AM';
    hours = (hours % 12) || 12;
    var minutesNow = dt.getMinutes();
    const minutes = minutesNow > 10 ? minutesNow : '0' + minutesNow;
    var finalTime = "Time  - " + hours + ":" + minutes + " " + AmOrPm;
    return finalTime
}

export const getLastDateChecked = () => {
    const dateNow = new Date();
    const date =
        dateNow.getDate() + '/' + (dateNow.getMonth() + 1) + '/' + dateNow.getFullYear();
    return date;
}

export const getLastDateCheckedAmerican = () => {
    const dateNow = new Date();
    const date =
        (dateNow.getMonth() + 1) + '/' + dateNow.getDate() + '/' + dateNow.getFullYear();
    return date;
}

const Directions = [
    'north',
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

export const generateURL = ({ toFetch, lat, lon, language, units }: AppRequest) => {
    return openWeatherMapURL + toFetch + '?lat=' + lat + '&lon=' + lon + '&lang=' + language + '&units=' + units + paramsURL;
}
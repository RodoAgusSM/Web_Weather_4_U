import { openWeatherMapURL, paramsURL } from 'config/config';
import { AppRequest } from 'interfaces';

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

export const getWindDirection = (object: any) => {
  const degrees = parseInt(object.wind.deg);
  const cardinal = Math.round((degrees + 11.25) / 22.5);
  return Directions[cardinal % 16];
};

export const getLastTimeChecked = () => {
  const dateNow = new Date();
  const minutesNow = dateNow.getMinutes();
  const minutes = minutesNow > 10 ? minutesNow : '0' + minutesNow;
  const time = dateNow.getHours() + ':' + minutes;
  return time;
};

export const getLastTimeChecked12HoursFormat = () => {
  var dt = new Date();
  var hours = dt.getHours();
  var AmOrPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  var minutesNow = dt.getMinutes();
  const minutes = minutesNow > 10 ? minutesNow : '0' + minutesNow;
  var finalTime = hours + ':' + minutes + ' ' + AmOrPm;
  return finalTime;
};

export const getLastDateChecked = () => {
  const dateNow = new Date();
  const date = dateNow.getDate() + '/' + (dateNow.getMonth() + 1) + '/' + dateNow.getFullYear();
  return date;
};

export const getLastDateCheckedAmerican = () => {
  const dateNow = new Date();
  const date = dateNow.getMonth() + 1 + '/' + dateNow.getDate() + '/' + dateNow.getFullYear();
  return date;
};

export const truncateToOneDecimal = (value: number) => {
  return Math.floor(value * 10) / 10;
};

const firstLowerToLowercase = (string: string): string =>
  string.replace(/(?:^|\s)\S/g, (a: string) => a.toLowerCase());

export const firstLowerToUppercase = (string: string) =>
  string.replace(/^./, char => char.toUpperCase());

export const generateURL = ({ toFetch, lat, lon, language, units }: AppRequest) => {
  let splitted = toFetch.replace(/([a-zA-Z])(?=[A-Z])/g, '$1_').split('_');
  let params: string;
  if (splitted.length > 1) {
    params = `${firstLowerToLowercase(splitted[0])}_${firstLowerToLowercase(splitted[1])}`;
  } else {
    params = `${firstLowerToLowercase(splitted[0])}`;
  }
  return (
    openWeatherMapURL +
    params +
    '?lat=' +
    lat +
    '&lon=' +
    lon +
    '&lang=' +
    language +
    '&units=' +
    units +
    paramsURL
  );
};

export const getRandomNumber = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

export const formatTimeToPreferredFormat = (
  timestamp: number,
  use12HourFormat: boolean = false,
): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: use12HourFormat,
  });
};

export const convertFrom24To12Hours = (time24: string): string => {
  const [hours, minutes] = time24.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
};

export const convertFrom12To24Hours = (time12: string): string => {
  const [time, period] = time12.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  if (period === 'PM' && hours < 12) {
    hours += 12;
  } else if (period === 'AM' && hours === 12) {
    hours = 0;
  }
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

export const kmToMiles = (km: number): number => {
  return Math.round(km * 0.621371);
};

export const milesToKm = (miles: number): number => {
  return Math.round(miles / 0.621371);
};

export const celsiusToFahrenheit = (celsius: number): number => {
  return Math.round((celsius * 9) / 5 + 32);
};

export const fahrenheitToCelsius = (fahrenheit: number): number => {
  return Math.round(((fahrenheit - 32) * 5) / 9);
};

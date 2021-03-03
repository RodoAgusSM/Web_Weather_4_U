import React, { useState, useEffect } from "react";
import axios from 'axios';
import logo from './imgs/sun-half.png';

function Weather() {
    let [cityName, setCityName] = useState([]);
    let [countryNameShort, setCountryNameShort] = useState([]);
    let [realFeel, setRealFeel] = useState([]);
    let [icon, setIcon] = useState([]);
    let [description, setDescription] = useState([]);
    let [feelsLike, setFeelsLike] = useState([]);
    let [humidity, setHumidity] = useState([]);
    let [pressure, setPressure] = useState([]);
    let [minTemp, setMinTemp] = useState([]);
    let [maxTemp, setMaxTemp] = useState([]);
    let [windSpeed, setWindSpeed] = useState([]);
    let [windDirection, setWindDirection] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=Montevideo&units=Metric&lang=sp&APPID=" + process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
            const response = await axios.get(weatherUrl);
            setCityName(response.data.name);
            setCountryNameShort(response.data.sys.country);
            setRealFeel(response.data.main.temp);
            setIcon(response.data.weather[0].icon);
            setDescription(response.data.weather[0].description);
            setFeelsLike(response.data.main.feels_like);
            setHumidity(response.data.main.humidity);
            setPressure(response.data.main.pressure);
            setMinTemp(response.data.main.temp_min);
            setMaxTemp(response.data.main.temp_max);
            setWindSpeed(parseInt(response.data.wind.speed) * 3.6);
            let degrees = parseInt(response.data.wind.deg);
            let directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSO", "SO", "OSO", "O", "ONO", "NO", "NNO"]
            let cardinal = parseInt((degrees + 11.25) / 22.5);
            setWindDirection(directions[cardinal % 16]);
        };
        fetchData();
    }, []);
    return (
        <div className="weatherDiv" id="weatherCard">
            <img id="logoApp" src={logo} alt="Logo" />
            <div>
                <h2>Tiempo en {cityName} ({countryNameShort})</h2>
            </div>
            <div id="weatherMain">
                <code>Temperatura actual: {realFeel} °C</code><br /><br />
                <code>Mín.: {minTemp} °C  Máx.: {maxTemp} °C</code><br />
                <img id="weatherIcon" src={"https://openweathermap.org/img/w/" + icon + ".png"} alt="Icon" /><br />
                <code>Descripción: {description}</code>
            </div>
            <div id="weatherData">
                <code>Sensación termica: {feelsLike} °C</code><br />
                <code>Humedad: {humidity} %</code><br />
                <code>Presión: {pressure} hPa</code><br />
            </div>
            <div id="weatherWind">
                <code>Dirección del viento: {windDirection}</code><br />
                <code>Velocidad del viento: {windSpeed} km/h</code>
            </div>
        </div>
    );
}

export default Weather;
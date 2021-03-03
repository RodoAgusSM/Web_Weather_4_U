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
            var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=Londres&units=Metric&lang=sp&APPID=" + process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
            const response = await axios.get(weatherUrl);
            setCityName(response.data.name);
            setCountryNameShort(response.data.sys.country);
            setRealFeel(Math.trunc(response.data.main.temp));
            setIcon(response.data.weather[0].icon);
            setDescription(response.data.weather[0].description);
            setFeelsLike(Math.trunc(response.data.main.feels_like));
            setHumidity(response.data.main.humidity);
            setPressure(response.data.main.pressure);
            setMinTemp(Math.trunc(response.data.main.temp_min));
            setMaxTemp(Math.trunc(response.data.main.temp_max));
            setWindSpeed(parseInt(Math.trunc(response.data.wind.speed) * 3.6));
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
            <div id="titleApp">
                <h2>Tiempo actual en {cityName} ({countryNameShort})</h2>
            </div>
            <img id="weatherIcon" src={"https://openweathermap.org/img/w/" + icon + ".png"} alt="Icon" />
            <div id="weatherMain">
                <code id="weatherMainTemp">{realFeel}°C</code><br />
                <code id="description">{description}</code><br />
                <code >Mín.: {minTemp}°C - Máx.: {maxTemp}°C</code><br />
                <code>Sensación térmica: {feelsLike}°C</code>          
            </div>
            <div id="weatherData">
                <code>Humedad: {humidity}%</code><br />
                <code>Presión: {pressure} hPa</code><br />
                <code>Viento: {windDirection} {windSpeed} km/h</code>
            </div>
        </div>
    );
}

export default Weather;
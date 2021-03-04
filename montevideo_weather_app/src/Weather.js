import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import logo from './imgs/sun_half.png';
import loading from './imgs/loading.gif';
import danger from './imgs/danger.png';
import notFoundIcon from './imgs/not_found_icon.png'

function Weather() {
    let [siteWorking, setIsSiteWorking] = useState([]);
    let [iconWorking, setIconWorking] = useState([]);
    let [cityName, setCityName] = useState([]);
    let [countryNameShort, setCountryNameShort] = useState([]);
    let [realFeel, setRealFeel] = useState([]);
    let [icon, setIcon] = useState([]);
    let [description, setDescription] = useState([]);
    let [feelsLike, setFeelsLike] = useState([]);
    let [humidity, setHumidity] = useState([]);
    let [pressure, setPressure] = useState([]);
    let [windSpeed, setWindSpeed] = useState([]);
    let [windDirection, setWindDirection] = useState([]);
    let [date, setDate] = useState([]);
    let [isLoading, setIsLoading] = useState([]);
    let iconValue = useRef(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                let weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=Montevideo&units=Metric&lang=sp&APPID=" + process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
                const response = await axios.get(weatherUrl);
                setIsSiteWorking(true);
                setCityName(response.data.name);
                setCountryNameShort(response.data.sys.country);
                setRealFeel(Math.trunc(response.data.main.temp));
                setIcon(response.data.weather[0].icon);
                iconValue.current = response.data.weather[0].icon;
                setDescription(response.data.weather[0].description);
                setFeelsLike(Math.trunc(response.data.main.feels_like));
                setHumidity(response.data.main.humidity);
                setPressure(response.data.main.pressure);
                setWindSpeed(parseInt(Math.trunc(response.data.wind.speed) * 3.6));
                let degrees = parseInt(response.data.wind.deg);
                let directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSO", "SO", "OSO", "O", "ONO", "NO", "NNO"]
                let cardinal = parseInt((degrees + 11.25) / 22.5);
                setWindDirection(directions[cardinal % 16]);
                let date = new Date();
                let time = date.getHours() + ":" + date.getMinutes() + " " + date.getDay() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
                setDate(time);
                setIsLoading(false);
            }
            catch (error) {
                setIsSiteWorking(false);
            }
            try {
                let iconUrl = "https://openweathermap.org/img/w/" + iconValue.current + ".png";
                await axios.get(iconUrl);
                setIconWorking(true)
            } catch (error) {
                setIconWorking(false)
            }
        };
        setIsLoading(true);
        fetchData();
        setInterval(() => {
            setIsLoading(true);
        }, 120000);
    }, []);
    let toShow;
    if (siteWorking) {
        let showIcon;
        if (iconWorking) showIcon = <img id="weatherIcon" src={"https://openweathermap.org/img/w/" + icon + ".png"} alt="Icon" />
        else showIcon = <img id="weatherIcon" src={notFoundIcon} alt="Icon" />
        if (isLoading) toShow = <div><img id="spinner" src={loading} alt="Loading" /></div>
        else toShow = <div className="weatherDiv" id="weatherCard">
            <img id="logoApp" src={logo} alt="Logo" />
            <div id="titleApp">
                <h2>Tiempo actual en {cityName} ({countryNameShort})</h2>
            </div>
            {showIcon}
            <div id="weatherMain">
                <code id="weatherMainTemp">{realFeel}°C</code><br />
                <code id="description">{description}</code><br />
                <code>Sensación térmica: {feelsLike}°C</code><br />
                <code>{date}</code>
            </div>
            <div id="weatherData">
                <code>Humedad: {humidity}%</code><br />
                <code>Presión: {pressure} hPa</code><br />
                <code>Viento: {windDirection} {windSpeed} km/h</code><br />
            </div>
        </div>;
    }
    else toShow = <div>
        <img id="danger" src={danger} alt="Danger" /><br />
        <code>Problema en la conexión con el proveedor del tiempo</code>
    </div>
    return (
        <div>
            {toShow}
        </div>
    );
}

export default Weather;
import { useCallback, useEffect, useRef, useState } from 'react';
import CitySearchBar from 'components/CitySearchBar/CitySearchBar';
import Language from 'components/Language/Language';
import SunriseSunsetInfo from 'components/SunriseSunsetInfo/SunsetSunriseInfo';
import { Directions, iconExtension, iconURL, openWeatherMapURL, paramsURL } from 'config/config';
import useDimensions from 'hooks/useDimensions';
import danger from 'images/danger.png';
import loading from 'images/loading.gif';
import locationNotFound from 'images/location_not_found_icon.png';
import notFoundIcon from 'images/not_found_icon.png';
import social_network from 'images/social_network.png';
import social_network_hover from 'images/social_network_hover.png';
import logo from 'images/sun_half.svg';
import { AirPollution } from 'interfaces/index';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  BreakLine,
  Code,
  DangerLogo,
  GlobalStyle,
  LocationNotFoundCode,
  LocationNotFoundIcon,
  LogoApp,
  MoreInfoButton,
  SocialNetworkIcon,
  SocialNetworkIconContainer,
  SpinnerLogo,
  Subtitle,
  TitleApp,
  WeatherCard,
  WeatherData,
  WeatherIcon,
  WeatherMain,
  WeatherMainTemperature,
} from 'styles/styles';
import { convertToInterface } from 'utils/interfaceWrapper';

const Weather = () => {
  const { t, i18n } = useTranslation();
  let navigate = useNavigate();
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  let [validCoordinates, setValidCoordinates] = useState<boolean>(true);
  let [siteWorking, setIsSiteWorking] = useState<boolean>(true);
  let [iconWorking, setIsIconWorking] = useState<boolean>(true);
  let [cityName, setCityName] = useState<string>(localStorage.getItem('cityName') ?? 'Montevideo');
  let [fullCityName, setFullCityName] = useState<string>(
    localStorage.getItem('cityFullName') ?? 'Montevideo, Uruguay'
  );
  let [lat, setLat] = useState<number>(Number(localStorage.getItem('lat')) ?? -34.8335);
  let [lon, setLon] = useState<number>(Number(localStorage.getItem('lon')) ?? -56.1674);
  let [language, setLanguage] = useState<string>(i18n.language);
  let [countryNameShort, setCountryNameShort] = useState<string>();
  let [realFeel, setRealFeel] = useState<number>();
  let [icon, setIcon] = useState<string>('');
  let [description, setDescription] = useState<string>();
  let [feelsLike, setFeelsLike] = useState<number>();
  let [time, setTime] = useState<string>();
  let [date, setDate] = useState<string>();
  let [humidity, setHumidity] = useState<number>();
  let [pressure, setPressure] = useState<number>();
  let [windSpeed, setWindSpeed] = useState<number>();
  let [windDirection, setWindDirection] = useState<string>();
  let [visibility, setVisibility] = useState<number>();
  let [airPollution, setAirPollution] = useState<AirPollution>();
  let [sunrise, setSunrise] = useState<number>();
  let [sunset, setSunset] = useState<number>();
  let [isLoading, setIsLoading] = useState<boolean>(true);
  let iconValue = useRef(null);

  const { isDesktopOrLaptop, isMobileDevice, isSmallMobileDevice } = useDimensions();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fullUrl =
          openWeatherMapURL +
          'weather' +
          '?lat=' +
          lat +
          '&lon=' +
          lon +
          '&lang=' +
          language +
          paramsURL;
        const response = await fetch(fullUrl);
        if (response.ok) {
          const data = await response.json();
          setIsSiteWorking(true);
          setCountryNameShort(data.sys.country);
          setRealFeel(Math.trunc(data.main.temp));
          iconValue.current = data.weather[0].icon;
          setDescription(data.weather[0].description);
          setFeelsLike(Math.trunc(data.main.feels_like));
          setHumidity(data.main.humidity);
          setPressure(data.main.pressure);
          setWindSpeed(Math.trunc(data.wind.speed) * 3.6);
          const degrees = parseInt(data.wind.deg);
          const cardinal = (degrees + 11.25) / 22.5;
          setWindDirection(Directions[cardinal % 16]);
          setVisibility(data.visibility);
          const dateNow = new Date();
          const minutesNow = dateNow.getMinutes();
          const minutes = minutesNow > 10 ? minutesNow : '0' + minutesNow;
          const time = dateNow.getHours() + ':' + minutes;
          setTime(time);
          const date =
            dateNow.getDate() + '/' + (dateNow.getMonth() + 1) + '/' + dateNow.getFullYear();
          setDate(date);
          setSunrise(data.sys.sunrise);
          setSunset(data.sys.sunset);
        } else console.log(response.status, response.text);
      } catch (error: any) {
        if (error.response.data.message === 'city not found') setValidCoordinates(false);
        else setIsSiteWorking(false);
      }
      try {
        setIsIconWorking(true);
        const iconUrl = iconURL + iconValue.current + iconExtension;
        const response = await fetch(iconUrl);
        if (response.ok) {
          setIcon(response?.url);
        } else console.log(response.status, response.text);
      } catch (error) {
        setIsIconWorking(false);
      }
      try {
        const fullUrl =
          openWeatherMapURL +
          'air_pollution' +
          '?lat=' +
          lat +
          '&lon=' +
          lon +
          '&lang=' +
          language +
          paramsURL;
        const response = await fetch(fullUrl);
        if (response.ok) {
          const data = (await response.json()) as any;
          const airPollutionData = data.list[0] as any;
          setAirPollution(convertToInterface('AirPollution', airPollutionData));
        } else console.log(response.status, response.text);
        setIsLoading(false);
      } catch (error) {}
    };
    fetchData();
  }, [lat, lon, language]);

  const changeCity = useCallback(
    (newCity: any) => {
      if (fullCityName !== newCity.label) {
        localStorage.setItem('cityName', newCity.value.name);
        localStorage.setItem('cityFullName', newCity.label);
        localStorage.setItem('lat', newCity.value.lat);
        localStorage.setItem('lon', newCity.value.lon);
        setFullCityName(newCity.label);
        setCityName(newCity.value.name);
        setLat(newCity.value.lat);
        setLon(newCity.value.lon);
        setIsLoading(true);
      }
    },
    [fullCityName, cityName, lat, lon]
  );

  const changeLanguage = useCallback(
    (newLanguage: string) => {
      if (language !== newLanguage) {
        localStorage.setItem('language', newLanguage);
        i18n.changeLanguage(newLanguage);
        setLanguage(newLanguage);
        setIsLoading(true);
      }
    },
    [language]
  );

  let toShow;
  if (siteWorking) {
    let showIcon;
    if (iconWorking) showIcon = <WeatherIcon src={icon} alt="" />;
    else showIcon = <WeatherIcon src={notFoundIcon} alt="" />;
    if (isLoading || icon === '') toShow = <SpinnerLogo src={loading} alt="" />;
    else
      toShow = (
        <WeatherCard
          isDesktopOrLaptop={isDesktopOrLaptop}
          isMobileDevice={isMobileDevice}
          isSmallMobileDevice={isSmallMobileDevice}
        >
          <CitySearchBar changeCity={changeCity} />
          {validCoordinates ? (
            <>
              <LogoApp src={logo} alt="" />
              <TitleApp>
                <Subtitle>
                  {t('words.weatherIn')} {cityName} ({countryNameShort})
                </Subtitle>
              </TitleApp>
              {showIcon}
              <WeatherMain>
                <WeatherMainTemperature>{realFeel}°C</WeatherMainTemperature>
                <BreakLine />
                <Code>
                  {t('words.feelsLike')} {feelsLike}°C
                </Code>
                <BreakLine />
                <Code>{description}</Code>
                <BreakLine />
                <SunriseSunsetInfo lat={lat} lon={lon} sunrise={sunrise} sunset={sunset} />
              </WeatherMain>
              <WeatherData>
                <Code>
                  {t('words.humidity')} {humidity}%
                </Code>
                <BreakLine />
                <Code>
                  {t('words.pressure')} {pressure} hPa
                </Code>
                <BreakLine />
                <Code>
                  {t('words.wind')} {windDirection} {windSpeed} km/h
                </Code>
                <BreakLine />
                <Code>
                  {t('words.visibility')} {visibility} m
                </Code>
                <BreakLine />
                <Code>
                  {t('words.airPollution.aqi')}
                  {
                    Object.values(t('words.airPollution.status', { returnObjects: true }))[
                      airPollution?.AQI
                    ]
                  }{' '}
                  <MoreInfoButton
                    onClick={() => {
                      navigate(`/air_pollution_info`, {
                        state: { airPollution },
                      });
                    }}
                  >
                    {t('words.airPollution.moreInfo')}
                  </MoreInfoButton>
                </Code>
                <BreakLine />
                <BreakLine />
                <Code>
                  {t('words.updatedAt')} {time}
                </Code>
                <BreakLine />
                <Code>
                  {t('words.date')} {date}
                </Code>
              </WeatherData>
            </>
          ) : (
            <>
              <LocationNotFoundIcon src={locationNotFound} alt="" />
              <LocationNotFoundCode>
                {t('words.locationNotFound.funnyMessage')} {cityName}
              </LocationNotFoundCode>
              <BreakLine />
              <LocationNotFoundCode>{t('words.locationNotFound.realMessage')}</LocationNotFoundCode>
            </>
          )}
          <Language changeLanguage={changeLanguage} />
          <SocialNetworkIconContainer
            isDesktopOrLaptop={isDesktopOrLaptop}
            onMouseEnter={() => setMouseOver(true)}
            onMouseLeave={() => setMouseOver(false)}
            onClick={() => {
              navigate(`/social_network`);
            }}
          >
            <SocialNetworkIcon
              mouseOver={mouseOver}
              regular={social_network}
              hover={social_network_hover}
            />
          </SocialNetworkIconContainer>
        </WeatherCard>
      );
  } else
    toShow = (
      <>
        <DangerLogo src={danger} alt="" />
        <BreakLine />
        <Code>{t('words.conectionError')}</Code>
      </>
    );
  return (
    <>
      <GlobalStyle />
      {toShow}
    </>
  );
};

export default Weather;

import { useCallback, useEffect, useRef, useState } from 'react';
import Adapter from 'adapter/adapter';
import CitySearchBar from 'components/CitySearchBar/CitySearchBar';
import Language from 'components/Language/Language';
import SunriseSunsetInfo from 'components/SunriseSunsetInfo/SunsetSunriseInfo';
import { iconExtension, iconURL } from 'config/config';
import { APIWeatherProvider, InterfaceName, StorageKeys, Units, URLQuery } from 'enums/index';
import useDimensions from 'hooks/useDimensions';
import danger from 'images/danger.png';
import loading from 'images/loading.gif';
import locationNotFound from 'images/location_not_found_icon.png';
import notFoundIcon from 'images/not_found_icon.png';
import social_network from 'images/social_network.png';
import social_network_hover from 'images/social_network_hover.png';
import logo from 'images/sun_half.svg';
import {
  AirPollution as AirPollutionInterface,
  AppRequest,
  Weather as WeatherInterface,
} from 'interfaces/index';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { SingleValue } from 'react-select';
import {
  AirQualitySectionContainer,
  AllDataContainer,
  BreakLine,
  CenteredContainer,
  Code,
  ColumnContainer,
  DangerLogo,
  FooterContainer,
  GlobalStyle,
  LanguageAndSocialNetworkContainer,
  LocationNotFoundCode,
  LocationNotFoundContainer,
  LocationNotFoundIcon,
  LogoApp,
  MoreInfoButton,
  SocialNetworkIcon,
  SocialNetworkIconContainer,
  SpinnerLogo,
  Subtitle,
  TitleApp,
  UnitsContainer,
  UnitSpan,
  UnitsSubContainer,
  WeatherCard,
  WeatherData,
  WeatherDataContainer,
  WeatherIcon,
  WeatherIconContainer,
  WeatherMain,
  WeatherMainContainer,
  WeatherMainTemperature,
} from 'styles/styles';
import { generateURL } from 'utils/helpers';

const defaultWeather = {} as WeatherInterface;
const defaultAirPollution = {} as AirPollutionInterface;

const Weather = () => {
  const { t, i18n } = useTranslation();
  let navigate = useNavigate();
  const { isDesktopOrLaptop, isMobileDevice, isSmallMobileDevice } = useDimensions();
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  const [validCoordinates, setValidCoordinates] = useState<boolean>(true);
  const [siteWorking, setIsSiteWorking] = useState<boolean>(true);
  const [iconWorking, setIsIconWorking] = useState<boolean>(true);
  const [cityName, setCityName] = useState<string>(
    localStorage.getItem(StorageKeys.CITYNAME) ?? 'Montevideo'
  );
  const [fullCityName, setFullCityName] = useState<string>(
    localStorage.getItem(StorageKeys.FULLCITYNAME) ?? 'Montevideo, Uruguay'
  );
  const [lat, setLat] = useState<number>(Number(localStorage.getItem(StorageKeys.LAT)) || -34.8335);
  const [lon, setLon] = useState<number>(Number(localStorage.getItem(StorageKeys.LON)) || -56.1674);
  const [language, setLanguage] = useState<string>(i18n.language);
  const [unit, setUnit] = useState<Units>(Units.METRIC);
  const [countryNameShort, setCountryNameShort] = useState<string>();
  const [weather, setWeather] = useState<WeatherInterface>(defaultWeather);
  const [airPollution, setAirPollution] = useState<AirPollutionInterface>(defaultAirPollution);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [width, setWidth] = useState<number>(window.innerWidth);
  const iconValue = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
  }, [width]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          generateURL({
            toFetch: URLQuery.WEAHTER,
            lat: lat,
            lon: lon,
            language: language,
            units: unit,
          } as AppRequest)
        );
        if (response.ok) {
          const weatherDataAPI = await response.json();
          setIsSiteWorking(true);
          setCountryNameShort(weatherDataAPI.sys.country);
          iconValue.current = weatherDataAPI.weather[0].icon;
          setWeather(
            Adapter(
              APIWeatherProvider.OPENWEATHERMAP,
              InterfaceName.WEATHER,
              unit,
              weatherDataAPI
            ) as WeatherInterface
          );
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
          setWeather((weather: WeatherInterface) => ({
            ...((weather as WeatherInterface) ?? {}),
            icon: response?.url,
          }));
        } else console.log(response.status, response.text);
      } catch (error) {
        setIsIconWorking(false);
      }
      try {
        const response = await fetch(
          generateURL({
            toFetch: URLQuery.AIRPOLLUTION,
            lat: lat,
            lon: lon,
            language: language,
            units: unit,
          } as AppRequest)
        );
        if (response.ok) {
          const airPollutionDataAPI = await response.json();
          const airPollutionData = airPollutionDataAPI.list[0];
          setAirPollution(
            Adapter(
              APIWeatherProvider.OPENWEATHERMAP,
              InterfaceName.AIRPOLLUTION,
              unit,
              airPollutionData
            ) as AirPollutionInterface
          );
        } else console.log(response.status, response.text);
        setIsLoading(false);
      } catch (error) {}
    };
    fetchData();
  }, [lat, lon, language, unit]);

  const changeCity = useCallback(
    (
      newCity: SingleValue<{
        label: string;
        value: { lat: string; lon: string; name: string };
      }>
    ) => {
      if (newCity && fullCityName !== newCity.label) {
        localStorage.setItem(StorageKeys.CITYNAME, newCity.value.name);
        localStorage.setItem(StorageKeys.FULLCITYNAME, newCity.label);
        localStorage.setItem(StorageKeys.LAT, newCity.value.lat);
        localStorage.setItem(StorageKeys.LON, newCity.value.lon);
        setFullCityName(newCity.label);
        setCityName(newCity.value.name);
        setLat(Number(newCity.value.lat));
        setLon(Number(newCity.value.lon));
        setIsLoading(true);
      }
    },
    [fullCityName, cityName, lat, lon]
  );

  const changeLanguage = useCallback(
    (newLanguage: string) => {
      if (language !== newLanguage) {
        localStorage.setItem(StorageKeys.LANGUAGE, newLanguage);
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
    const { icon } = weather as WeatherInterface;
    if (iconWorking) {
      showIcon = (
        <WeatherIconContainer>
          <WeatherIcon src={icon} alt="" />
        </WeatherIconContainer>
      );
    } else {
      showIcon = (
        <WeatherIconContainer>
          <WeatherIcon src={notFoundIcon} alt="" />;
        </WeatherIconContainer>
      );
    }
    if (isLoading || icon === '') {
      toShow = (
        <SpinnerLogo
          src={loading}
          alt=""
          isDesktopOrLaptop={isDesktopOrLaptop}
          isMobileDevice={isMobileDevice}
          isSmallMobileDevice={isSmallMobileDevice}
        />
      );
    } else {
      const {
        realFeel,
        feelsLike,
        description,
        sunrise,
        sunset,
        humidity,
        pressure,
        windSpeed,
        visibility,
        windDirection,
        lastTimeChecked,
        lastDateChecked,
      } = weather as WeatherInterface;
      toShow = (
        <WeatherCard
          isDesktopOrLaptop={isDesktopOrLaptop}
          isMobileDevice={isMobileDevice}
          isSmallMobileDevice={isSmallMobileDevice}
        >
          <CitySearchBar changeCity={changeCity} />
          {validCoordinates ? (
            <>
              <LogoApp
                src={logo}
                alt=""
                isDesktopOrLaptop={isDesktopOrLaptop}
                isMobileDevice={isMobileDevice}
                isSmallMobileDevice={isSmallMobileDevice}
              />
              <TitleApp>
                <Subtitle
                  isDesktopOrLaptop={isDesktopOrLaptop}
                  isMobileDevice={isMobileDevice}
                  isSmallMobileDevice={isSmallMobileDevice}
                >
                  {t('words.weatherIn')} {cityName} ({countryNameShort})
                </Subtitle>
              </TitleApp>
              <AllDataContainer
                isDesktopOrLaptop={isDesktopOrLaptop}
                isMobileDevice={isMobileDevice}
                isSmallMobileDevice={isSmallMobileDevice}
              >
                <WeatherMainContainer>
                  {showIcon}
                  <WeatherMain>
                    <ColumnContainer>
                      <WeatherMainTemperature>
                        {realFeel}{' '}
                        {Units.IMPERIAL === unit
                          ? t('words.temperature.unit.imperial')
                          : t('words.temperature.unit.metric')}
                      </WeatherMainTemperature>
                      <Code
                        isMobileDevice={isMobileDevice}
                        isSmallMobileDevice={isSmallMobileDevice}
                      >
                        {t('words.temperature.feelsLike')} {feelsLike}{' '}
                        {Units.IMPERIAL === unit
                          ? t('words.temperature.unit.imperial')
                          : t('words.temperature.unit.metric')}
                      </Code>
                      <Code
                        isMobileDevice={isMobileDevice}
                        isSmallMobileDevice={isSmallMobileDevice}
                      >
                        {description}
                      </Code>
                      <SunriseSunsetInfo lat={lat} lon={lon} sunrise={sunrise} sunset={sunset} />
                    </ColumnContainer>
                  </WeatherMain>
                </WeatherMainContainer>
                <WeatherDataContainer>
                  <WeatherData>
                    <ColumnContainer>
                      <Code
                        isMobileDevice={isMobileDevice}
                        isSmallMobileDevice={isSmallMobileDevice}
                      >
                        {t('words.humidity')} {humidity}%
                      </Code>
                      <Code
                        isMobileDevice={isMobileDevice}
                        isSmallMobileDevice={isSmallMobileDevice}
                      >
                        {t('words.pressure')} {pressure} hPa
                      </Code>
                      <Code
                        isMobileDevice={isMobileDevice}
                        isSmallMobileDevice={isSmallMobileDevice}
                      >
                        {t('words.windInfo.wind')}
                        {windSpeed}{' '}
                        {Units.IMPERIAL === unit
                          ? t('words.windInfo.unit.imperial')
                          : t('words.windInfo.unit.metric')}{' '}
                        {t(`words.windInfo.windDirection.${windDirection}`)}
                      </Code>
                      <Code
                        isMobileDevice={isMobileDevice}
                        isSmallMobileDevice={isSmallMobileDevice}
                      >
                        {t('words.visibility')} {visibility} m
                      </Code>
                    </ColumnContainer>
                    <AirQualitySectionContainer>
                      <Code
                        isMobileDevice={isMobileDevice}
                        isSmallMobileDevice={isSmallMobileDevice}
                      >
                        {t('words.airPollution.aqi')}
                        {
                          Object.values(t('words.airPollution.status', { returnObjects: true }))[
                            airPollution?.AQI
                          ]
                        }
                      </Code>
                      <MoreInfoButton
                        isDesktopOrLaptop={isDesktopOrLaptop}
                        isMobileDevice={isMobileDevice}
                        isSmallMobileDevice={isSmallMobileDevice}
                        onClick={() => {
                          navigate(`/air_pollution_info`, {
                            state: { airPollution },
                          });
                        }}
                      >
                        {t('words.airPollution.moreInfo')}
                      </MoreInfoButton>
                    </AirQualitySectionContainer>
                  </WeatherData>
                </WeatherDataContainer>
                <UnitsContainer
                  isDesktopOrLaptop={isDesktopOrLaptop}
                  isMobileDevice={isMobileDevice}
                  isSmallMobileDevice={isSmallMobileDevice}
                >
                  <UnitsSubContainer
                    isMobileDevice={isMobileDevice}
                    isSmallMobileDevice={isSmallMobileDevice}
                  >
                    <UnitSpan
                      isSelected={Units.IMPERIAL === unit}
                      onClick={() => setUnit(Units.IMPERIAL)}
                    >
                      {t('words.unit.imperial')}
                    </UnitSpan>
                    <UnitSpan
                      isSelected={Units.METRIC === unit}
                      onClick={() => setUnit(Units.METRIC)}
                    >
                      {t('words.unit.metric')}
                    </UnitSpan>
                  </UnitsSubContainer>
                </UnitsContainer>
              </AllDataContainer>
            </>
          ) : (
            <LocationNotFoundContainer
              isDesktopOrLaptop={isDesktopOrLaptop}
              isMobileDevice={isMobileDevice}
              isSmallMobileDevice={isSmallMobileDevice}
            >
              <LocationNotFoundIcon
                src={locationNotFound}
                alt=""
                isDesktopOrLaptop={isDesktopOrLaptop}
                isMobileDevice={isMobileDevice}
                isSmallMobileDevice={isSmallMobileDevice}
              />
              <LocationNotFoundCode
                isMobileDevice={isMobileDevice}
                isSmallMobileDevice={isSmallMobileDevice}
              >
                {t('words.locationNotFound.funnyMessage')} {cityName}
              </LocationNotFoundCode>
              <BreakLine />
              <LocationNotFoundCode
                isMobileDevice={isMobileDevice}
                isSmallMobileDevice={isSmallMobileDevice}
              >
                {t('words.locationNotFound.realMessage')}
              </LocationNotFoundCode>
            </LocationNotFoundContainer>
          )}
          <FooterContainer
            isDesktopOrLaptop={isDesktopOrLaptop}
            isMobileDevice={isMobileDevice}
            isSmallMobileDevice={isSmallMobileDevice}
          >
            <ColumnContainer>
              <CenteredContainer>
                <Code isMobileDevice={isMobileDevice} isSmallMobileDevice={isSmallMobileDevice}>
                  {t('words.updatedAt')} {lastTimeChecked}
                </Code>
                <Code isMobileDevice={isMobileDevice} isSmallMobileDevice={isSmallMobileDevice}>
                  {t('words.date')} {lastDateChecked}
                </Code>
              </CenteredContainer>
            </ColumnContainer>
            <LanguageAndSocialNetworkContainer>
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
                  isDesktopOrLaptop={isDesktopOrLaptop}
                  isMobileDevice={isMobileDevice}
                  isSmallMobileDevice={isSmallMobileDevice}
                  mouseOver={mouseOver}
                  regular={social_network}
                  hover={social_network_hover}
                />
              </SocialNetworkIconContainer>
            </LanguageAndSocialNetworkContainer>
          </FooterContainer>
        </WeatherCard>
      );
    }
  } else {
    toShow = (
      <>
        <DangerLogo src={danger} alt="" />
        <BreakLine />
        <Code isMobileDevice={isMobileDevice} isSmallMobileDevice={isSmallMobileDevice}>
          {t('words.conectionError')}
        </Code>
      </>
    );
  }
  return (
    <>
      <GlobalStyle isSmallMobileDevice={isSmallMobileDevice} />
      {toShow}
    </>
  );
};

export default Weather;

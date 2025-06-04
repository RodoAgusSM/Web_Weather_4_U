import { useCallback, useEffect, useRef, useState } from 'react';
import Adapter from 'adapter/adapter';
import CitySearchBar from 'components/CitySearchBar/CitySearchBar';
import Language from 'components/Language/Language';
import StarsAnimation from 'components/Space/Space';
import WeatherDataCard from 'components/WeatherDataCard/WeatherDataCard';
import WeatherDataGrid from 'components/WeatherDataGrid/WeatherDataGrid';
import { iconExtension, iconURL } from 'config/config';
import { APIWeatherProvider, ClimateType, StorageKey, Units } from 'enums/index';
import useResponsiveDesign from 'hooks/useResponsiveDesign';
import DangerIcon from 'images/danger.png';
import InfoIconImg from 'images/infoIcon.png';
import LoadingIcon from 'images/loading.gif';
import LocationNotFoundIcon from 'images/location_not_found_icon.png';
import NotFoundIcon from 'images/not_found_icon.png';
import { ApiError, ApiResponse } from 'interfaces/index';
import {
  AirPollution as AirPollutionInterface,
  AppRequest,
  Weather as WeatherInterface,
} from 'interfaces/index';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { SingleValue } from 'react-select';
import GlobalStyles from 'styles/GlobalStyles';
import { CenteredContainer, Code, ColumnContainer } from 'styles/styles';
import { generateURL } from 'utils/helpers';

import {
  // Import all needed styled components
  AllDataContainer,
  BreakLine,
  CustomUnitsContainer,
  CustomWeatherDataContainer,
  CustomWeatherMainContainer,
  DangerLogo,
  DataColumnContainer,
  DescriptionText,
  FeelsLikeText,
  FooterContainer,
  InfoIcon,
  InfoIconButton,
  LanguageAndSocialNetworkContainer,
  LocationNotFoundCode,
  LocationNotFoundContainer,
  LocationNotFoundSpotImg,
  MainContentWrapper,
  SocialNetworkIconContainer,
  SpinnerLogo,
  Subtitle,
  TemperatureUnit,
  TemperatureUnitWrapper,
  TemperatureValue,
  TitleApp,
  UnitSpan,
  UnitsSubContainer,
  WeatherCard,
  WeatherIcon,
  WeatherIconContainer,
  WeatherMain,
} from './WeatherStyles';

const defaultWeather = {} as WeatherInterface;
const defaultAirPollution = {} as AirPollutionInterface;
const FETCH_INTERVAL_MS = 600000;

const Weather = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { isDesktopOrLaptop, isMobileDevice, isSmallMobileDevice } = useResponsiveDesign();

  // State management
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  const [validCoordinates, setValidCoordinates] = useState<boolean>(true);
  const [siteWorking, setIsSiteWorking] = useState<boolean>(true);
  const [iconWorking, setIsIconWorking] = useState<boolean>(true);
  const [cityName, setCityName] = useState<string>(
    localStorage.getItem(StorageKey.CityName) ?? 'Montevideo'
  );
  const [fullCityName, setFullCityName] = useState<string>(
    localStorage.getItem(StorageKey.FullCityName) ?? 'Montevideo, Uruguay'
  );
  const [lat, setLat] = useState<number>(Number(localStorage.getItem(StorageKey.Lat)) || -34.8335);
  const [lon, setLon] = useState<number>(Number(localStorage.getItem(StorageKey.Lon)) || -56.1674);
  const [language, setLanguage] = useState<string>(i18n.language);
  const [unit, setUnit] = useState<Units>(Units.Metric);
  const [countryNameShort, setCountryNameShort] = useState<string>();
  const [weather, setWeather] = useState<WeatherInterface>(defaultWeather);
  const [airPollution, setAirPollution] = useState<AirPollutionInterface>(defaultAirPollution);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mainContainerHovered, setMainContainerHovered] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // We're using useResponsiveDesign hook instead of manual width tracking

  // Fetch data effect
  useEffect(() => {
    const fetchDataInterval = async () => await fetchData();
    fetchDataInterval();

    if (!intervalRef.current) {
      intervalRef.current = setInterval(fetchData, FETCH_INTERVAL_MS);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [lat, lon, language, unit]);

  // API error handling
  const handleAPIError: ApiError = (error: any, response?: ApiResponse) => {
    console.error('Error fetching data:', error);
    if (response?.data !== undefined && response?.data.message === 'city not found') {
      setValidCoordinates(false);
    } else {
      setIsSiteWorking(false);
    }
  };

  // Fetch data from API
  const fetchFromAPI = async (
    config: AppRequest,
    successCallback: Function,
    errorCallback: ApiError = handleAPIError
  ) => {
    try {
      const response = await fetch(generateURL(config));
      if (response.ok) {
        const data = await response.json();
        successCallback(data);
      } else {
        console.log(response.status, await response.text());
      }
    } catch (error: any) {
      errorCallback(error);
    }
  };

  // Fetch weather icon
  const fetchIconFromAPI = async (iconValue: string) => {
    try {
      setIsIconWorking(true);
      const iconUrl = `${iconURL}${iconValue}${iconExtension}`;
      const response = await fetch(iconUrl);
      if (response.ok) {
        setWeather((weather) => ({
          ...weather,
          icon: response.url,
        }));
      } else {
        console.log(response.status, await response.text());
      }
    } catch (error) {
      setIsIconWorking(false);
    }
  };

  // Main data fetching function
  const fetchData = async () => {
    const weatherRequest: AppRequest = {
      toFetch: ClimateType.Weather,
      lat,
      lon,
      language,
      units: unit,
    };

    const airPollutionRequest: AppRequest = {
      toFetch: ClimateType.AirPollution,
      lat,
      lon,
      language,
      units: unit,
    };

    // Fetch weather data
    await fetchFromAPI(weatherRequest, (weatherDataAPI: any) => {
      setIsSiteWorking(true);
      setCountryNameShort(weatherDataAPI.sys.country);
      fetchIconFromAPI(weatherDataAPI.weather[0].icon);
      setWeather(
        Adapter(
          APIWeatherProvider.OpenWeatherMap,
          ClimateType.Weather,
          unit,
          weatherDataAPI
        ) as WeatherInterface
      );
    });

    // Fetch air pollution data
    await fetchFromAPI(airPollutionRequest, (airPollutionDataAPI: any) => {
      const airPollutionData = airPollutionDataAPI.list[0];
      setAirPollution(
        Adapter(
          APIWeatherProvider.OpenWeatherMap,
          ClimateType.AirPollution,
          unit,
          airPollutionData
        ) as AirPollutionInterface
      );
    });

    setIsLoading(false);
  };

  // City change handler
  const changeCity = useCallback(
    (
      newCity: SingleValue<{ label: string; value: { lat: string; lon: string; name: string } }>
    ) => {
      if (newCity && fullCityName !== newCity.label) {
        localStorage.setItem(StorageKey.CityName, newCity.value.name);
        localStorage.setItem(StorageKey.FullCityName, newCity.label);
        localStorage.setItem(StorageKey.Lat, newCity.value.lat);
        localStorage.setItem(StorageKey.Lon, newCity.value.lon);

        setFullCityName(newCity.label);
        setCityName(newCity.value.name);
        setLat(Number(newCity.value.lat));
        setLon(Number(newCity.value.lon));
        setIsLoading(true);
      }
    },
    [fullCityName]
  );

  // Language change handler
  const changeLanguage = useCallback(
    (newLanguage: string) => {
      if (language !== newLanguage) {
        localStorage.setItem(StorageKey.Language, newLanguage);
        i18n.changeLanguage(newLanguage);
        setLanguage(newLanguage);
        setIsLoading(true);
      }
    },
    [language, i18n]
  );

  // Animation setup effect
  useEffect(() => {
    if (!isLoading && weather.icon) {
      setTimeout(() => {
        const elements = document.querySelectorAll('[data-animate="true"]');
        elements.forEach((element, index) => {
          (element as HTMLElement).style.setProperty('--index', index.toString());
        });
      }, 100);
    }
  }, [isLoading, weather.icon]);

  // Add a touch event handler for better mobile interaction
  const handleTouchStart = useCallback(() => {
    // For handling touch events specifically
    if (isMobileDevice) {
      // Additional touch optimizations can be added here
    }
  }, [isMobileDevice]);

  // Render weather icon
  const renderWeatherIcon = () => {
    const { icon } = weather as WeatherInterface;
    return (
      <WeatherIconContainer>
        <WeatherIcon src={iconWorking ? icon : NotFoundIcon} alt="" />
      </WeatherIconContainer>
    );
  };

  // Render weather data
  const renderWeatherData = () => {
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
      clouds,
      lastTimeChecked,
      lastDateChecked,
    } = weather as WeatherInterface;

    const responsiveProps = {
      $isDesktopOrLaptop: isDesktopOrLaptop,
      $isMobileDevice: isMobileDevice,
      $isSmallMobileDevice: isSmallMobileDevice,
    };

    return (
      <>
        <GlobalStyles />
        <WeatherCard {...responsiveProps} data-animate="true" onTouchStart={handleTouchStart}>
          <StarsAnimation />
          <CitySearchBar changeCity={changeCity} />

          {validCoordinates ? (
            <>
              <TitleApp>
                <Subtitle {...responsiveProps}>
                  {t('words.weatherIn')} {cityName} ({countryNameShort})
                </Subtitle>
              </TitleApp>

              <AllDataContainer {...responsiveProps}>
                {/* Main weather display */}
                <CustomWeatherMainContainer
                  data-animate="true"
                  $isHovered={mainContainerHovered}
                  onMouseEnter={() => setMainContainerHovered(true)}
                  onMouseLeave={() => setMainContainerHovered(false)}
                  style={{ touchAction: 'manipulation' }}
                >
                  <MainContentWrapper>
                    {/* Column 1: Weather Icon */}
                    {renderWeatherIcon()}

                    {/* Column 2: Temperature information in 3 rows */}
                    <WeatherMain>
                      {/* Row 1: Temperature */}
                      <TemperatureUnitWrapper>
                        <TemperatureValue>{realFeel}</TemperatureValue>
                        <TemperatureUnit>
                          {Units.Imperial === unit
                            ? t('words.temperature.unit.imperial')
                            : t('words.temperature.unit.metric')}
                        </TemperatureUnit>
                      </TemperatureUnitWrapper>

                      {/* Row 2: Feels Like */}
                      <FeelsLikeText>
                        {t('words.temperature.feelsLike')} {feelsLike}{' '}
                        {Units.Imperial === unit
                          ? t('words.temperature.unit.imperial')
                          : t('words.temperature.unit.metric')}
                      </FeelsLikeText>

                      {/* Row 3: Weather Description */}
                      <DescriptionText>{description}</DescriptionText>
                    </WeatherMain>
                  </MainContentWrapper>
                </CustomWeatherMainContainer>

                {/* Weather data cards */}
                <CustomWeatherDataContainer>
                  <DataColumnContainer>
                    {/* Sunrise and sunset */}
                    <WeatherDataGrid>
                      <WeatherDataCard label={t('words.sunrise')} value={sunrise} />
                      <WeatherDataCard label={t('words.sunset')} value={sunset} />
                    </WeatherDataGrid>

                    {/* Humidity and pressure */}
                    <WeatherDataGrid>
                      <WeatherDataCard label={t('words.humidity')} value={humidity} unit="%" />
                      <WeatherDataCard label={t('words.pressure')} value={pressure} unit="hPa" />
                    </WeatherDataGrid>

                    {/* Wind and visibility */}
                    <WeatherDataGrid>
                      <WeatherDataCard
                        label={t('words.windInfo.wind')}
                        value={`${windSpeed} ${
                          Units.Imperial === unit
                            ? t('words.windInfo.unit.imperial')
                            : t('words.windInfo.unit.metric')
                        } ${t(`words.windInfo.windDirection.${windDirection}`)}`}
                      />
                      <WeatherDataCard
                        label={t('words.visibilityInfo.visibility')}
                        value={visibility}
                        unit={
                          Units.Imperial === unit
                            ? t('words.visibilityInfo.unit.imperial')
                            : t('words.visibilityInfo.unit.metric')
                        }
                      />
                    </WeatherDataGrid>

                    {/* Air quality and Cloudiness */}
                    <WeatherDataGrid>
                      <WeatherDataCard
                        label={t('words.airPollution.aqi')}
                        value={t(`words.airPollution.status.${airPollution?.AQI}`)}
                        showInfoButton={true}
                        onInfoClick={() =>
                          navigate(`/air_pollution_info`, { state: { airPollution } })
                        }
                      />
                      <WeatherDataCard label={t('words.clouds')} value={clouds} unit="%" />
                    </WeatherDataGrid>
                  </DataColumnContainer>
                </CustomWeatherDataContainer>

                {/* Units selection */}
                <CustomUnitsContainer {...responsiveProps} data-animate="true">
                  <UnitsSubContainer
                    $isMobileDevice={isMobileDevice}
                    $isSmallMobileDevice={isSmallMobileDevice}
                  >
                    <UnitSpan
                      $isSelected={Units.Imperial === unit}
                      onClick={() => setUnit(Units.Imperial)}
                    >
                      {t('words.unit.imperial')}
                    </UnitSpan>
                    <UnitSpan
                      $isSelected={Units.Metric === unit}
                      onClick={() => setUnit(Units.Metric)}
                    >
                      {t('words.unit.metric')}
                    </UnitSpan>
                  </UnitsSubContainer>
                </CustomUnitsContainer>
              </AllDataContainer>

              {/* Footer */}
              <FooterContainer {...responsiveProps}>
                <ColumnContainer>
                  <CenteredContainer>
                    <Code
                      $isMobileDevice={isMobileDevice}
                      $isSmallMobileDevice={isSmallMobileDevice}
                    >
                      {t('words.updatedAt')} {lastTimeChecked}
                    </Code>
                    <Code
                      $isMobileDevice={isMobileDevice}
                      $isSmallMobileDevice={isSmallMobileDevice}
                    >
                      {t('words.date')} {lastDateChecked}
                    </Code>
                  </CenteredContainer>
                </ColumnContainer>
                <LanguageAndSocialNetworkContainer>
                  <Language changeLanguage={changeLanguage} />
                  <SocialNetworkIconContainer
                    $isDesktopOrLaptop={isDesktopOrLaptop}
                    onClick={() => navigate(`/social_network`)}
                  >
                    <InfoIconButton
                      aria-label="View social networks"
                      onMouseEnter={() => setMouseOver(true)}
                      onMouseLeave={() => setMouseOver(false)}
                    >
                      <InfoIcon src={InfoIconImg} alt="Info" $mouseOver={mouseOver} />
                    </InfoIconButton>
                  </SocialNetworkIconContainer>
                </LanguageAndSocialNetworkContainer>
              </FooterContainer>
            </>
          ) : (
            // Location not found view
            <LocationNotFoundContainer {...responsiveProps} data-animate="true">
              <LocationNotFoundSpotImg src={LocationNotFoundIcon} alt="" {...responsiveProps} />
              <LocationNotFoundCode
                $isMobileDevice={isMobileDevice}
                $isSmallMobileDevice={isSmallMobileDevice}
              >
                {t('words.locationNotFound.funnyMessage')} {cityName}
              </LocationNotFoundCode>
              <BreakLine />
              <LocationNotFoundCode
                $isMobileDevice={isMobileDevice}
                $isSmallMobileDevice={isSmallMobileDevice}
              >
                {t('words.locationNotFound.realMessage')}
              </LocationNotFoundCode>
            </LocationNotFoundContainer>
          )}
        </WeatherCard>
      </>
    );
  };

  // Render error message
  const renderErrorMessage = () => (
    <>
      <DangerLogo src={DangerIcon} alt="" />
      <BreakLine />
      <Code $isMobileDevice={isMobileDevice} $isSmallMobileDevice={isSmallMobileDevice}>
        {t('words.conectionError')}
      </Code>
    </>
  );

  return (
    <>
      <GlobalStyles />
      <div
        style={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {isLoading || !weather.icon ? (
          <SpinnerLogo
            src={LoadingIcon}
            alt=""
            $isDesktopOrLaptop={isDesktopOrLaptop}
            $isMobileDevice={isMobileDevice}
            $isSmallMobileDevice={isSmallMobileDevice}
          />
        ) : siteWorking ? (
          renderWeatherData()
        ) : (
          renderErrorMessage()
        )}
      </div>
    </>
  );
};

export default Weather;

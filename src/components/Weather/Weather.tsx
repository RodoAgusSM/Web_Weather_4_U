import { useCallback, useEffect, useRef, useState } from 'react';
import Adapter from 'adapter/adapter';
import CitySearchBar from 'components/CitySearchBar/CitySearchBar';
import Language from 'components/Language/Language';
import MainWeatherDisplay from 'components/MainWeatherDisplay/MainWeatherDisplay';
import StarsAnimation from 'components/Space/Space';
import WeatherDataCard from 'components/WeatherDataCard/WeatherDataCard';
import WeatherDataGrid from 'components/WeatherDataGrid/WeatherDataGrid';
import WeatherDataGridSkeleton from 'components/WeatherDataGrid/WeatherDataGridSkeleton';
import WeatherSpinner from 'components/WeatherSpinner/WeatherSpinner';
import { iconExtension, iconURL } from 'config/config';
import { APIWeatherProvider, ClimateType, StorageKey, Units } from 'enums/index';
import useResponsiveDesign from 'hooks/useResponsiveDesign';
import DangerIcon from 'images/danger.png';
import InfoIconImg from 'images/infoIcon.png';
import LocationNotFoundIcon from 'images/location_not_found_icon.png';
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
import { Code } from 'styles/styles';
import { generateURL } from 'utils/helpers';

import {
  // Import all needed styled components
  AllDataContainer,
  BreakLine,
  CustomUnitsContainer,
  CustomWeatherDataContainer,
  DangerLogo,
  DataColumnContainer,
  FooterContainer,
  InfoIcon,
  InfoIconButton,
  LanguageAndSocialNetworkContainer,
  LocationNotFoundCode,
  LocationNotFoundContainer,
  LocationNotFoundSpotImg,
  SocialNetworkIconContainer,
  TimeInfoContainer,
  TimeInfoDivider,
  TimeInfoItem,
  Title,
  UnitSpan,
  UnitsSubContainer,
  WeatherCard,
  WeatherContentContainer,
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

  // Add state to track individual card loading states
  const [cardsLoading, setCardsLoading] = useState({
    airQuality: true,
    wind: true,
    atmosphere: true,
    time: true,
  });

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
  }, [lat, lon, unit]); // Removed language from dependencies

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
    // Reset all loading states when starting a new fetch
    setCardsLoading({
      airQuality: true,
      wind: true,
      atmosphere: true,
      time: true,
    });

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

    // Create promises for parallel fetching
    const weatherPromise = fetchFromAPI(weatherRequest, (weatherDataAPI: any) => {
      setIsSiteWorking(true);
      setCountryNameShort(weatherDataAPI.sys.country);
      fetchIconFromAPI(weatherDataAPI.weather[0].icon);

      const weatherData = Adapter(
        APIWeatherProvider.OpenWeatherMap,
        ClimateType.Weather,
        unit,
        weatherDataAPI
      ) as WeatherInterface;

      setWeather(weatherData);

      // Once weather data is received, we can show wind, atmosphere, and time data
      setCardsLoading((prev) => ({
        ...prev,
        wind: false,
        atmosphere: false,
        time: false,
      }));
    });

    const airPollutionPromise = fetchFromAPI(airPollutionRequest, (airPollutionDataAPI: any) => {
      const airPollutionData = airPollutionDataAPI.list[0];
      setAirPollution(
        Adapter(
          APIWeatherProvider.OpenWeatherMap,
          ClimateType.AirPollution,
          unit,
          airPollutionData
        ) as AirPollutionInterface
      );

      // Once air pollution data is received, we can show air quality
      setCardsLoading((prev) => ({ ...prev, airQuality: false }));
    });

    // Wait for all data to be fetched
    await Promise.all([weatherPromise, airPollutionPromise])
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
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

  // Language change handler - updated to prevent full reload
  const changeLanguage = useCallback(
    (newLanguage: string) => {
      if (language !== newLanguage) {
        localStorage.setItem(StorageKey.Language, newLanguage);
        i18n.changeLanguage(newLanguage);
        setLanguage(newLanguage);

        // Don't set isLoading to true - this prevents the spinner from showing
        // Don't refetch data - we only need to update the UI with existing data

        // Instead, just update cards directly using the new language
        // This will cause a re-render with the new translations without reloading data
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
      icon,
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
            <WeatherContentContainer>
              <Title {...responsiveProps}>
                {t('words.weatherIn')} {cityName} ({countryNameShort})
              </Title>

              <AllDataContainer {...responsiveProps}>
                {/* Main weather display */}
                <MainWeatherDisplay
                  icon={icon}
                  iconWorking={iconWorking}
                  realFeel={realFeel}
                  feelsLike={feelsLike}
                  description={description}
                  unit={unit}
                />

                {/* Weather data cards */}
                <CustomWeatherDataContainer>
                  <DataColumnContainer>
                    {/* Air quality and Clouds */}
                    {cardsLoading.airQuality ? (
                      <WeatherDataGridSkeleton hasInfoButton={true} />
                    ) : (
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
                    )}

                    {/* Wind and Visibility */}
                    {cardsLoading.wind ? (
                      <WeatherDataGridSkeleton />
                    ) : (
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
                    )}

                    {/* Humidity and Pressure */}
                    {cardsLoading.atmosphere ? (
                      <WeatherDataGridSkeleton />
                    ) : (
                      <WeatherDataGrid>
                        <WeatherDataCard label={t('words.humidity')} value={humidity} unit="%" />
                        <WeatherDataCard label={t('words.pressure')} value={pressure} unit="hPa" />
                      </WeatherDataGrid>
                    )}

                    {/* Sunrise and Sunset */}
                    {cardsLoading.time ? (
                      <WeatherDataGridSkeleton />
                    ) : (
                      <WeatherDataGrid>
                        <WeatherDataCard label={t('words.sunrise')} value={sunrise} />
                        <WeatherDataCard label={t('words.sunset')} value={sunset} />
                      </WeatherDataGrid>
                    )}
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
                <TimeInfoContainer>
                  <TimeInfoItem>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span>{t('words.updatedAt')}</span> {lastTimeChecked}
                  </TimeInfoItem>
                  <TimeInfoDivider aria-hidden="true" />
                  <TimeInfoItem>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span>{t('words.date')}</span> {lastDateChecked}
                  </TimeInfoItem>
                </TimeInfoContainer>

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
            </WeatherContentContainer>
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
        {!weather.icon ? (
          <WeatherSpinner size={isDesktopOrLaptop ? 'large' : 'medium'} />
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

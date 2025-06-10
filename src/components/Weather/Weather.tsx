import { useCallback, useEffect, useRef, useState } from 'react';
import { Adapter, convertWeatherUnits, formatWeatherTimeByLanguage } from 'adapter/adapter';
import CitySearchBar from 'components/CitySearchBar/CitySearchBar';
import Language from 'components/Language/Language';
import MainWeatherDisplay from 'components/MainWeatherDisplay/MainWeatherDisplay';
import StarsAnimation from 'components/Space/Space';
import Toggle from 'components/Toggle/Toggle';
import WeatherDataCard from 'components/WeatherDataCard/WeatherDataCard';
import WeatherDataGrid from 'components/WeatherDataGrid/WeatherDataGrid';
import WeatherDataGridSkeleton from 'components/WeatherDataGrid/WeatherDataGridSkeleton';
import WeatherSpinner from 'components/WeatherSpinner/WeatherSpinner';
import { iconExtension, iconURL } from 'config/config';
import { APIWeatherProvider, ClimateType, StorageKey, Units } from 'enums/index';
import useResponsiveDesign from 'hooks/useResponsiveDesign';
import DangerIcon from 'images/danger.png';
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
import { BoxWrapper, Code } from 'styles/styles';
import { generateURL } from 'utils/helpers';

import {
  BreakLine,
  CustomWeatherDataContainer,
  DangerLogo,
  DataColumnContainer,
  FadeInContainer,
  FooterContainer,
  InfoButton,
  InfoButtonText,
  LanguageAndSocialNetworkContainer,
  LocationNotFoundCode,
  LocationNotFoundContainer,
  LocationNotFoundSpotImg,
  SocialNetworkIconContainer,
  TimeInfoContainer,
  TimeInfoDivider,
  TimeInfoItem,
  WeatherCardWithTransition,
  WeatherContentContainer,
} from './WeatherStyles';

const defaultWeather = {} as WeatherInterface;
const defaultAirPollution = {} as AirPollutionInterface;
const FETCH_INTERVAL_MS = 600000;
const LOADING_DELAY_MS = 300;

const Weather = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { isDesktopOrLaptop, isMobileDevice, isSmallMobileDevice } = useResponsiveDesign();
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
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  const [cardsLoading, setCardsLoading] = useState({
    airQuality: true,
    wind: true,
    atmosphere: true,
    time: true,
  });
  const [uiReady, setUiReady] = useState<boolean>(false);
  const [showSkeletons, setShowSkeletons] = useState<boolean>(true);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const initialLoadRef = useRef<boolean>(true);

  useEffect(() => {
    const fetchDataInterval = async () => {
      if (initialLoadRef.current) {
        setShowSkeletons(true);
        await fetchData();
        initialLoadRef.current = false;
      } else {
        // On subsequent loads, just show the spinner instead of skeletons
        setShowSkeletons(false);
        setUiReady(false);
        setIsLoading(true);
        setTimeout(async () => {
          await fetchData();
        }, LOADING_DELAY_MS);
      }
    };

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
  }, [lat, lon]);

  // Add effect to control UI ready state
  useEffect(() => {
    if (!isLoading && weather.icon && !Object.values(cardsLoading).some((value) => value)) {
      // Small delay before showing UI to ensure everything is ready
      const timer = setTimeout(() => {
        setUiReady(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading, weather.icon, cardsLoading]);

  const handleAPIError: ApiError = (error: any, response?: ApiResponse) => {
    console.error('Error fetching data:', error);
    if (response?.data !== undefined && response?.data.message === 'city not found') {
      setValidCoordinates(false);
    } else {
      setIsSiteWorking(false);
    }
  };

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

  const fetchData = async () => {
    if (initialLoadRef.current) {
      setCardsLoading({
        airQuality: true,
        wind: true,
        atmosphere: true,
        time: true,
      });
    } else {
      setCardsLoading({
        airQuality: false,
        wind: false,
        atmosphere: false,
        time: false,
      });
    }

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

    // Modify to batch state updates
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
    });

    await Promise.all([weatherPromise, airPollutionPromise])
      .then(() => {
        setDataFetched(true);
        setCardsLoading({
          airQuality: false,
          wind: false,
          atmosphere: false,
          time: false,
        });
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, LOADING_DELAY_MS);
      });
  };

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

  const changeLanguage = useCallback(
    (newLanguage: string) => {
      if (language !== newLanguage) {
        localStorage.setItem(StorageKey.Language, newLanguage);
        i18n.changeLanguage(newLanguage);
        setLanguage(newLanguage);

        if (weather && Object.keys(weather).length > 0) {
          const weatherData = formatWeatherTimeByLanguage(weather) as WeatherInterface;
          setWeather(weatherData);
        }
      }
    },
    [language, i18n, weather]
  );

  const changeUnit = useCallback(
    (newUnit: Units) => {
      if (unit !== newUnit) {
        if (weather && Object.keys(weather).length > 0) {
          const weatherData = convertWeatherUnits(newUnit, weather) as WeatherInterface;
          setWeather(weatherData);
          setUnit(newUnit);
        }
      }
    },
    [unit, weather]
  );

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

  const handleTouchStart = useCallback(() => {
    if (isMobileDevice) {
    }
  }, [isMobileDevice]);

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

    const getUniqueKey = (prefix: string, value: string) => `${prefix}-${language}-${value}`;

    const unitToggleItems = [
      { id: 'imperial', label: t('words.unit.imperial'), value: Units.Imperial },
      { id: 'metric', label: t('words.unit.metric'), value: Units.Metric },
    ];

    return (
      <>
        <GlobalStyles />
        <WeatherCardWithTransition
          {...responsiveProps}
          data-animate="true"
          onTouchStart={handleTouchStart}
          $isVisible={uiReady}
        >
          <StarsAnimation />
          <CitySearchBar changeCity={changeCity} />

          {validCoordinates ? (
            <FadeInContainer $isVisible={uiReady}>
              <WeatherContentContainer>
                <BoxWrapper {...responsiveProps}>
                  <MainWeatherDisplay
                    icon={icon}
                    iconWorking={iconWorking}
                    location={cityName + ', ' + countryNameShort}
                    realFeel={realFeel}
                    feelsLike={feelsLike}
                    description={description}
                    unit={unit}
                  />

                  <CustomWeatherDataContainer>
                    <DataColumnContainer>
                      {/* Air quality and clouds */}
                      {showSkeletons && cardsLoading.airQuality ? (
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

                      {/* Wind and visibility - keep together as they're related to air conditions */}
                      {showSkeletons && cardsLoading.wind ? (
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

                      {/* Humidity and pressure - keep together as they're related atmospheric conditions */}
                      {showSkeletons && cardsLoading.atmosphere ? (
                        <WeatherDataGridSkeleton />
                      ) : (
                        <WeatherDataGrid>
                          <WeatherDataCard label={t('words.humidity')} value={humidity} unit="%" />
                          <WeatherDataCard
                            label={t('words.pressure')}
                            value={pressure}
                            unit="hPa"
                          />
                        </WeatherDataGrid>
                      )}

                      {/* Sun data - sunrise/sunset */}
                      {showSkeletons && cardsLoading.time ? (
                        <WeatherDataGridSkeleton />
                      ) : (
                        <WeatherDataGrid key={`time-grid-${language}`}>
                          <WeatherDataCard
                            key={getUniqueKey('sunrise', sunrise)}
                            label={t('words.sunrise')}
                            value={sunrise}
                          />
                          <WeatherDataCard
                            key={getUniqueKey('sunset', sunset)}
                            label={t('words.sunset')}
                            value={sunset}
                          />
                        </WeatherDataGrid>
                      )}
                    </DataColumnContainer>
                  </CustomWeatherDataContainer>
                </BoxWrapper>

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

                  <Toggle
                    items={unitToggleItems}
                    selectedValue={unit}
                    onChange={(value) => changeUnit(value as Units)}
                  />

                  <LanguageAndSocialNetworkContainer>
                    <Language changeLanguage={changeLanguage} />
                    <SocialNetworkIconContainer
                      $isDesktopOrLaptop={isDesktopOrLaptop}
                      onClick={() => navigate(`/social_network`)}
                    >
                      <InfoButton>
                        <InfoButtonText>i</InfoButtonText>
                      </InfoButton>
                    </SocialNetworkIconContainer>
                  </LanguageAndSocialNetworkContainer>
                </FooterContainer>
              </WeatherContentContainer>
            </FadeInContainer>
          ) : (
            <FadeInContainer $isVisible={uiReady}>
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
            </FadeInContainer>
          )}
        </WeatherCardWithTransition>
      </>
    );
  };

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
        {!dataFetched || isLoading ? (
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

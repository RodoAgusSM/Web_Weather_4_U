import { memo, useCallback, useEffect, useRef, useState } from 'react';
import DangerIcon from 'images/danger.png';
import LocationNotFoundIcon from 'images/location_not_found_icon.png';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { SingleValue } from 'react-select';

import { convertWeatherUnits, formatWeatherTimeByLanguage } from '../../../adapters';
import { useTheme } from '../../../context/ThemeContext';
import {
  AirPollution as AirPollutionInterface,
  Weather as WeatherInterface,
} from '../../../domain/entities';
import { StorageKey, Units } from '../../../shared/enums/index';
import GlobalStyles from '../../../styles/GlobalStyles';
import { BoxContainer, BoxWrapper, Code } from '../../../styles/styles';
import { darkTheme, lightTheme } from '../../../styles/theme';
import useResponsiveDesign from '../../hooks/useResponsiveDesign';
import useWeather from '../../hooks/useWeather';
import CitySearchBar from '../CitySearchBar/CitySearchBar';
import Language from '../Language/Language';
import MainWeatherDisplay from '../MainWeatherDisplay/MainWeatherDisplay';
import StarsAnimation from '../Space/Space';
import Toggle from '../Toggle/Toggle';
import TriToggle from '../TriToggle/TriToggle';
import WeatherDataCard from '../WeatherDataCard/WeatherDataCard';
import WeatherDataGrid from '../WeatherDataGrid/WeatherDataGrid';
import WeatherDataGridSkeleton from '../WeatherDataGrid/WeatherDataGridSkeleton';

import WeatherSkeleton from './WeatherSkeleton';
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
  WeatherContentContainer,
} from './WeatherStyles';

const defaultWeather = {} as WeatherInterface;
const defaultAirPollution = {} as AirPollutionInterface;
const LOADING_DELAY_MS = 300;

const Weather = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { mode, setMode, isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;
  const { isDesktopOrLaptop, isMobileDevice, isSmallMobileDevice, isLandscape, isPortrait } =
    useResponsiveDesign();
  const [isHovered, setIsHovered] = useState(false);
  const [validCoordinates] = useState<boolean>(true);
  const [cityName, setCityName] = useState<string>(
    localStorage.getItem(StorageKey.CityName) ?? 'Montevideo',
  );
  const [fullCityName, setFullCityName] = useState<string>(
    localStorage.getItem(StorageKey.FullCityName) ?? 'Montevideo, Uruguay',
  );
  const [lat, setLat] = useState<number>(Number(localStorage.getItem(StorageKey.Lat)) || -34.8335);
  const [lon, setLon] = useState<number>(Number(localStorage.getItem(StorageKey.Lon)) || -56.1674);
  const [language, setLanguage] = useState<string>(i18n.language);
  const [unit, setUnit] = useState<Units>(Units.Metric);
  const [countryNameShort, setCountryNameShort] = useState<string>();
  const [weather, setWeather] = useState<WeatherInterface>(defaultWeather);
  const [airPollution, setAirPollution] = useState<AirPollutionInterface>(defaultAirPollution);
  const [uiReady, setUiReady] = useState<boolean>(false);
  const [showSkeletons, setShowSkeletons] = useState<boolean>(true);

  const initialLoadRef = useRef<boolean>(true);

  const {
    weather: hwWeather,
    airPollution: hwAir,
    isLoading,
    siteWorking,
    iconWorking,
    refetch,
    rawWeather,
  } = useWeather({ lat, lon, language, unit, fetchIntervalMs: 10 * 60 * 1000 });

  const {
    realFeel = 0,
    feelsLike = 0,
    description = '',
    sunrise = '',
    sunset = '',
    humidity = 0,
    pressure = 0,
    windSpeed = 0,
    visibility = 0,
    windDirection = '',
    clouds = 0,
    lastTimeChecked = '',
    lastDateChecked = '',
    icon = '',
  } = weather as WeatherInterface;

  const cardsLoading = {
    airQuality: isLoading,
    wind: isLoading,
    atmosphere: isLoading,
    time: isLoading,
  };

  useEffect(() => {
    setWeather(hwWeather as WeatherInterface);
  }, [hwWeather]);

  useEffect(() => {
    setAirPollution(hwAir as AirPollutionInterface);
  }, [hwAir]);

  useEffect(() => {
    console.log('rawWeather:', rawWeather);
    console.log('rawWeather type:', typeof rawWeather);
    console.log('rawWeather is null?', rawWeather === null);
    console.log('rawWeather is undefined?', rawWeather === undefined);

    if (!rawWeather) {
      console.log('Exiting early because rawWeather is falsy');
      return;
    }
    try {
      console.log('rawWeather.sys:', rawWeather.sys);
      console.log('rawWeather.sys.country:', rawWeather.sys?.country);
      setCountryNameShort(rawWeather.sys?.country);
    } catch (e) {
      console.log('Error processing rawWeather:', e);
    }
  }, [rawWeather]);

  useEffect(() => {
    if (initialLoadRef.current) {
      setShowSkeletons(true);
      initialLoadRef.current = false;
    } else {
      setShowSkeletons(false);
      setUiReady(false);
      setTimeout(() => {
        refetch();
      }, LOADING_DELAY_MS);
    }
  }, [lat, lon]);

  useEffect(() => {
    if (!isLoading) {
      setShowSkeletons(false);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setUiReady(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const changeCity = useCallback(
    (
      newCity: SingleValue<{ label: string; value: { lat: string; lon: string; name: string } }>,
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
        setShowSkeletons(true);
        setUiReady(false);
      }
    },
    [fullCityName],
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
    [language, i18n, weather],
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
    [unit, weather],
  );

  useEffect(() => {
    if (!isLoading && icon) {
      setTimeout(() => {
        const elements = document.querySelectorAll('[data-animate="true"]');
        elements.forEach((element, index) => {
          (element as HTMLElement).style.setProperty('--index', index.toString());
        });
      }, 100);
    }
  }, [isLoading, icon]);

  const handleTouchStart = useCallback(() => {
    if (isMobileDevice) {
    }
  }, [isMobileDevice]);

  const renderWeatherData = () => {
    const responsiveProps = {
      $isDesktopOrLaptop: isDesktopOrLaptop,
      $isMobileDevice: isMobileDevice,
      $isSmallMobileDevice: isSmallMobileDevice,
      $isPortrait: isPortrait,
      $isLandscape: isLandscape,
    };

    const getUniqueKey = (prefix: string, value: string) => `${prefix}-${language}-${value}`;

    const unitToggleItems = [
      { id: 'imperial', label: t('words.unit.imperial'), value: Units.Imperial },
      { id: 'metric', label: t('words.unit.metric'), value: Units.Metric },
    ];

    const themeToggleItems = [
      {
        id: 'light',
        value: 'light',
        icon: (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="#FFD700"
            stroke="#FFD700"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        ),
      },
      {
        id: 'dark',
        value: 'dark',
        icon: (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="#000000"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        ),
      },
      {
        id: 'system',
        value: 'system',
        icon: (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="#D3D3D3"
            stroke="#36454F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
        ),
      },
    ];

    return (
      <>
        <GlobalStyles theme={theme} />
        <div
          style={{
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <BoxContainer
            {...responsiveProps}
            theme={theme}
            data-animate="true"
            onTouchStart={handleTouchStart}>
            <StarsAnimation />
            <CitySearchBar changeCity={changeCity} />

            {validCoordinates ? (
              <FadeInContainer $isVisible={uiReady}>
                <WeatherContentContainer>
                  <BoxWrapper {...responsiveProps}>
                    <MainWeatherDisplay
                      icon={icon}
                      iconWorking={iconWorking}
                      location={cityName + (countryNameShort ? ', ' + countryNameShort : '')}
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
                            <WeatherDataCard
                              label={t('words.humidity')}
                              value={humidity}
                              unit="%"
                            />
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
                    <TimeInfoContainer
                      theme={theme}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      $isMobileDevice={responsiveProps.$isMobileDevice}>
                      <TimeInfoItem theme={theme} $isHovered={isHovered}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span>{t('words.updatedAt')}</span> {lastTimeChecked}
                      </TimeInfoItem>
                      <TimeInfoDivider aria-hidden="true" />
                      <TimeInfoItem theme={theme} $isHovered={isHovered}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round">
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
                      onChange={value => changeUnit(value as Units)}
                    />
                    <TriToggle
                      items={themeToggleItems}
                      selectedValue={mode}
                      onChange={value => setMode(value as 'light' | 'dark' | 'system')}
                    />
                    <LanguageAndSocialNetworkContainer>
                      <Language changeLanguage={changeLanguage} />
                      <SocialNetworkIconContainer
                        $isDesktopOrLaptop={isDesktopOrLaptop}
                        onClick={() => navigate(`/social_network`)}>
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
                    $isMobileDevice={responsiveProps.$isMobileDevice}
                    $isSmallMobileDevice={responsiveProps.$isSmallMobileDevice}>
                    {t('words.locationNotFound.funnyMessage')} {cityName}
                  </LocationNotFoundCode>
                  <BreakLine />
                  <LocationNotFoundCode
                    $isMobileDevice={responsiveProps.$isMobileDevice}
                    $isSmallMobileDevice={responsiveProps.$isSmallMobileDevice}>
                    {t('words.locationNotFound.realMessage')}
                  </LocationNotFoundCode>
                </LocationNotFoundContainer>
              </FadeInContainer>
            )}
          </BoxContainer>
        </div>
      </>
    );
  };

  const renderErrorMessage = () => (
    <div style={{ textAlign: 'center' }}>
      <DangerLogo src={DangerIcon} alt="" />
      <BreakLine />
      <Code $isMobileDevice={isMobileDevice} $isSmallMobileDevice={isSmallMobileDevice}>
        {t('words.conectionError')}
      </Code>
    </div>
  );

  return (
    <>
      <GlobalStyles theme={theme} />
      <div
        style={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {isLoading ? (
          <WeatherSkeleton $isDesktop={isDesktopOrLaptop} />
        ) : siteWorking ? (
          renderWeatherData()
        ) : (
          renderErrorMessage()
        )}
      </div>
    </>
  );
};

export default memo(Weather);
(Weather as any).displayName = 'Weather';

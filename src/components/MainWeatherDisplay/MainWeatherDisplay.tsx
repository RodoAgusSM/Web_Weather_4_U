import React, { memo, useState } from 'react';
import { Units } from 'enums/index';
import useResponsiveDesign from 'hooks/useResponsiveDesign';
import NotFoundIcon from 'images/not_found_icon.png';
import { useTranslation } from 'react-i18next';

import { useTheme } from '../../context/ThemeContext';
import { darkTheme, lightTheme } from '../../styles/theme';

import {
  ColumnsContainer,
  DataRowsContainer,
  DescriptionContainer,
  FeelLikeContainer,
  IconRowsContainer,
  LocationContainer,
  MainWeatherDisplayContainer,
  RealFeelColumnContainer,
  RealFeelContainer,
  UnitContainer,
  WeatherIcon,
} from './MainWeatherDisplayStyles';

interface MainWeatherDisplayProps {
  icon: string;
  iconWorking: boolean;
  location: string;
  realFeel: string | number;
  feelsLike: string | number;
  description: string;
  unit: Units;
}

const MainWeatherDisplay: React.FC<MainWeatherDisplayProps> = ({
  icon,
  iconWorking,
  location,
  realFeel,
  feelsLike,
  description,
  unit,
}) => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const { isMobileDevice, isSmallMobileDevice } = useResponsiveDesign();
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;

  const degreeUnit =
    Units.Imperial === unit
      ? t('words.temperature.unit.imperial')
      : t('words.temperature.unit.metric');

  return (
    <MainWeatherDisplayContainer
      theme={theme}
      data-animate="true"
      $isHovered={isHovered}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ touchAction: 'manipulation' }}>
      <ColumnsContainer>
        <DataRowsContainer>
          <LocationContainer $isMobile={isMobileDevice} $isSmallMobile={isSmallMobileDevice}>
            {location}
          </LocationContainer>
          <RealFeelColumnContainer>
            <RealFeelContainer $isMobile={isMobileDevice} $isSmallMobile={isSmallMobileDevice}>
              {realFeel}
            </RealFeelContainer>
            <UnitContainer $isMobile={isMobileDevice} $isSmallMobile={isSmallMobileDevice}>
              {degreeUnit}
            </UnitContainer>
          </RealFeelColumnContainer>
          <FeelLikeContainer theme={theme} $isHovered={isHovered} $isMobile={isMobileDevice}>
            {t('words.temperature.feelsLike')} {feelsLike} {degreeUnit}
          </FeelLikeContainer>
          <DescriptionContainer $isMobile={isMobileDevice} $isSmallMobile={isSmallMobileDevice}>
            {description}
          </DescriptionContainer>
        </DataRowsContainer>
        <IconRowsContainer>
          {iconWorking && icon ? (
            <WeatherIcon
              theme={theme}
              src={icon}
              alt=""
              $isMobile={isMobileDevice}
              $isSmallMobile={isSmallMobileDevice}
            />
          ) : (
            <WeatherIcon
              theme={theme}
              src={NotFoundIcon}
              alt=""
              $isMobile={isMobileDevice}
              $isSmallMobile={isSmallMobileDevice}
            />
          )}
        </IconRowsContainer>
      </ColumnsContainer>
    </MainWeatherDisplayContainer>
  );
};

export default memo(MainWeatherDisplay);
(MainWeatherDisplay as any).displayName = 'MainWeatherDisplay';

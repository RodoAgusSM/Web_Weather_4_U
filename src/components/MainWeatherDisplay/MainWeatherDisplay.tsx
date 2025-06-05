import React, { useState } from 'react';
import { Units } from 'enums/index';
import NotFoundIcon from 'images/not_found_icon.png';
import { useTranslation } from 'react-i18next';

import {
  CustomWeatherMainContainer,
  DescriptionText,
  FeelsLikeText,
  MainContentWrapper,
  TemperatureUnit,
  TemperatureUnitWrapper,
  TemperatureValue,
  WeatherIcon,
  WeatherIconContainer,
  WeatherMain,
} from './MainWeatherDisplayStyles';

interface MainWeatherDisplayProps {
  icon: string;
  iconWorking: boolean;
  realFeel: string | number;
  feelsLike: string | number;
  description: string;
  unit: Units;
}

const MainWeatherDisplay: React.FC<MainWeatherDisplayProps> = ({
  icon,
  iconWorking,
  realFeel,
  feelsLike,
  description,
  unit,
}) => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <CustomWeatherMainContainer
      data-animate="true"
      $isHovered={isHovered}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ touchAction: 'manipulation' }}
    >
      <MainContentWrapper>
        <WeatherIconContainer>
          <WeatherIcon src={iconWorking ? icon : NotFoundIcon} alt="" />
        </WeatherIconContainer>

        <WeatherMain>
          <TemperatureUnitWrapper>
            <TemperatureValue>{realFeel}</TemperatureValue>
            <TemperatureUnit>
              {Units.Imperial === unit
                ? t('words.temperature.unit.imperial')
                : t('words.temperature.unit.metric')}
            </TemperatureUnit>
          </TemperatureUnitWrapper>

          <FeelsLikeText>
            {t('words.temperature.feelsLike')} {feelsLike}{' '}
            {Units.Imperial === unit
              ? t('words.temperature.unit.imperial')
              : t('words.temperature.unit.metric')}
          </FeelsLikeText>

          <DescriptionText>{description}</DescriptionText>
        </WeatherMain>
      </MainContentWrapper>
    </CustomWeatherMainContainer>
  );
};

export default MainWeatherDisplay;

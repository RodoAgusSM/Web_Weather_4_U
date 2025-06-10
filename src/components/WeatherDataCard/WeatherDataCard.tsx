import React, { useEffect, useState } from 'react';
import AirQualityIcon from 'images/airQuality.png';
import CloudIcon from 'images/clouds.png';
import DefaultIcon from 'images/default.png';
import HumidityIcon from 'images/humidity.png';
import PressureIcon from 'images/pressure.png';
import SunriseIcon from 'images/sunrise.png';
import SunsetIcon from 'images/sunset.png';
import VisibilityIcon from 'images/visibility.png';
import WindIcon from 'images/wind.png';

import useResponsiveDesign from '../../hooks/useResponsiveDesign';

import {
  CardContainer,
  CardIcon,
  ContentContainer,
  HeaderContainer,
  IconContainer,
  InfoButton,
  InfoButtonText,
  InfoColumnContainer,
  Label,
  ValueText,
} from './WeatherDataCardStyles';

interface WeatherDataCardProps {
  label: string;
  value: string | number;
  unit?: string;
  showInfoButton?: boolean;
  onInfoClick?: () => void;
}

const WeatherDataCard: React.FC<WeatherDataCardProps> = ({
  label,
  value,
  unit = '',
  showInfoButton = false,
  onInfoClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [icon, setIcon] = useState<string>(DefaultIcon);
  const [isAirQuality, setIsAirQuality] = useState(false);
  const responsiveInfo = useResponsiveDesign();

  useEffect(() => {
    const labelLower = label.toLowerCase();

    const airQualityCheck =
      labelLower.includes(`qualité de l'aire`) ||
      labelLower.includes('air quality') ||
      labelLower.includes('calidad del aire') ||
      labelLower.includes('qualidade do ar');

    setIsAirQuality(airQualityCheck);

    if (
      labelLower.includes('humidity') ||
      labelLower.includes('humedad') ||
      labelLower.includes('humidité') ||
      labelLower.includes('umidade')
    ) {
      setIcon(HumidityIcon);
    } else if (
      labelLower.includes('pressure') ||
      labelLower.includes('presión') ||
      labelLower.includes('pression') ||
      labelLower.includes('pressão')
    ) {
      setIcon(PressureIcon);
    } else if (
      labelLower.includes('sunrise') ||
      labelLower.includes('amanece') ||
      labelLower.includes('lever') ||
      labelLower.includes('nascer do sol')
    ) {
      setIcon(SunriseIcon);
    } else if (
      labelLower.includes('sunset') ||
      labelLower.includes('oscurece') ||
      labelLower.includes('coucher') ||
      labelLower.includes('pôr do sol')
    ) {
      setIcon(SunsetIcon);
    } else if (
      labelLower.includes('wind') ||
      labelLower.includes('viento') ||
      labelLower.includes('vent') ||
      labelLower.includes('vento')
    ) {
      setIcon(WindIcon);
    } else if (
      labelLower.includes('visibility') ||
      labelLower.includes('visibilidad') ||
      labelLower.includes('visibilité') ||
      labelLower.includes('visibilidade')
    ) {
      setIcon(VisibilityIcon);
    } else if (airQualityCheck) {
      setIcon(AirQualityIcon);
    } else if (
      labelLower.includes('clouds') ||
      labelLower.includes('nubes') ||
      labelLower.includes('nuages') ||
      labelLower.includes('nuvens')
    ) {
      setIcon(CloudIcon);
    } else {
      setIcon(DefaultIcon);
    }
  }, [label]);

  return (
    <CardContainer
      $isHovered={isHovered}
      $hasInfoButton={isAirQuality && showInfoButton}
      $isMobile={responsiveInfo.isMobileDevice}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <IconContainer $isMobile={responsiveInfo.isMobileDevice}>
        <CardIcon src={icon} alt={label} $isMobile={responsiveInfo.isMobileDevice} />
      </IconContainer>

      <ContentContainer $isMobile={responsiveInfo.isMobileDevice}>
        <HeaderContainer>
          <Label $isHovered={isHovered} $isMobile={responsiveInfo.isMobileDevice}>
            {label}:
          </Label>
        </HeaderContainer>

        <ValueText $isHovered={isHovered} $isMobile={responsiveInfo.isMobileDevice}>
          {value}
          {unit && ` ${unit}`}
        </ValueText>
      </ContentContainer>

      {isAirQuality && showInfoButton && (
        <InfoColumnContainer $isMobile={responsiveInfo.isMobileDevice}>
          <InfoButton $isMobile={responsiveInfo.isMobileDevice} onClick={onInfoClick}>
            <InfoButtonText>i</InfoButtonText>
          </InfoButton>
        </InfoColumnContainer>
      )}
    </CardContainer>
  );
};

export default React.memo(WeatherDataCard, (prevProps, nextProps) => {
  return (
    prevProps.label === nextProps.label &&
    prevProps.value === nextProps.value &&
    prevProps.unit === nextProps.unit &&
    prevProps.showInfoButton === nextProps.showInfoButton
  );
});

import { useState } from 'react';
import StarsAnimation from 'components/StarsAnimation/StarsAnimation';
import { AirQuality } from 'enums/index';
import useDimensions from 'hooks/useDimensions';
import back_icon from 'images/back_icon.png';
import back_icon_hover from 'images/back_icon_hover.png';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  BackContainer,
  BackIcon,
  CenteredContainer,
  GlobalStyle,
  WeatherCard,
} from 'styles/styles';

import {
  AirPollutionItemContainer,
  AirPollutionItemLegendIcon,
  AirPollutionItemSpan,
  AirPollutionLegendDesktopContainer,
  AirPollutionLegendDesktopSubContainer,
  AirPollutionLegendMobileContainer,
  AirPollutionLegendMobileSubContainer,
} from './AirPollutionInfoStyles';

const AirPollutionInfo = () => {
  const { t } = useTranslation();
  const { state } = useLocation();
  const { isDesktopOrLaptop, isMobileDevice, isSmallMobileDevice } = useDimensions();
  const { airPollution } = state as any;
  let navigate = useNavigate();
  const [mouseOver, setMouseOver] = useState<boolean>(false);

  const generateLabel = (label: string, value: number) => {
    switch (label) {
      case AirQuality.AQI:
        break;
      case AirQuality.CARBONMONIXIDE:
        return labelCarbonMonoxide(value);
      case AirQuality.NITROGENMONOXIDE:
        break;
      case AirQuality.NITROGENDIOXIDE:
        return labelNitrogenDioxide(value);
      case AirQuality.OZONE:
        return labelOzone(value);
      case AirQuality.SULPHURDIOXIDE:
        return labelSulphurDioxide(value);
      case AirQuality.FINEPARTICLESMATTER:
        return labelFineParticlesMatter(value);
      case AirQuality.COARSEPARTICULATEMATTER:
        return labelCoarseParticulateMatter(value);
      case AirQuality.AMMONIA:
        break;
    }
  };

  const labelCarbonMonoxide = (value: number) => {
    const label = `${t('words.airPollution.elements.nitrogenDioxide')} (CO)`;
    if (value >= 0 && value < 4400)
      return (
        <AirPollutionItemContainer
          isDesktopOrLaptop={isDesktopOrLaptop}
          isMobileDevice={isMobileDevice}
          isSmallMobileDevice={isSmallMobileDevice}
        >
          {label}
          <AirPollutionItemSpan color={'#79BC6A'} />
        </AirPollutionItemContainer>
      );
    else if (value >= 4400 && value < 9400)
      return (
        <AirPollutionItemContainer
          isDesktopOrLaptop={isDesktopOrLaptop}
          isMobileDevice={isMobileDevice}
          isSmallMobileDevice={isSmallMobileDevice}
        >
          {label}
          <AirPollutionItemSpan color={'#BBCf4C'} />
        </AirPollutionItemContainer>
      );
    else if (value >= 9400 && value < 12400)
      return (
        <AirPollutionItemContainer
          isDesktopOrLaptop={isDesktopOrLaptop}
          isMobileDevice={isMobileDevice}
          isSmallMobileDevice={isSmallMobileDevice}
        >
          {label}
          <AirPollutionItemSpan color={'#EEC209'} />
        </AirPollutionItemContainer>
      );
    else if (value >= 12400 && value < 15400)
      return (
        <AirPollutionItemContainer
          isDesktopOrLaptop={isDesktopOrLaptop}
          isMobileDevice={isMobileDevice}
          isSmallMobileDevice={isSmallMobileDevice}
        >
          {label}
          <AirPollutionItemSpan color={'#F39307'} />
        </AirPollutionItemContainer>
      );
    if (value >= 15400)
      return (
        <AirPollutionItemContainer
          isDesktopOrLaptop={isDesktopOrLaptop}
          isMobileDevice={isMobileDevice}
          isSmallMobileDevice={isSmallMobileDevice}
        >
          {label}
          <AirPollutionItemSpan color={'#E8406F'} />
        </AirPollutionItemContainer>
      );
  };

  const labelNitrogenDioxide = (value: number) => {
    const label = `${t('words.airPollution.elements.nitrogenDioxide')} (NO₂)`;
    if (value >= 0 && value < 40)
      return (
        <AirPollutionItemContainer
          isDesktopOrLaptop={isDesktopOrLaptop}
          isMobileDevice={isMobileDevice}
          isSmallMobileDevice={isSmallMobileDevice}
        >
          {label}
          <AirPollutionItemSpan color={'#79BC6A'} />
        </AirPollutionItemContainer>
      );
    else if (value >= 40 && value < 70)
      return (
        <AirPollutionItemContainer
          isDesktopOrLaptop={isDesktopOrLaptop}
          isMobileDevice={isMobileDevice}
          isSmallMobileDevice={isSmallMobileDevice}
        >
          {label}
          <AirPollutionItemSpan color={'#BBCf4C'} />
        </AirPollutionItemContainer>
      );
    else if (value >= 70 && value < 150)
      return (
        <AirPollutionItemContainer
          isDesktopOrLaptop={isDesktopOrLaptop}
          isMobileDevice={isMobileDevice}
          isSmallMobileDevice={isSmallMobileDevice}
        >
          {label}
          <AirPollutionItemSpan color={'#EEC209'} />
        </AirPollutionItemContainer>
      );
    else if (value >= 150 && value < 200)
      return (
        <AirPollutionItemContainer
          isDesktopOrLaptop={isDesktopOrLaptop}
          isMobileDevice={isMobileDevice}
          isSmallMobileDevice={isSmallMobileDevice}
        >
          {label}
          <AirPollutionItemSpan color={'#F39307'} />
        </AirPollutionItemContainer>
      );
    if (value >= 200)
      return (
        <AirPollutionItemContainer
          isDesktopOrLaptop={isDesktopOrLaptop}
          isMobileDevice={isMobileDevice}
          isSmallMobileDevice={isSmallMobileDevice}
        >
          {label}
          <AirPollutionItemSpan color={'#E8406F'} />
        </AirPollutionItemContainer>
      );
  };

  const labelOzone = (value: number) => {
    const label = `${t('words.airPollution.elements.ozone')} (O₃)`;
    if (value >= 0 && value < 60)
      return (
        <AirPollutionItemContainer
          isDesktopOrLaptop={isDesktopOrLaptop}
          isMobileDevice={isMobileDevice}
          isSmallMobileDevice={isSmallMobileDevice}
        >
          {label}
          <AirPollutionItemSpan color={'#79BC6A'} />
        </AirPollutionItemContainer>
      );
    else if (value >= 60 && value < 100)
      return (
        <AirPollutionItemContainer
          isDesktopOrLaptop={isDesktopOrLaptop}
          isMobileDevice={isMobileDevice}
          isSmallMobileDevice={isSmallMobileDevice}
        >
          {label}
          <AirPollutionItemSpan color={'#BBCf4C'} />
        </AirPollutionItemContainer>
      );
    else if (value >= 100 && value < 140)
      return (
        <AirPollutionItemContainer
          isDesktopOrLaptop={isDesktopOrLaptop}
          isMobileDevice={isMobileDevice}
          isSmallMobileDevice={isSmallMobileDevice}
        >
          {label}
          <AirPollutionItemSpan color={'#EEC209'} />
        </AirPollutionItemContainer>
      );
    else if (value >= 140 && value < 180)
      return (
        <AirPollutionItemContainer
          isDesktopOrLaptop={isDesktopOrLaptop}
          isMobileDevice={isMobileDevice}
          isSmallMobileDevice={isSmallMobileDevice}
        >
          {label}
          <AirPollutionItemSpan color={'#F39307'} />
        </AirPollutionItemContainer>
      );
    if (value >= 180)
      return (
        <AirPollutionItemContainer
          isDesktopOrLaptop={isDesktopOrLaptop}
          isMobileDevice={isMobileDevice}
          isSmallMobileDevice={isSmallMobileDevice}
        >
          {label}
          <AirPollutionItemSpan color={'#E8406F'} />
        </AirPollutionItemContainer>
      );
  };

  const labelSulphurDioxide = (value: number) => {
    const label = `${t('words.airPollution.elements.sulphurDioxide')} (SO₂)`;
    if (value >= 0 && value < 20)
      return (
        <AirPollutionItemContainer
          isDesktopOrLaptop={isDesktopOrLaptop}
          isMobileDevice={isMobileDevice}
          isSmallMobileDevice={isSmallMobileDevice}
        >
          {label}
          <AirPollutionItemSpan color={'#79BC6A'} />
        </AirPollutionItemContainer>
      );
    else if (value >= 20 && value < 80)
      return (
        <AirPollutionItemContainer
          isDesktopOrLaptop={isDesktopOrLaptop}
          isMobileDevice={isMobileDevice}
          isSmallMobileDevice={isSmallMobileDevice}
        >
          {label}
          <AirPollutionItemSpan color={'#BBCf4C'} />
        </AirPollutionItemContainer>
      );
    else if (value >= 80 && value < 250)
      return (
        <AirPollutionItemContainer
          isDesktopOrLaptop={isDesktopOrLaptop}
          isMobileDevice={isMobileDevice}
          isSmallMobileDevice={isSmallMobileDevice}
        >
          {label}
          <AirPollutionItemSpan color={'#EEC209'} />
        </AirPollutionItemContainer>
      );
    else if (value >= 250 && value < 350)
      return (
        <AirPollutionItemContainer
          isDesktopOrLaptop={isDesktopOrLaptop}
          isMobileDevice={isMobileDevice}
          isSmallMobileDevice={isSmallMobileDevice}
        >
          {label}
          <AirPollutionItemSpan color={'#F39307'} />
        </AirPollutionItemContainer>
      );
    if (value >= 350)
      return (
        <AirPollutionItemContainer
          isDesktopOrLaptop={isDesktopOrLaptop}
          isMobileDevice={isMobileDevice}
          isSmallMobileDevice={isSmallMobileDevice}
        >
          {label}
          <AirPollutionItemSpan color={'#E8406F'} />
        </AirPollutionItemContainer>
      );
  };

  const labelFineParticlesMatter = (value: number) => {
    const label = `${t('words.airPollution.elements.fineParticlesMatter')} (PM2.5)`;
    if (value >= 0 && value < 10)
      return (
        <AirPollutionItemContainer
          isDesktopOrLaptop={isDesktopOrLaptop}
          isMobileDevice={isMobileDevice}
          isSmallMobileDevice={isSmallMobileDevice}
        >
          {label}
          <AirPollutionItemSpan color={'#79BC6A'} />
        </AirPollutionItemContainer>
      );
    else if (value >= 10 && value < 25)
      return (
        <AirPollutionItemContainer
          isDesktopOrLaptop={isDesktopOrLaptop}
          isMobileDevice={isMobileDevice}
          isSmallMobileDevice={isSmallMobileDevice}
        >
          {label}
          <AirPollutionItemSpan color={'#BBCf4C'} />
        </AirPollutionItemContainer>
      );
    else if (value >= 25 && value < 50)
      return (
        <AirPollutionItemContainer
          isDesktopOrLaptop={isDesktopOrLaptop}
          isMobileDevice={isMobileDevice}
          isSmallMobileDevice={isSmallMobileDevice}
        >
          {label}
          <AirPollutionItemSpan color={'#EEC209'} />
        </AirPollutionItemContainer>
      );
    else if (value >= 50 && value < 75)
      return (
        <AirPollutionItemContainer
          isDesktopOrLaptop={isDesktopOrLaptop}
          isMobileDevice={isMobileDevice}
          isSmallMobileDevice={isSmallMobileDevice}
        >
          {label}
          <AirPollutionItemSpan color={'#F39307'} />
        </AirPollutionItemContainer>
      );
    if (value >= 75)
      return (
        <AirPollutionItemContainer
          isDesktopOrLaptop={isDesktopOrLaptop}
          isMobileDevice={isMobileDevice}
          isSmallMobileDevice={isSmallMobileDevice}
        >
          {label}
          <AirPollutionItemSpan color={'#E8406F'} />
        </AirPollutionItemContainer>
      );
  };

  const labelCoarseParticulateMatter = (value: number) => {
    const label = `${t('words.airPollution.elements.coarseParticulateMatter')} (PM₁₀)`;
    if (value >= 0 && value < 20)
      return (
        <AirPollutionItemContainer
          isDesktopOrLaptop={isDesktopOrLaptop}
          isMobileDevice={isMobileDevice}
          isSmallMobileDevice={isSmallMobileDevice}
        >
          {label}
          <AirPollutionItemSpan color={'#79BC6A'} />
        </AirPollutionItemContainer>
      );
    else if (value >= 20 && value < 50)
      return (
        <AirPollutionItemContainer
          isDesktopOrLaptop={isDesktopOrLaptop}
          isMobileDevice={isMobileDevice}
          isSmallMobileDevice={isSmallMobileDevice}
        >
          {label}
          <AirPollutionItemSpan color={'#BBCf4C'} />
        </AirPollutionItemContainer>
      );
    else if (value >= 50 && value < 100)
      return (
        <AirPollutionItemContainer
          isDesktopOrLaptop={isDesktopOrLaptop}
          isMobileDevice={isMobileDevice}
          isSmallMobileDevice={isSmallMobileDevice}
        >
          {label}
          <AirPollutionItemSpan color={'#EEC209'} />
        </AirPollutionItemContainer>
      );
    else if (value >= 100 && value < 200)
      return (
        <AirPollutionItemContainer
          isDesktopOrLaptop={isDesktopOrLaptop}
          isMobileDevice={isMobileDevice}
          isSmallMobileDevice={isSmallMobileDevice}
        >
          {label}
          <AirPollutionItemSpan color={'#F39307'} />
        </AirPollutionItemContainer>
      );
    if (value >= 200)
      return (
        <AirPollutionItemContainer
          isDesktopOrLaptop={isDesktopOrLaptop}
          isMobileDevice={isMobileDevice}
          isSmallMobileDevice={isSmallMobileDevice}
        >
          {label}
          <AirPollutionItemSpan color={'#E8406F'} />
        </AirPollutionItemContainer>
      );
  };

  return (
    <>
      <GlobalStyle isSmallMobileDevice={isSmallMobileDevice} />
      <WeatherCard
        isDesktopOrLaptop={isDesktopOrLaptop}
        isMobileDevice={isMobileDevice}
        isSmallMobileDevice={isSmallMobileDevice}
      >
        <StarsAnimation />
        <BackContainer
          onMouseEnter={() => setMouseOver(true)}
          onMouseLeave={() => setMouseOver(false)}
          onClick={() => {
            navigate(`/`);
          }}
        >
          <BackIcon mouseOver={mouseOver} regular={back_icon} hover={back_icon_hover} />
          {t('words.back')}
        </BackContainer>

        {isDesktopOrLaptop && (
          <AirPollutionLegendDesktopContainer>
            <AirPollutionLegendDesktopSubContainer>
              <AirPollutionItemLegendIcon color={'#79BC6A'} />
              {Object.values(t('words.airPollution.status', { returnObjects: true }))[0]}
              <AirPollutionItemLegendIcon color={'#BBCf4C'} />
              {Object.values(t('words.airPollution.status', { returnObjects: true }))[1]}
              <AirPollutionItemLegendIcon color={'#EEC209'} />
              {Object.values(t('words.airPollution.status', { returnObjects: true }))[2]}
              <AirPollutionItemLegendIcon color={'#F39307'} />
              {Object.values(t('words.airPollution.status', { returnObjects: true }))[3]}
              <AirPollutionItemLegendIcon color={'#E8406F'} />
              {Object.values(t('words.airPollution.status', { returnObjects: true }))[4]}
            </AirPollutionLegendDesktopSubContainer>
          </AirPollutionLegendDesktopContainer>
        )}
        {(isMobileDevice || isSmallMobileDevice) && (
          <AirPollutionLegendMobileContainer>
            <AirPollutionLegendMobileSubContainer>
              <AirPollutionItemLegendIcon color={'#79BC6A'} />
              {Object.values(t('words.airPollution.status', { returnObjects: true }))[0]}
            </AirPollutionLegendMobileSubContainer>
            <AirPollutionLegendMobileSubContainer>
              <AirPollutionItemLegendIcon color={'#BBCf4C'} />
              {Object.values(t('words.airPollution.status', { returnObjects: true }))[1]}
            </AirPollutionLegendMobileSubContainer>
            <AirPollutionLegendMobileSubContainer>
              <AirPollutionItemLegendIcon color={'#EEC209'} />
              {Object.values(t('words.airPollution.status', { returnObjects: true }))[2]}
            </AirPollutionLegendMobileSubContainer>
            <AirPollutionLegendMobileSubContainer>
              <AirPollutionItemLegendIcon color={'#F39307'} />
              {Object.values(t('words.airPollution.status', { returnObjects: true }))[3]}
            </AirPollutionLegendMobileSubContainer>
            <AirPollutionLegendMobileSubContainer>
              <AirPollutionItemLegendIcon color={'#E8406F'} />
              {Object.values(t('words.airPollution.status', { returnObjects: true }))[4]}
            </AirPollutionLegendMobileSubContainer>
          </AirPollutionLegendMobileContainer>
        )}
        <CenteredContainer>
          {Object.entries(airPollution).map((entry: any[], index: number) => (
            <div key={index}>{generateLabel(entry[0], entry[1]) || null}</div>
          ))}
        </CenteredContainer>
      </WeatherCard>
    </>
  );
};

export default AirPollutionInfo;

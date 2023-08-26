import { useState } from 'react';
import { AirQuality } from 'enums/index';
import useDimensions from 'hooks/useDimensions';
import back_icon from 'images/back_icon.png';
import back_icon_hover from 'images/back_icon_hover.png';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  AirPollutionItemContainer,
  AirPollutionItemLegendIcon,
  AirPollutionItemSpan,
  AirPollutionLegendDesktopContainer,
  AirPollutionLegendDesktopSubContainer,
  AirPollutionLegendMobileContainer,
  AirPollutionLegendMobileSubContainer,
  BackContainer,
  BackIcon,
  CenteredContainer,
  GlobalStyle,
  WeatherCard,
} from 'styles/styles';

const AirPollutionInfo = () => {
  const { t } = useTranslation();
  const { state } = useLocation();
  const { isDesktopOrLaptop, isMobileDevice, isSmallMobileDevice } = useDimensions();
  const { airPollution } = state as any;
  let navigate = useNavigate();
  const [mouseOver, setMouseOver] = useState(false);

  const generateLabel = (label: string, value: number) => {
    switch (label) {
      case AirQuality.AQI:
        console.log();
        break;
      case AirQuality.CARBONMONIXIDE:
        break;
      case AirQuality.NITROGENMONOXIDE:
        break;
      case AirQuality.NITROGENDIOXIDE:
        return labelNitrogenDioxide(value);
      case AirQuality.OZONE:
        return labelOzone(value);
      case AirQuality.SULPHURDIOXIDE:
        break;
      case AirQuality.FINEPARTICLESMATTER:
        return labelFineParticlesMatter(value);
      case AirQuality.COARSEPARTICULATEMATTER:
        return labelCoarseParticulateMatter(value);
      case AirQuality.AMMONIA:
        break;
    }
  };

  const labelNitrogenDioxide = (value: number) => {
    const label = `${t('words.airPollution.elements.nitrogenDioxide')} (NO2)`;
    if (value >= 0 && value < 50)
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
    else if (value >= 50 && value < 100)
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
    else if (value >= 100 && value < 200)
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
    else if (value >= 200 && value < 400)
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
    if (value > 400)
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

  const labelOzone = (value: any) => {
    const label = `${t('words.airPollution.elements.ozone')} (O3)`;
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
    else if (value >= 60 && value < 120)
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
    else if (value >= 120 && value < 180)
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
    else if (value >= 180 && value < 240)
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
    if (value > 240)
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
    if (value >= 0 && value < 15)
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
    else if (value >= 15 && value < 30)
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
    else if (value >= 30 && value < 55)
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
    else if (value >= 55 && value < 110)
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
    if (value > 110)
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
    const label = `${t('words.airPollution.elements.coarseParticulateMatter')} (PM10)`;
    if (value >= 0 && value < 25)
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
    else if (value >= 25 && value < 50)
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
    else if (value >= 50 && value < 90)
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
    else if (value >= 90 && value < 180)
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
    if (value > 240)
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
      <GlobalStyle />
      <WeatherCard
        isDesktopOrLaptop={isDesktopOrLaptop}
        isMobileDevice={isMobileDevice}
        isSmallMobileDevice={isSmallMobileDevice}
      >
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

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
  AirPollutionLegendText,
  BackContainer,
  BackIcon,
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

  const generateLabel = (label: string, value: any) => {
    switch (label) {
      case AirQuality.AQI:
        console.log();
        break;
      case AirQuality.carbonMonoxide:
        break;
      case AirQuality.nitrogenMonoxide:
        break;
      case AirQuality.nitrogenDioxide:
        return labelNitrogenDioxide(value);
      case AirQuality.ozone:
        return labelOzone(value);
      case AirQuality.sulphurDioxide:
        break;
      case AirQuality.fineParticlesMatter:
        return labelFineParticlesMatter(value);
      case AirQuality.coarseParticulateMatter:
        return labelCoarseParticulateMatter(value);
      case AirQuality.ammonia:
        break;
    }
  };

  const labelNitrogenDioxide = (value: any) => {
    const label = `${t('words.airPollution.elements.nitrogenDioxide')} (NO2)`;
    if (value >= 0 && value < 50)
      return (
        <AirPollutionItemContainer>
          {label}
          <AirPollutionItemSpan color={'#79BC6A'} />
        </AirPollutionItemContainer>
      );
    else if (value >= 50 && value < 100)
      return (
        <AirPollutionItemContainer>
          {label}
          <AirPollutionItemSpan color={'#BBCf4C'} />
        </AirPollutionItemContainer>
      );
    else if (value >= 100 && value < 200)
      return (
        <AirPollutionItemContainer>
          {label}
          <AirPollutionItemSpan color={'#EEC209'} />
        </AirPollutionItemContainer>
      );
    else if (value >= 200 && value < 400)
      return (
        <AirPollutionItemContainer>
          {label}
          <AirPollutionItemSpan color={'#F39307'} />
        </AirPollutionItemContainer>
      );
    if (value > 400)
      return (
        <AirPollutionItemContainer>
          {label}
          <AirPollutionItemSpan color={'#E8406F'} />
        </AirPollutionItemContainer>
      );
  };

  const labelOzone = (value: any) => {
    const label = `${t('words.airPollution.elements.ozone')} (O3)`;
    if (value >= 0 && value < 60)
      return (
        <AirPollutionItemContainer>
          {label}
          <AirPollutionItemSpan color={'#79BC6A'} />
        </AirPollutionItemContainer>
      );
    else if (value >= 60 && value < 120)
      return (
        <AirPollutionItemContainer>
          {label}
          <AirPollutionItemSpan color={'#BBCf4C'} />
        </AirPollutionItemContainer>
      );
    else if (value >= 120 && value < 180)
      return (
        <AirPollutionItemContainer>
          {label}
          <AirPollutionItemSpan color={'#EEC209'} />
        </AirPollutionItemContainer>
      );
    else if (value >= 180 && value < 240)
      return (
        <AirPollutionItemContainer>
          {label}
          <AirPollutionItemSpan color={'#F39307'} />
        </AirPollutionItemContainer>
      );
    if (value > 240)
      return (
        <AirPollutionItemContainer>
          {label}
          <AirPollutionItemSpan color={'#E8406F'} />
        </AirPollutionItemContainer>
      );
  };

  const labelFineParticlesMatter = (value: any) => {
    const label = `${t('words.airPollution.elements.fineParticlesMatter')} (PM2.5)`;
    if (value >= 0 && value < 15)
      return (
        <AirPollutionItemContainer>
          {label}
          <AirPollutionItemSpan color={'#79BC6A'} />
        </AirPollutionItemContainer>
      );
    else if (value >= 15 && value < 30)
      return (
        <AirPollutionItemContainer>
          {label}
          <AirPollutionItemSpan color={'#BBCf4C'} />
        </AirPollutionItemContainer>
      );
    else if (value >= 30 && value < 55)
      return (
        <AirPollutionItemContainer>
          {label}
          <AirPollutionItemSpan color={'#EEC209'} />
        </AirPollutionItemContainer>
      );
    else if (value >= 55 && value < 110)
      return (
        <AirPollutionItemContainer>
          {label}
          <AirPollutionItemSpan color={'#F39307'} />
        </AirPollutionItemContainer>
      );
    if (value > 110)
      return (
        <AirPollutionItemContainer>
          {label}
          <AirPollutionItemSpan color={'#E8406F'} />
        </AirPollutionItemContainer>
      );
  };

  const labelCoarseParticulateMatter = (value: any) => {
    const label = `${t('words.airPollution.elements.coarseParticulateMatter')} (PM10)`;
    if (value >= 0 && value < 25)
      return (
        <AirPollutionItemContainer>
          {label}
          <AirPollutionItemSpan color={'#79BC6A'} />
        </AirPollutionItemContainer>
      );
    else if (value >= 25 && value < 50)
      return (
        <AirPollutionItemContainer>
          {label}
          <AirPollutionItemSpan color={'#BBCf4C'} />
        </AirPollutionItemContainer>
      );
    else if (value >= 50 && value < 90)
      return (
        <AirPollutionItemContainer>
          {label}
          <AirPollutionItemSpan color={'#EEC209'} />
        </AirPollutionItemContainer>
      );
    else if (value >= 90 && value < 180)
      return (
        <AirPollutionItemContainer>
          {label}
          <AirPollutionItemSpan color={'#F39307'} />
        </AirPollutionItemContainer>
      );
    if (value > 240)
      return (
        <AirPollutionItemContainer>
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 40,
            marginBottom: 65,
          }}
        >
          <AirPollutionItemLegendIcon color={'#79BC6A'} />
          <AirPollutionLegendText>
            {Object.values(t('words.airPollution.status', { returnObjects: true }))[0]}
          </AirPollutionLegendText>
          <AirPollutionItemLegendIcon color={'#BBCf4C'} />
          <AirPollutionLegendText>
            {Object.values(t('words.airPollution.status', { returnObjects: true }))[1]}
          </AirPollutionLegendText>
          <AirPollutionItemLegendIcon color={'#EEC209'} />
          <AirPollutionLegendText>
            {Object.values(t('words.airPollution.status', { returnObjects: true }))[2]}
          </AirPollutionLegendText>
          <AirPollutionItemLegendIcon color={'#F39307'} />
          <AirPollutionLegendText>
            {Object.values(t('words.airPollution.status', { returnObjects: true }))[3]}
          </AirPollutionLegendText>
          <AirPollutionItemLegendIcon color={'#E8406F'} />
          <AirPollutionLegendText>
            {Object.values(t('words.airPollution.status', { returnObjects: true }))[4]}
          </AirPollutionLegendText>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {Object.entries(airPollution).map((entry: any, index: number) => (
            <div key={index}>{generateLabel(entry[0], entry[1]) || null}</div>
          ))}
        </div>
      </WeatherCard>
    </>
  );
};

export default AirPollutionInfo;

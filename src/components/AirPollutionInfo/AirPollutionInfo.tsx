import { Fragment, memo, useCallback, useMemo, useState } from 'react';
import StarsAnimation from 'components/Space/Space';
import { AirQualityMetric } from 'enums/index';
import useDimensions from 'hooks/useDimensions';
import BackIcon from 'images/back_icon.png';
import BackIconHover from 'images/back_icon_hover.png';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  BackContainer,
  BackIconSpotImg,
  CenteredContainer,
  GlobalStyle,
  WeatherCard,
} from 'styles/styles';

import {
  AirPollutionItemContainer,
  AirPollutionItemSpan,
  AirPollutionLegendDesktopContainer,
  AirPollutionLegendDesktopSubContainer,
  AirPollutionLegendMobileContainer,
  AirPollutionLegendMobileSubContainer,
} from './AirPollutionInfoStyles';

type SpecialObject = {
  [index: number]: string;
};

const AirPollutionColors = ['#79BC6A', '#BBCf4C', '#EEC209', '#F39307', '#E8406F'];

const getColorForValue = (value: number, valueRanges: number[]): string => {
  const index = valueRanges.findIndex((range) => value < range);
  return index === -1
    ? AirPollutionColors[AirPollutionColors.length - 1]
    : AirPollutionColors[index];
};

const AirPollutionInfo = () => {
  const { t } = useTranslation();
  const { state } = useLocation();
  const { isDesktopOrLaptop, isMobileDevice, isSmallMobileDevice } = useDimensions();
  const { airPollution } = state as any;
  let navigate = useNavigate();
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  const airPollutionEntries = useMemo(() => Object.entries(airPollution), [airPollution]);
  const AirPollutionLabels: SpecialObject = useMemo(
    () => t('words.airPollution.status', { returnObjects: true }),
    [t]
  );

  const AIR_QUALITY_LABELS = useMemo(
    () => ({
      [AirQualityMetric.AQI]: {},
      [AirQualityMetric.CarbonMonoxide]: {
        name: t('words.airPollution.elements.carbonMonoxide.label'),
        symbol: t('words.airPollution.elements.carbonMonoxide.symbol'),
        ranges: [4400, 9400, 12400, 15400],
      },
      [AirQualityMetric.NitrogenMonoxide]: {},
      [AirQualityMetric.NitrogenDioxide]: {
        name: t('words.airPollution.elements.nitrogenDioxide.label'),
        symbol: t('words.airPollution.elements.nitrogenDioxide.symbol'),
        ranges: [40, 70, 150, 200],
      },
      [AirQualityMetric.Ozone]: {
        name: t('words.airPollution.elements.ozone.label'),
        symbol: t('words.airPollution.elements.ozone.symbol'),
        ranges: [60, 100, 140, 180],
      },
      [AirQualityMetric.SulphurDioxide]: {
        name: t('words.airPollution.elements.sulphurDioxide.label'),
        symbol: t('words.airPollution.elements.sulphurDioxide.symbol'),
        ranges: [20, 80, 250, 350],
      },
      [AirQualityMetric.FineParticlesMatter]: {
        name: t('words.airPollution.elements.fineParticlesMatter.label'),
        symbol: t('words.airPollution.elements.fineParticlesMatter.symbol'),
        ranges: [10, 25, 50, 75],
      },
      [AirQualityMetric.CoarseParticulateMatter]: {
        name: t('words.airPollution.elements.coarseParticulateMatter.label'),
        symbol: t('words.airPollution.elements.coarseParticulateMatter.symbol'),
        ranges: [20, 50, 100, 200],
      },
      [AirQualityMetric.Ammonia]: {},
    }),
    [t]
  );

  const generateLabel = (label: AirQualityMetric, value: number) => {
    const airQuality = AIR_QUALITY_LABELS[label] as any;
    if (!airQuality || Object.keys(airQuality).length === 0) return;
    const color = getColorForValue(value, airQuality.ranges);
    return generateLabelContent(
      `${airQuality.name} ${airQuality.symbol}`,
      color,
      isDesktopOrLaptop,
      isMobileDevice,
      isSmallMobileDevice
    );
  };

  const generateLabelContent = (
    label: string,
    color: string,
    isDesktopOrLaptop: boolean,
    isMobileDevice: boolean,
    isSmallMobileDevice: boolean
  ) => (
    <AirPollutionItemContainer
      $isDesktopOrLaptop={isDesktopOrLaptop}
      $isMobileDevice={isMobileDevice}
      $isSmallMobileDevice={isSmallMobileDevice}
    >
      {label}
      <AirPollutionItemSpan color={color} />
    </AirPollutionItemContainer>
  );

  const renderAirPollutionItems = useCallback(
    (isDesktopOrLaptop: boolean) =>
      AirPollutionColors.map((color: string, index: number) =>
        isDesktopOrLaptop ? (
          <Fragment key={index}>
            <AirPollutionItemSpan color={color} key={index} />
            {AirPollutionLabels[index]}
          </Fragment>
        ) : (
          <AirPollutionLegendMobileSubContainer key={index}>
            <AirPollutionItemSpan color={color} />
            {AirPollutionLabels[index]}
          </AirPollutionLegendMobileSubContainer>
        )
      ),
    [AirPollutionLabels]
  );

  return (
    <>
      <GlobalStyle $isSmallMobileDevice={isSmallMobileDevice} />
      <WeatherCard
        $isDesktopOrLaptop={isDesktopOrLaptop}
        $isMobileDevice={isMobileDevice}
        $isSmallMobileDevice={isSmallMobileDevice}
      >
        <StarsAnimation />
        <BackContainer
          onMouseEnter={() => setMouseOver(true)}
          onMouseLeave={() => setMouseOver(false)}
          onClick={() => navigate(`/`)}
        >
          <BackIconSpotImg $mouseOver={mouseOver} $regular={BackIcon} $hover={BackIconHover} />
          {t('words.back')}
        </BackContainer>

        {isDesktopOrLaptop && (
          <AirPollutionLegendDesktopContainer>
            <AirPollutionLegendDesktopSubContainer>
              {renderAirPollutionItems(true)}
            </AirPollutionLegendDesktopSubContainer>
          </AirPollutionLegendDesktopContainer>
        )}

        {(isMobileDevice || isSmallMobileDevice) && (
          <AirPollutionLegendMobileContainer>
            {renderAirPollutionItems(false)}
          </AirPollutionLegendMobileContainer>
        )}

        <CenteredContainer>
          {airPollutionEntries.map((entry, index) => (
            <div key={index}>{generateLabel(entry[0] as AirQualityMetric, entry[1] as number)}</div>
          ))}
        </CenteredContainer>
      </WeatherCard>
    </>
  );
};

export default memo(AirPollutionInfo);

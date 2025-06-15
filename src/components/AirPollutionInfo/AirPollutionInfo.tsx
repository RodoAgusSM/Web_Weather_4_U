import { memo, useMemo, useState } from 'react';
import StarsAnimation from 'components/Space/Space';
import { AirQualityMetric } from 'enums/index';
import useResponsiveDesign from 'hooks/useResponsiveDesign';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import GlobalStyles from 'styles/GlobalStyles';
import { BackContainer, BackIconSpotImg, BoxContainer, BoxWrapper } from 'styles/styles';
import { firstLowerToUppercase } from 'utils/helpers';

import { useTheme } from '../../context/ThemeContext';
import { darkTheme, lightTheme } from '../../styles/theme';

import {
  AirPollutionColors,
  AirQualityCard,
  AirQualityHeader,
  AirQualityName,
  AirQualityValue,
  CardsGridContainer,
  CurrentQualityLabel,
  ProgressBarContainer,
  ProgressBarFill,
  Title,
} from './AirPollutionInfoStyles';

type SpecialObject = {
  [index: number]: string;
};

const getColorForValue = (value: number, valueRanges: number[]): string => {
  const index = valueRanges.findIndex((range) => value < range);
  return index === -1
    ? AirPollutionColors[AirPollutionColors.length - 1]
    : AirPollutionColors[index];
};

const getPercentageForValue = (
  value: number,
  valueRanges: number[],
  qualityIndex: number
): number => {
  if (!valueRanges || valueRanges.length === 0) {
    return 0;
  }

  const segmentSize = 100 / 5;

  if (qualityIndex === 0) {
    const maxInSegment = valueRanges[0];
    return Math.min((value / maxInSegment) * segmentSize, segmentSize);
  } else if (qualityIndex < 4) {
    const minValue = valueRanges[qualityIndex - 1];
    const maxValue = valueRanges[qualityIndex];
    const basePercentage = segmentSize * qualityIndex;
    const relativePosition = (value - minValue) / (maxValue - minValue);
    return basePercentage + relativePosition * segmentSize;
  } else {
    const minValue = valueRanges[valueRanges.length - 1];
    const relativePosition = Math.min(((value - minValue) / minValue) * 0.5, 1);
    return segmentSize * 4 + relativePosition * segmentSize;
  }
};

const getQualityLevelIndex = (value: number, valueRanges: number[]): number => {
  const index = valueRanges.findIndex((range) => value < range);
  return index === -1 ? AirPollutionColors.length - 1 : index;
};

const AirPollutionInfo = () => {
  const { t } = useTranslation();
  const { state } = useLocation();
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;

  const {
    isDesktopOrLaptop,
    isMobileDevice,
    isSmallMobileDevice,
    screenHeight,
    screenWidth,
    isTouchDevice,
    isPortrait,
    isLandscape,
  } = useResponsiveDesign();
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
      [AirQualityMetric.Ozone]: {
        name: t('words.airPollution.elements.ozone.label'),
        symbol: t('words.airPollution.elements.ozone.symbol'),
        ranges: [60, 100, 140, 180],
      },
      [AirQualityMetric.NitrogenDioxide]: {
        name: t('words.airPollution.elements.nitrogenDioxide.label'),
        symbol: t('words.airPollution.elements.nitrogenDioxide.symbol'),
        ranges: [40, 70, 150, 200],
      },
      [AirQualityMetric.SulphurDioxide]: {
        name: t('words.airPollution.elements.sulphurDioxide.label'),
        symbol: t('words.airPollution.elements.sulphurDioxide.symbol'),
        ranges: [20, 80, 250, 350],
      },
      [AirQualityMetric.CarbonMonoxide]: {
        name: t('words.airPollution.elements.carbonMonoxide.label'),
        symbol: t('words.airPollution.elements.carbonMonoxide.symbol'),
        ranges: [4400, 9400, 12400, 15400],
      },
      [AirQualityMetric.NitrogenMonoxide]: {},
      [AirQualityMetric.Ammonia]: {},
    }),
    [t]
  );

  const responsiveProps = {
    $isDesktopOrLaptop: isDesktopOrLaptop,
    $isMobileDevice: isMobileDevice,
    $isSmallMobileDevice: isSmallMobileDevice,
    $isPortrait: isPortrait,
    $isLandscape: isLandscape,
  };

  const renderProgressCard = (label: AirQualityMetric, value: number, index: number) => {
    const airQuality = AIR_QUALITY_LABELS[firstLowerToUppercase(label) as AirQualityMetric] as any;
    if (!airQuality || Object.keys(airQuality).length === 0) return null;

    const qualityIndex = getQualityLevelIndex(value, airQuality.ranges);
    const color = getColorForValue(value, airQuality.ranges);

    const percentage = getPercentageForValue(value, airQuality.ranges, qualityIndex);

    const qualityLabel = Object.values(AirPollutionLabels)[qualityIndex];

    return (
      <AirQualityCard
        theme={theme}
        key={index}
        $isMobile={responsiveProps.$isMobileDevice}
        style={{ '--index': index } as React.CSSProperties}
      >
        <AirQualityHeader>
          <AirQualityName>{`${airQuality.name} ${airQuality.symbol}`}</AirQualityName>
          <AirQualityValue>{`${value} μg/m³`}</AirQualityValue>
        </AirQualityHeader>

        <ProgressBarContainer>
          <ProgressBarFill
            $percentage={percentage}
            $color={color}
            style={{ '--index': index } as React.CSSProperties}
          />
        </ProgressBarContainer>

        <CurrentQualityLabel $color={color}>{qualityLabel}</CurrentQualityLabel>
      </AirQualityCard>
    );
  };

  const isCompactLayout = screenHeight < 700 || (isMobileDevice && screenWidth < 380);

  const sortedMetricOrder = useMemo(
    () => [
      AirQualityMetric.FineParticlesMatter,
      AirQualityMetric.CoarseParticulateMatter,
      AirQualityMetric.Ozone,
      AirQualityMetric.NitrogenDioxide,
      AirQualityMetric.SulphurDioxide,
      AirQualityMetric.CarbonMonoxide,
      AirQualityMetric.NitrogenMonoxide,
      AirQualityMetric.Ammonia,
      AirQualityMetric.AQI,
    ],
    []
  );

  const sortedAirPollutionEntries = useMemo(() => {
    const orderMap = sortedMetricOrder.reduce((acc, metric, index) => {
      acc[metric] = index;
      return acc;
    }, {} as Record<string, number>);

    return [...airPollutionEntries].sort((a, b) => {
      const metricA = firstLowerToUppercase(a[0] as AirQualityMetric);
      const metricB = firstLowerToUppercase(b[0] as AirQualityMetric);

      const orderA = orderMap[metricA] ?? 999;
      const orderB = orderMap[metricB] ?? 999;

      return orderA - orderB;
    });
  }, [airPollutionEntries, sortedMetricOrder]);

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
          }}
        >
          <BoxContainer
            {...responsiveProps}
            theme={theme}
            aria-label="air-pollution-info"
            data-compact={isCompactLayout ? 'true' : 'false'}
            data-touch={isTouchDevice ? 'true' : 'false'}
          >
            <BoxWrapper {...responsiveProps}>
              <StarsAnimation />
              <div style={{ width: '100%' }}>
                <BackContainer
                  $isMobile={responsiveProps.$isMobileDevice}
                  onMouseEnter={() => setMouseOver(true)}
                  onMouseLeave={() => setMouseOver(false)}
                  onClick={() => navigate(`/`)}
                >
                  <BackIconSpotImg $mouseOver={mouseOver} />
                  {t('words.back')}
                </BackContainer>
              </div>

              <Title $isMobile={responsiveProps.$isMobileDevice}>
                {t('words.airPollution.title')}
              </Title>

              <CardsGridContainer
                $isMobileDevice={responsiveProps.$isMobileDevice}
                $isLandscape={responsiveProps.$isLandscape}
              >
                {sortedAirPollutionEntries
                  .filter((entry) => {
                    const metric = entry[0] as AirQualityMetric;
                    const airQuality = AIR_QUALITY_LABELS[
                      firstLowerToUppercase(metric) as AirQualityMetric
                    ] as any;
                    return airQuality && Object.keys(airQuality).length > 0;
                  })
                  .map((entry, index) =>
                    renderProgressCard(entry[0] as AirQualityMetric, entry[1] as number, index)
                  )}
              </CardsGridContainer>
            </BoxWrapper>
          </BoxContainer>
        </div>
      </>
    );
};

export default memo(AirPollutionInfo);

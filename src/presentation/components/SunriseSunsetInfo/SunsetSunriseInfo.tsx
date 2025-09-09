import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { StorageKey } from '../../../shared/enums/index';
import { Code, ColumnContainer, Line } from '../../../styles/styles';
import useDimensions from '../../hooks/useDimensions';

const SunriseSunsetInfo = ({
  lat,
  lon,
  sunrise,
  sunset,
}: {
  lat: number;
  lon: number;
  sunrise: number;
  sunset: number;
}) => {
  const { t } = useTranslation();
  const { isMobileDevice, isSmallMobileDevice } = useDimensions();
  const { find } = require('geo-tz');
  const [sunriseTime, setSunriseTime] = useState<string>();
  const [sunsetTime, setSunsetTime] = useState<string>();

  useEffect(() => {
    try {
      const timeZone = find(lat, lon)[0];
      if (localStorage.getItem(StorageKey.Language) === 'en') {
        setSunriseTime(
          new Date(sunrise * 1000).toLocaleString([], {
            timeStyle: 'short',
            timeZone: timeZone,
          }),
        );

        setSunsetTime(
          new Date(sunset * 1000).toLocaleString([], {
            timeStyle: 'short',
            timeZone: timeZone,
          }),
        );
      } else {
        setSunriseTime(
          new Date(sunrise * 1000).toLocaleString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: timeZone,
          }),
        );
        setSunsetTime(
          new Date(sunset * 1000).toLocaleString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: timeZone,
          }),
        );
      }
    } catch (error) {
      setSunriseTime(t('words.locationNotFound.noData'));
      setSunsetTime(t('words.locationNotFound.noData'));
    }
  }, [lat, lon, sunrise, sunset, t]);

  return (
    <ColumnContainer>
      <Code $isMobileDevice={isMobileDevice} $isSmallMobileDevice={isSmallMobileDevice}>
        {t('words.sunrise')} {sunriseTime}
      </Code>
      <Line />
      <Code $isMobileDevice={isMobileDevice} $isSmallMobileDevice={isSmallMobileDevice}>
        {t('words.sunset')} {sunsetTime}
      </Code>
      <Line />
    </ColumnContainer>
  );
};

export default memo(SunriseSunsetInfo);
(SunriseSunsetInfo as any).displayName = 'SunriseSunsetInfo';

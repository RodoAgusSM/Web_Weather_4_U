import { useEffect, useState } from 'react';
import { StorageKeys } from 'enums';
import useDimensions from 'hooks/useDimensions';
import { useTranslation } from 'react-i18next';
import { Code, ColumnContainer } from 'styles/styles';

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
      if (localStorage.getItem(StorageKeys.LANGUAGE) === 'en') {
        setSunriseTime(
          new Date(sunrise * 1000).toLocaleString([], {
            timeStyle: 'short',
            timeZone: timeZone,
          })
        );

        setSunsetTime(
          new Date(sunset * 1000).toLocaleString([], {
            timeStyle: 'short',
            timeZone: timeZone,
          })
        );
      } else {
        setSunriseTime(
          new Date(sunrise * 1000).toLocaleString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: timeZone,
          })
        );
        setSunsetTime(
          new Date(sunset * 1000).toLocaleString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: timeZone,
          })
        );
      }
    } catch (error) {
      setSunriseTime(t('words.locationNotFound.noData'));
      setSunsetTime(t('words.locationNotFound.noData'));
    }
  }, [lat, lon, sunrise, sunset, t]);

  return (
    <ColumnContainer>
      <Code isMobileDevice={isMobileDevice} isSmallMobileDevice={isSmallMobileDevice}>
        {t('words.sunrise')} {sunriseTime}
      </Code>
      <Code isMobileDevice={isMobileDevice} isSmallMobileDevice={isSmallMobileDevice}>
        {t('words.sunset')} {sunsetTime}
      </Code>
    </ColumnContainer>
  );
};

export default SunriseSunsetInfo;

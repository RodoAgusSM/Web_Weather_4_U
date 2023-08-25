import { useEffect, useState } from 'react';
import useDimensions from 'hooks/useDimensions';
import { useTranslation } from 'react-i18next';
import { BreakLine, Code } from 'styles/styles';

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
    } catch (error) {
      setSunriseTime(t('words.locationNotFound.noData'));
      setSunsetTime(t('words.locationNotFound.noData'));
    }
  }, [lat, lon, sunrise, sunset, t]);

  return (
    <div>
      <Code isMobileDevice={isMobileDevice} isSmallMobileDevice={isSmallMobileDevice}>
        {t('words.sunrise')} {sunriseTime}
      </Code>
      <BreakLine />
      <Code isMobileDevice={isMobileDevice} isSmallMobileDevice={isSmallMobileDevice}>
        {t('words.sunset')} {sunsetTime}
      </Code>
    </div>
  );
};

export default SunriseSunsetInfo;

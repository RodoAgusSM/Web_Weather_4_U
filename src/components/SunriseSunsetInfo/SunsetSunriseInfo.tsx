import { useTranslation } from 'react-i18next';
import { BreakLine, Code } from 'styles/styles';

const SunriseSunsetInfo = ({ lat, lon, sunrise, sunset }: any) => {
  const { t } = useTranslation();
  const { find } = require('geo-tz');
  try {
    const timeZone = find(lat, lon)[0];
    sunrise = new Date(sunrise * 1000).toLocaleString([], {
      timeStyle: 'short',
      timeZone: timeZone,
    });

    sunset = new Date(sunset * 1000).toLocaleString([], {
      timeStyle: 'short',
      timeZone: timeZone,
    });
  } catch (error) {
    sunrise = t('words.locationNotFound.noData');
    sunset = t('words.locationNotFound.noData');
  }

  return (
    <div>
      <Code>
        {t('words.sunrise')} {sunrise}
      </Code>
      <BreakLine />
      <Code>
        {t('words.sunset')} {sunset}
      </Code>
    </div>
  );
};

export default SunriseSunsetInfo;

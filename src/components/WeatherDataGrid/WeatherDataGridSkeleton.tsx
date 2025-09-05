import React, { memo } from 'react';
import WeatherCardSkeleton from 'components/WeatherDataCard/WeatherCardSkeleton';

import { GridContainer } from './WeatherDataGridStyles';

interface WeatherDataGridSkeletonProps {
  hasInfoButton?: boolean;
}

const WeatherDataGridSkeleton: React.FC<WeatherDataGridSkeletonProps> = ({
  hasInfoButton = false,
}) => {
  return (
    <GridContainer>
      <WeatherCardSkeleton hasInfoButton={hasInfoButton} />
      <WeatherCardSkeleton />
    </GridContainer>
  );
};

export default memo(WeatherDataGridSkeleton);

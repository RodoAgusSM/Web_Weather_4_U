import React from 'react';
import WeatherCardSkeleton from 'components/WeatherDataCard/WeatherCardSkeleton';

import { GridContainer } from './WeatherDataGridStyles';

interface WeatherDataGridSkeletonProps {
  hasInfoButton?: boolean;
}

const WeatherDataGridSkeleton: React.FC<WeatherDataGridSkeletonProps> = ({ 
  hasInfoButton = false 
}) => {
  return (
    <GridContainer $marginTop="0">
      <WeatherCardSkeleton hasInfoButton={hasInfoButton} />
      <WeatherCardSkeleton />
    </GridContainer>
  );
};

export default WeatherDataGridSkeleton;

import React, { memo } from 'react';

import { GridContainer } from './WeatherDataGridStyles';

interface WeatherDataGridProps {
  children: React.ReactNode;
  marginTop?: string;
}

const WeatherDataGrid: React.FC<WeatherDataGridProps> = ({ children }) => {
  return <GridContainer>{children}</GridContainer>;
};

export default memo(WeatherDataGrid);

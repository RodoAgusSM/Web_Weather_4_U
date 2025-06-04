import React from 'react';

import { GridContainer } from './WeatherDataGridStyles';

interface WeatherDataGridProps {
  children: React.ReactNode;
  marginTop?: string;
}

const WeatherDataGrid: React.FC<WeatherDataGridProps> = ({ children, marginTop = '0' }) => {
  return <GridContainer $marginTop={marginTop}>{children}</GridContainer>;
};

export default WeatherDataGrid;

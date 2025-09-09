import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { useTheme } from '../../../context/ThemeContext';
import { darkTheme, lightTheme } from '../../../styles/theme';
import AirPollutionInfo from '../AirPollutionInfo/AirPollutionInfo';
import SocialNetwork from '../SocialNetwork/SocialNetwork';
import Weather from '../Weather/Weather';

export const AppRouter: React.FC = () => {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <StyledThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Weather />} />
          <Route path="/social_network" element={<SocialNetwork />} />
          <Route path="/air_pollution_info" element={<AirPollutionInfo />} />
        </Routes>
      </Router>
    </StyledThemeProvider>
  );
};

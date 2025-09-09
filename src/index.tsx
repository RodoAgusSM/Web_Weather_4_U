import AirPollutionInfo from 'presentation/components/AirPollutionInfo/AirPollutionInfo';
import SocialNetwork from 'presentation/components/SocialNetwork/SocialNetwork';
import Weather from 'presentation/components/Weather/Weather';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ThemeProvider } from './context/ThemeContext';
import reportWebVitals from './reportWebVitals';

import './index.css';

import 'translations/i18n';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Weather />} />
        <Route index element={<Weather />} />
        <Route path="social_network" element={<SocialNetwork />} />
        <Route path="air_pollution_info" element={<AirPollutionInfo />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>,
);

reportWebVitals();

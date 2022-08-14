import React from 'react';
import { createRoot } from 'react-dom/client';
import './components/Weather/Weather.css';
import Weather from './components/Weather/Weather';
import SocialNetwork from './components/SocialNetwork/SocialNetwork';
import AirPollution from './components/AirPollution/AirPollution';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './translations/i18n';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Weather />} />
				<Route index element={<Weather />} />
				<Route path='social_network' element={<SocialNetwork />} />
				<Route path='air_pollution' element={<AirPollution />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);

reportWebVitals();

import { useEffect } from 'react';
import AirPollutionInfo from 'components/AirPollutionInfo/AirPollutionInfo';
import SocialNetwork from 'components/SocialNetwork/SocialNetwork';
import Weather from 'components/Weather/Weather';
import useResponsiveDesign from 'hooks/useResponsiveDesign';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import i18n from 'translations/i18n';

import GlobalStyles from './styles/GlobalStyles';

function App() {
  const {
    isMobileDevice,
    isTabletDevice,
    isDesktopDevice,
    isTouchDevice,
    isPortrait,
    isLandscape,
    screenWidth,
    screenHeight,
  } = useResponsiveDesign();
  
  // Set up viewport and device-specific adjustments
  useEffect(() => {
    // Configure viewport for better mobile experience
    const setViewport = () => {
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      const viewportContent = 'width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no';
      
      if (viewportMeta) {
        viewportMeta.setAttribute('content', viewportContent);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = viewportContent;
        document.head.appendChild(meta);
      }
    };
    
    // Apply device classes to body for CSS targeting
    const applyDeviceClasses = () => {
      document.body.classList.toggle('mobile-device', isMobileDevice);
      document.body.classList.toggle('tablet-device', isTabletDevice);
      document.body.classList.toggle('desktop-device', isDesktopDevice);
      document.body.classList.toggle('touch-device', isTouchDevice);
      document.body.classList.toggle('portrait', isPortrait);
      document.body.classList.toggle('landscape', isLandscape);
    };
    
    // Set custom CSS properties for viewport dimensions
    const setCustomProps = () => {
      document.documentElement.style.setProperty('--viewport-width', `${screenWidth}px`);
      document.documentElement.style.setProperty('--viewport-height', `${screenHeight}px`);
      
      // Fix iOS 100vh issue
      const vh = screenHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    // Initialize everything
    setViewport();
    applyDeviceClasses();
    setCustomProps();
    
    // Handle orientation changes specially for iOS
    const orientationChangeHandler = () => {
      // Small delay to ensure iOS has updated dimensions correctly
      setTimeout(() => {
        setCustomProps();
      }, 300);
    };
    
    window.addEventListener('orientationchange', orientationChangeHandler);
    window.addEventListener('resize', setCustomProps);
    
    return () => {
      window.removeEventListener('orientationchange', orientationChangeHandler);
      window.removeEventListener('resize', setCustomProps);
    };
  }, [isMobileDevice, isTabletDevice, isDesktopDevice, isTouchDevice, isPortrait, isLandscape, screenWidth, screenHeight]);

  // Mobile-specific viewport configurations
  useEffect(() => {
    if (isMobileDevice || isTouchDevice) {
      // Set viewport meta tag for optimal mobile display
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      if (viewportMeta) {
        viewportMeta.setAttribute(
          'content', 
          'width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=1.0'
        );
      }
      
      // Fix for iOS vh bug (100vh is larger than the visible viewport)
      const setVhVariable = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      };
      
      setVhVariable();
      window.addEventListener('resize', setVhVariable);
      window.addEventListener('orientationchange', () => {
        setTimeout(setVhVariable, 100);
      });
      
      return () => {
        window.removeEventListener('resize', setVhVariable);
        window.removeEventListener('orientationchange', setVhVariable);
      };
    }
  }, [isMobileDevice, isTouchDevice]);

  return (
    <I18nextProvider i18n={i18n}>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<Weather />} />
          <Route path="/social_network" element={<SocialNetwork />} />
          <Route path="/air_pollution_info" element={<AirPollutionInfo />} />
        </Routes>
      </Router>
    </I18nextProvider>
  );
}

export default App;

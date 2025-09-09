import { useEffect } from 'react';

import useResponsiveDesign from '../../hooks/useResponsiveDesign';

interface ViewportManagerProps {
  children: React.ReactNode;
}

// eslint-disable-next-line react/prop-types
export const ViewportManager: React.FC<ViewportManagerProps> = ({ children }) => {
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

  useEffect(() => {
    const setViewport = () => {
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      const viewportContent =
        'width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no';

      if (viewportMeta) {
        viewportMeta.setAttribute('content', viewportContent);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = viewportContent;
        document.head.appendChild(meta);
      }
    };

    const applyDeviceClasses = () => {
      document.body.classList.toggle('mobile-device', isMobileDevice);
      document.body.classList.toggle('tablet-device', isTabletDevice);
      document.body.classList.toggle('desktop-device', isDesktopDevice);
      document.body.classList.toggle('touch-device', isTouchDevice);
      document.body.classList.toggle('portrait', isPortrait);
      document.body.classList.toggle('landscape', isLandscape);
    };

    const setCustomProps = () => {
      document.documentElement.style.setProperty('--viewport-width', `${screenWidth}px`);
      document.documentElement.style.setProperty('--viewport-height', `${screenHeight}px`);
      const vh = screenHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setViewport();
    applyDeviceClasses();
    setCustomProps();

    const orientationChangeHandler = () => {
      setTimeout(() => setCustomProps(), 300);
    };

    window.addEventListener('orientationchange', orientationChangeHandler);
    window.addEventListener('resize', setCustomProps);

    return () => {
      window.removeEventListener('orientationchange', orientationChangeHandler);
      window.removeEventListener('resize', setCustomProps);
    };
  }, [
    isMobileDevice,
    isTabletDevice,
    isDesktopDevice,
    isTouchDevice,
    isPortrait,
    isLandscape,
    screenWidth,
    screenHeight,
  ]);

  useEffect(() => {
    if (isMobileDevice || isTouchDevice) {
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      if (viewportMeta) {
        viewportMeta.setAttribute(
          'content',
          'width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=1.0',
        );
      }

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

  return <>{children}</>;
};

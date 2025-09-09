import { useEffect } from 'react';

import { isIOSDevice } from '../../utils/themeUtils';

/**
 * Hook to handle iOS-specific theme optimizations
 */
export const useIOSThemeOptimizations = (isDarkMode: boolean) => {
  useEffect(() => {
    if (!isIOSDevice()) return;

    // Add temporary class during theme transition to prevent flicker
    document.body.classList.add('theme-transitioning');

    const timer = setTimeout(() => {
      document.body.classList.remove('theme-transitioning');
    }, 300); // Match the CSS transition duration

    return () => {
      clearTimeout(timer);
      document.body.classList.remove('theme-transitioning');
    };
  }, [isDarkMode]);

  useEffect(() => {
    if (!isIOSDevice()) return;

    // Handle iOS viewport height changes for better theme coverage
    const handleViewportChange = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Initial call
    handleViewportChange();

    // Listen for orientation changes and resize events
    window.addEventListener('resize', handleViewportChange);
    window.addEventListener('orientationchange', () => {
      // Delay to ensure new dimensions are available
      setTimeout(handleViewportChange, 100);
    });

    return () => {
      window.removeEventListener('resize', handleViewportChange);
      window.removeEventListener('orientationchange', handleViewportChange);
    };
  }, []);
};

export default useIOSThemeOptimizations;

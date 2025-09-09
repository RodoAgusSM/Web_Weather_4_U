/**
 * Utility functions for managing dynamic theme colors on iOS and other devices
 */

export const THEME_COLORS = {
  light: {
    themeColor: '#85C1E9',
    statusBarStyle: 'default',
    backgroundColor: '#85C1E9',
  },
  dark: {
    themeColor: '#2C3E50',
    statusBarStyle: 'black-translucent',
    backgroundColor: '#1A2530',
  },
};

/**
 * Updates the theme-color meta tag and iOS status bar style dynamically
 */
export const updateThemeColors = (isDarkMode: boolean) => {
  const colors = isDarkMode ? THEME_COLORS.dark : THEME_COLORS.light;

  // Update theme-color meta tag
  const themeColorMeta = document.getElementById('theme-color-meta');
  if (themeColorMeta) {
    themeColorMeta.setAttribute('content', colors.themeColor);
  }

  // Update iOS status bar style
  const statusBarMeta = document.getElementById('apple-status-bar-style');
  if (statusBarMeta) {
    statusBarMeta.setAttribute('content', colors.statusBarStyle);
  }

  // Update manifest theme color dynamically if supported
  const manifestMeta = document.querySelector('link[rel="manifest"]');
  if (manifestMeta && 'serviceWorker' in navigator) {
    // For PWA installations, we need to ensure the manifest colors match
    updateManifestColors(isDarkMode);
  }
};

/**
 * Updates manifest colors for PWA theme consistency
 */
const updateManifestColors = (isDarkMode: boolean) => {
  const colors = isDarkMode ? THEME_COLORS.dark : THEME_COLORS.light;

  // For iOS PWA, we can update CSS custom properties that the manifest can reference
  document.documentElement.style.setProperty('--pwa-theme-color', colors.themeColor);
  document.documentElement.style.setProperty('--pwa-background-color', colors.backgroundColor);
};

/**
 * Detects if the device is iOS
 */
export const isIOSDevice = (): boolean => {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
};

/**
 * Sets up iOS-specific optimizations for better theme handling
 */
export const setupIOSThemeOptimizations = () => {
  if (!isIOSDevice()) return;

  // Add iOS-specific class to body for targeted styling
  document.body.classList.add('ios-device');

  // Listen for viewport changes on iOS (important for PWA)
  const updateViewportHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  window.addEventListener('resize', updateViewportHeight);
  window.addEventListener('orientationchange', updateViewportHeight);
  updateViewportHeight();

  // Prevent elastic scrolling on iOS that can reveal white background
  document.body.style.overscrollBehavior = 'none';
  document.documentElement.style.overscrollBehavior = 'none';
};

/**
 * Force background color consistency on iOS Safari
 */
export const enforceIOSBackgroundConsistency = (isDarkMode: boolean) => {
  if (!isIOSDevice()) return;

  const colors = isDarkMode ? THEME_COLORS.dark : THEME_COLORS.light;

  // Set body background color explicitly for iOS
  document.body.style.backgroundColor = colors.backgroundColor;

  // Ensure viewport meta is optimal for iOS
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    viewport.setAttribute(
      'content',
      'width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no',
    );
  }
};

import { useMediaQuery } from 'react-responsive';

const BREAKPOINTS = {
  xs: 479,
  sm: 767,
  md: 1023,
  lg: 1279,
  xl: 1440,
};

const useDimensions = () => {
  const isExtraSmallDevice = useMediaQuery({ maxWidth: BREAKPOINTS.xs });
  const isSmallDevice = useMediaQuery({ minWidth: BREAKPOINTS.xs + 1, maxWidth: BREAKPOINTS.sm });
  const isMediumDevice = useMediaQuery({ minWidth: BREAKPOINTS.sm + 1, maxWidth: BREAKPOINTS.md });
  const isLargeDevice = useMediaQuery({ minWidth: BREAKPOINTS.md + 1, maxWidth: BREAKPOINTS.lg });
  const isExtraLargeDevice = useMediaQuery({ minWidth: BREAKPOINTS.lg + 1 });

  const isPortrait = useMediaQuery({ orientation: 'portrait' });
  const isLandscape = useMediaQuery({ orientation: 'landscape' });

  const isMobileDevice = isExtraSmallDevice || isSmallDevice;
  const isTabletDevice = isMediumDevice;
  const isDesktopOrLaptop = isLargeDevice || isExtraLargeDevice;

  const isMobilePortrait = isMobileDevice && isPortrait;
  const isMobileLandscape = isMobileDevice && isLandscape;
  const isTabletPortrait = isTabletDevice && isPortrait;
  const isTabletLandscape = isTabletDevice && isLandscape;

  const getScreenSize = () => {
    if (isExtraSmallDevice) return 'xs';
    if (isSmallDevice) return 'sm';
    if (isMediumDevice) return 'md';
    if (isLargeDevice) return 'lg';
    return 'xl';
  };

  return {
    // Individual breakpoints
    isExtraSmallDevice,
    isSmallDevice,
    isMediumDevice,
    isLargeDevice,
    isExtraLargeDevice,

    // Legacy names for backward compatibility
    isSmallMobileDevice: isExtraSmallDevice,
    isMobileDevice,
    isTabletDevice,
    isDesktopOrLaptop,

    // Orientation
    isPortrait,
    isLandscape,

    // Combined device + orientation
    isMobilePortrait,
    isMobileLandscape,
    isTabletPortrait,
    isTabletLandscape,

    // Utilities
    getScreenSize,
    breakpoints: BREAKPOINTS,
  };
};

export default useDimensions;

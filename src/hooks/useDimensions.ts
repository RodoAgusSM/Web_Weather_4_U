import { useMediaQuery } from 'react-responsive'

// Define breakpoints as constants for better maintainability
const BREAKPOINTS = {
    xs: 479,  // Extra small devices
    sm: 767,  // Small devices (mobile)
    md: 1023, // Medium devices (tablets)
    lg: 1279, // Large devices (laptops)
    xl: 1440  // Extra large devices (desktops)
};

const useDimensions = () => {
    // Device size detection
    const isExtraSmallDevice = useMediaQuery({ maxWidth: BREAKPOINTS.xs });
    const isSmallDevice = useMediaQuery({ minWidth: BREAKPOINTS.xs + 1, maxWidth: BREAKPOINTS.sm });
    const isMediumDevice = useMediaQuery({ minWidth: BREAKPOINTS.sm + 1, maxWidth: BREAKPOINTS.md });
    const isLargeDevice = useMediaQuery({ minWidth: BREAKPOINTS.md + 1, maxWidth: BREAKPOINTS.lg });
    const isExtraLargeDevice = useMediaQuery({ minWidth: BREAKPOINTS.lg + 1 });

    // Orientation detection
    const isPortrait = useMediaQuery({ orientation: 'portrait' });
    const isLandscape = useMediaQuery({ orientation: 'landscape' });

    // Combined device size categories
    const isMobileDevice = isExtraSmallDevice || isSmallDevice;
    const isTabletDevice = isMediumDevice;
    const isDesktopOrLaptop = isLargeDevice || isExtraLargeDevice;

    // Combined orientation and device size
    const isMobilePortrait = isMobileDevice && isPortrait;
    const isMobileLandscape = isMobileDevice && isLandscape;
    const isTabletPortrait = isTabletDevice && isPortrait;
    const isTabletLandscape = isTabletDevice && isLandscape;

    // Get the current screen size as a string
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
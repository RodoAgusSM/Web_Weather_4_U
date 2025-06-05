import { useEffect, useState } from 'react';

// Define breakpoints based on common device sizes
const breakpoints = {
    xs: 320,    // Small smartphones
    sm: 480,    // Mobile devices
    md: 768,    // Tablets
    lg: 1024,   // Small laptops
    xl: 1280,   // Desktops
    xxl: 1440   // Large screens
};

type Orientation = 'portrait' | 'landscape';

export interface ResponsiveInfo {
    // Device type detection
    isExtraSmallDevice: boolean;  // Small smartphones (iPhone SE, etc)
    isSmallDevice: boolean;       // Standard mobile phones
    isMediumDevice: boolean;      // Larger phones, small tablets
    isLargeDevice: boolean;       // Tablets, small laptops
    isExtraLargeDevice: boolean;  // Desktops

    // Shorthand device groups
    isMobileDevice: boolean;      // Any mobile device (xs, sm)
    isTabletDevice: boolean;      // Tablets (md)
    isDesktopDevice: boolean;     // Desktop and larger (lg, xl, xxl)

    // Legacy names for backward compatibility
    isSmallMobileDevice: boolean; // Same as isExtraSmallDevice
    isDesktopOrLaptop: boolean;   // Same as isDesktopDevice

    // Touch device detection
    isTouchDevice: boolean;

    // Orientation
    orientation: Orientation;
    isPortrait: boolean;
    isLandscape: boolean;

    // Combined device + orientation
    isMobilePortrait: boolean;
    isMobileLandscape: boolean;
    isTabletPortrait: boolean;
    isTabletLandscape: boolean;

    // Screen dimensions
    screenWidth: number;
    screenHeight: number;

    // Utilities
    getScreenSize: () => 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

    // Safe area for notched devices
    safeAreaInsets: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
}

const useResponsiveDesign = (): ResponsiveInfo => {
    // Initialize with default values
    const [responsiveInfo, setResponsiveInfo] = useState<ResponsiveInfo>({
        isExtraSmallDevice: false,
        isSmallDevice: false,
        isMediumDevice: false,
        isLargeDevice: false,
        isExtraLargeDevice: false,
        isMobileDevice: false,
        isTabletDevice: false,
        isDesktopDevice: false,
        isSmallMobileDevice: false,
        isDesktopOrLaptop: false,
        isTouchDevice: false,
        orientation: 'portrait',
        isPortrait: true,
        isLandscape: false,
        isMobilePortrait: false,
        isMobileLandscape: false,
        isTabletPortrait: false,
        isTabletLandscape: false,
        screenWidth: typeof window !== 'undefined' ? window.innerWidth : 0,
        screenHeight: typeof window !== 'undefined' ? window.innerHeight : 0,
        getScreenSize: () => 'md',
        safeAreaInsets: { top: 0, right: 0, bottom: 0, left: 0 }
    });

    useEffect(() => {
        // Function to update responsive info based on window dimensions
        const updateResponsiveInfo = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            // Determine orientation
            const isPortrait = height > width;
            const isLandscape = !isPortrait;

            // Detect device size
            const isExtraSmallDevice = width < breakpoints.sm;
            const isSmallDevice = width >= breakpoints.sm && width < breakpoints.md;
            const isMediumDevice = width >= breakpoints.md && width < breakpoints.lg;
            const isLargeDevice = width >= breakpoints.lg && width < breakpoints.xl;
            const isExtraLargeDevice = width >= breakpoints.xl;

            // Group devices
            const isMobileDevice = width < breakpoints.md;
            const isTabletDevice = width >= breakpoints.md && width < breakpoints.lg;
            const isDesktopDevice = width >= breakpoints.lg;

            // Set legacy properties for backward compatibility
            const isSmallMobileDevice = isExtraSmallDevice;
            const isDesktopOrLaptop = isDesktopDevice;

            // Combined orientation and device
            const isMobilePortrait = isMobileDevice && isPortrait;
            const isMobileLandscape = isMobileDevice && isLandscape;
            const isTabletPortrait = isTabletDevice && isPortrait;
            const isTabletLandscape = isTabletDevice && isLandscape;

            // Touch detection - more reliable than just screen size
            const isTouchDevice =
                'ontouchstart' in window ||
                navigator.maxTouchPoints > 0 ||
                (navigator as any).msMaxTouchPoints > 0;

            // Calculate safe area insets
            const safeAreaTop = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sat') || '0', 10);
            const safeAreaRight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sar') || '0', 10);
            const safeAreaBottom = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sab') || '0', 10);
            const safeAreaLeft = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sal') || '0', 10);

            const safeAreaInsets = {
                top: isNaN(safeAreaTop) ? 0 : safeAreaTop,
                right: isNaN(safeAreaRight) ? 0 : safeAreaRight,
                bottom: isNaN(safeAreaBottom) ? 0 : safeAreaBottom,
                left: isNaN(safeAreaLeft) ? 0 : safeAreaLeft
            };

            // Screen size utility function
            const getScreenSize = () => {
                if (width < breakpoints.sm) return 'xs';
                if (width < breakpoints.md) return 'sm';
                if (width < breakpoints.lg) return 'md';
                if (width < breakpoints.xl) return 'lg';
                if (width < breakpoints.xxl) return 'xl';
                return 'xxl';
            };

            setResponsiveInfo({
                isExtraSmallDevice,
                isSmallDevice,
                isMediumDevice,
                isLargeDevice,
                isExtraLargeDevice,
                isMobileDevice,
                isTabletDevice,
                isDesktopDevice,
                isSmallMobileDevice,
                isDesktopOrLaptop,
                isTouchDevice,
                orientation: isPortrait ? 'portrait' : 'landscape',
                isPortrait,
                isLandscape,
                isMobilePortrait,
                isMobileLandscape,
                isTabletPortrait,
                isTabletLandscape,
                screenWidth: width,
                screenHeight: height,
                getScreenSize,
                safeAreaInsets
            });
        };

        // Set CSS custom properties for safe areas
        const setSafeAreaProperties = () => {
            if (CSS && CSS.supports && CSS.supports('padding-top: env(safe-area-inset-top)')) {
                document.documentElement.style.setProperty('--sat', 'env(safe-area-inset-top)');
                document.documentElement.style.setProperty('--sar', 'env(safe-area-inset-right)');
                document.documentElement.style.setProperty('--sab', 'env(safe-area-inset-bottom)');
                document.documentElement.style.setProperty('--sal', 'env(safe-area-inset-left)');
            }
        };

        // Initial setup
        setSafeAreaProperties();
        updateResponsiveInfo();

        // Update on resize and orientation change
        window.addEventListener('resize', updateResponsiveInfo);
        window.addEventListener('orientationchange', updateResponsiveInfo);

        // Cleanup
        return () => {
            window.removeEventListener('resize', updateResponsiveInfo);
            window.removeEventListener('orientationchange', updateResponsiveInfo);
        };
    }, []);

    return responsiveInfo;
};

export default useResponsiveDesign;

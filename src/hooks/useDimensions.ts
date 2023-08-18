import { useMediaQuery } from 'react-responsive'

const useDimensions = () => {
    const isSmallMobileDevice = useMediaQuery({
        maxWidth: "379px",
    });

    const isMobileDevice = useMediaQuery({
        minWidth: "380px",
        maxWidth: "768px",
    });

    const isTabletDevice = useMediaQuery({
        minWidth: "769px",
        maxWidth: "1024px",
    });

    const isDesktopOrLaptop = useMediaQuery({
        minWidth: "1025px",
    })

    const isPortrait = useMediaQuery({ orientation: 'portrait' })

    const isLandscape = useMediaQuery({ orientation: 'landscape' })


    return {
        isSmallMobileDevice,
        isMobileDevice,
        isTabletDevice,
        isDesktopOrLaptop,
        isPortrait,
        isLandscape,
    }
}

export default useDimensions;
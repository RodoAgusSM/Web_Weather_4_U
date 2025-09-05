import { memo, useCallback, useEffect, useState } from 'react';
import StarsAnimation from 'components/Space/Space';
import useResponsiveDesign from 'hooks/useResponsiveDesign';
import socialIcons from 'images/socialIcons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import GlobalStyles from 'styles/GlobalStyles';
import { BackContainer, BackIconSpotImg, BoxContainer, BoxWrapper } from 'styles/styles';

import { useTheme } from '../../context/ThemeContext';
import { darkTheme, lightTheme } from '../../styles/theme';

import {
  MiInfo,
  MiInfoContainer,
  NetworkContainer,
  NetworkMapContainer,
  NetworkTitle,
  SocialNetworkIcon,
  SocialNetworkItem,
  SocialNetworkName,
} from './SocialNetworkStyles';

type MyInfoType = {
  nameAndDegree: string;
  likeAndView: string;
};

type SocialNetworkItemType = {
  abbreviation: string;
  link: string;
  username: string;
};

const SocialNetwork = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;
  const {
    isDesktopOrLaptop,
    isMobileDevice,
    isSmallMobileDevice,
    isTouchDevice,
    isPortrait,
    isLandscape,
  } = useResponsiveDesign();
  const [mouseOver, setMouseOver] = useState<boolean>(false);

  const handleMouseEnter = useCallback(() => setMouseOver(true), []);
  const handleMouseLeave = useCallback(() => setMouseOver(false), []);
  const handleBackClick = useCallback(() => navigate('/'), [navigate]);

  const myInfo: MyInfoType = t('socialNetworks.myInfo', { returnObjects: true });
  const socialNetworks: SocialNetworkItemType[] = Object.values(
    t('socialNetworks.networks', {
      returnObjects: true,
    }),
  );

  useEffect(() => {
    const initializeAnimations = () => {
      const elements = document.querySelectorAll('[data-animate="true"]');
      elements.forEach((element, index) => {
        (element as HTMLElement).style.setProperty('--index', index.toString());
      });
    };

    setTimeout(initializeAnimations, 100);
  }, []);

  const handleTouchStart = useCallback(() => {
    if (isTouchDevice) {
    }
  }, [isTouchDevice]);

  const responsiveProps = {
    $isDesktopOrLaptop: isDesktopOrLaptop,
    $isMobileDevice: isMobileDevice,
    $isSmallMobileDevice: isSmallMobileDevice,
    $isPortrait: isPortrait,
    $isLandscape: isLandscape,
  };

  return (
    <>
      <GlobalStyles theme={theme} />
      <div
        style={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <BoxContainer
          {...responsiveProps}
          theme={theme}
          data-animate="true"
          onTouchStart={isTouchDevice ? handleTouchStart : undefined}>
          <BoxWrapper {...responsiveProps}>
            <StarsAnimation />
            <div style={{ width: '100%' }}>
              <BackContainer
                $isMobile={responsiveProps.$isMobileDevice}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleBackClick}
                data-animate="true">
                <BackIconSpotImg $mouseOver={mouseOver} />
                {t('words.back')}
              </BackContainer>
            </div>

            <MiInfoContainer theme={theme} data-animate="true">
              <MiInfo $isMobile={responsiveProps.$isMobileDevice}>{myInfo.nameAndDegree}</MiInfo>
              <MiInfo $isMobile={responsiveProps.$isMobileDevice}>{myInfo.likeAndView}</MiInfo>
            </MiInfoContainer>

            <NetworkContainer theme={theme} data-animate="true">
              <NetworkTitle $isMobile={responsiveProps.$isMobileDevice}>
                {t('socialNetworks.title')}
              </NetworkTitle>
              {socialNetworks.map((socialNetworkItem: SocialNetworkItemType, index: number) => (
                <NetworkMapContainer
                  $isMobile={responsiveProps.$isMobileDevice}
                  key={index}
                  style={{ '--index': index } as React.CSSProperties}>
                  <SocialNetworkIcon icon={socialIcons[socialNetworkItem.abbreviation]} />
                  <SocialNetworkName>{socialNetworkItem.abbreviation}</SocialNetworkName>
                  <SocialNetworkItem
                    theme={theme}
                    href={socialNetworkItem.link}
                    target="_blank"
                    rel="noopener noreferrer">
                    {socialNetworkItem.username}
                  </SocialNetworkItem>
                </NetworkMapContainer>
              ))}
            </NetworkContainer>
          </BoxWrapper>
        </BoxContainer>
      </div>
    </>
  );
};

export default memo(SocialNetwork);
(SocialNetwork as any).displayName = 'SocialNetwork';

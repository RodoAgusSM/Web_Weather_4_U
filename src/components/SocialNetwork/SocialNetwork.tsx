import { useCallback, useEffect, useState } from 'react';
import StarsAnimation from 'components/Space/Space';
import useResponsiveDesign from 'hooks/useResponsiveDesign';
import socialIcons from 'images/socialIcons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import GlobalStyles from 'styles/GlobalStyles';
import { BackContainer, BackIconSpotImg, WeatherCard } from 'styles/styles';

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
  const { isDesktopOrLaptop, isMobileDevice, isSmallMobileDevice, isTouchDevice } =
    useResponsiveDesign();
  const [mouseOver, setMouseOver] = useState<boolean>(false);

  const handleMouseEnter = useCallback(() => setMouseOver(true), []);
  const handleMouseLeave = useCallback(() => setMouseOver(false), []);
  const handleBackClick = useCallback(() => navigate('/'), [navigate]);

  const myInfo: MyInfoType = t('socialNetworks.myInfo', { returnObjects: true });
  const socialNetworks: SocialNetworkItemType[] = Object.values(
    t('socialNetworks.networks', {
      returnObjects: true,
    })
  );

  useEffect(() => {
    // Initialize animations with staggered delays
    const initializeAnimations = () => {
      const elements = document.querySelectorAll('[data-animate="true"]');
      elements.forEach((element, index) => {
        (element as HTMLElement).style.setProperty('--index', index.toString());
      });
    };

    setTimeout(initializeAnimations, 100);
  }, []);

  // Touch-specific event handling
  const handleTouchStart = useCallback(() => {
    if (isTouchDevice) {
      // Special handling for touch devices
    }
  }, [isTouchDevice]);

  return (
    <>
      <GlobalStyles />
      <div
        style={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <WeatherCard
          $isDesktopOrLaptop={isDesktopOrLaptop}
          $isMobileDevice={isMobileDevice}
          $isSmallMobileDevice={isSmallMobileDevice}
          data-animate="true"
          onTouchStart={isTouchDevice ? handleTouchStart : undefined}
        >
          <StarsAnimation />
          <BackContainer
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleBackClick}
            data-animate="true"
          >
            <BackIconSpotImg $mouseOver={mouseOver} />
            {t('words.back')}
          </BackContainer>

          <MiInfoContainer data-animate="true">
            <MiInfo>{myInfo.nameAndDegree}</MiInfo>
            <MiInfo>{myInfo.likeAndView}</MiInfo>
          </MiInfoContainer>

          <NetworkContainer data-animate="true">
            <NetworkTitle>{t('socialNetworks.title', { defaultValue: 'Find me on' })}</NetworkTitle>
            {socialNetworks.map((socialNetworkItem: SocialNetworkItemType, index: number) => (
              <NetworkMapContainer key={index} style={{ '--index': index } as React.CSSProperties}>
                <SocialNetworkIcon icon={socialIcons[socialNetworkItem.abbreviation]} />
                <SocialNetworkName>{socialNetworkItem.abbreviation}</SocialNetworkName>
                <SocialNetworkItem
                  href={socialNetworkItem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {socialNetworkItem.username}
                </SocialNetworkItem>
              </NetworkMapContainer>
            ))}
          </NetworkContainer>
        </WeatherCard>
      </div>
    </>
  );
};

export default SocialNetwork;

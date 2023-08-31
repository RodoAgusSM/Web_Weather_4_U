import { useCallback, useState } from 'react';
import StarsAnimation from 'components/Space/Space';
import useDimensions from 'hooks/useDimensions';
import BackIcon from 'images/back_icon.png';
import BackIconHover from 'images/back_icon_hover.png';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { BackContainer, BackIconSpotImg, GlobalStyle, WeatherCard } from 'styles/styles';

import {
  MiInfo,
  MiInfoContainer,
  NetworkContainer,
  NetworkMapContainer,
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
  const { isDesktopOrLaptop, isMobileDevice, isSmallMobileDevice } = useDimensions();
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

  return (
    <>
      <GlobalStyle $isSmallMobileDevice={isSmallMobileDevice} />
      <WeatherCard
        $isDesktopOrLaptop={isDesktopOrLaptop}
        $isMobileDevice={isMobileDevice}
        $isSmallMobileDevice={isSmallMobileDevice}
      >
        <StarsAnimation />
        <BackContainer
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleBackClick}
        >
          <BackIconSpotImg $mouseOver={mouseOver} $regular={BackIcon} $hover={BackIconHover} />
          {t('words.back')}
        </BackContainer>
        <MiInfoContainer>
          <MiInfo>{myInfo.nameAndDegree}</MiInfo>
          <MiInfo>{myInfo.likeAndView}</MiInfo>
        </MiInfoContainer>
        <NetworkContainer>
          {socialNetworks.map((socialNetworkItem: SocialNetworkItemType, index: number) => (
            <NetworkMapContainer key={index}>
              <SocialNetworkName>{socialNetworkItem.abbreviation}</SocialNetworkName>
              <SocialNetworkItem href={socialNetworkItem.link} target="_blank">
                {socialNetworkItem.username}
              </SocialNetworkItem>
            </NetworkMapContainer>
          ))}
        </NetworkContainer>
      </WeatherCard>
    </>
  );
};

export default SocialNetwork;

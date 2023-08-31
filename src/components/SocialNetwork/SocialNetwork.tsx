import { useState } from 'react';
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

const SocialNetwork = () => {
  const { t } = useTranslation();
  let navigate = useNavigate();
  const { isDesktopOrLaptop, isMobileDevice, isSmallMobileDevice } = useDimensions();
  const [mouseOver, setMouseOver] = useState<boolean>(false);

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
          onMouseEnter={() => setMouseOver(true)}
          onMouseLeave={() => setMouseOver(false)}
          onClick={() => {
            navigate(`/`);
          }}
        >
          <BackIconSpotImg $mouseOver={mouseOver} $regular={BackIcon} $hover={BackIconHover} />
          {t('words.back')}
        </BackContainer>
        <MiInfoContainer>
          <MiInfo>{t('socialNetworks.myInfo.nameAndDegree')} </MiInfo>
          <MiInfo> {t('socialNetworks.myInfo.likeAndView')} </MiInfo>
        </MiInfoContainer>
        <NetworkContainer>
          {Object.values(t('socialNetworks.networks', { returnObjects: true })).map(
            (socialNetworkItem: any, index: number) => (
              <NetworkMapContainer key={index}>
                <SocialNetworkName>{socialNetworkItem.abbrebiation} </SocialNetworkName>
                <SocialNetworkItem href={socialNetworkItem.link} target="_blank">
                  {socialNetworkItem.username}
                </SocialNetworkItem>
              </NetworkMapContainer>
            )
          )}
        </NetworkContainer>
      </WeatherCard>
    </>
  );
};

export default SocialNetwork;

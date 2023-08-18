import { useState } from 'react';
import useDimensions from 'hooks/useDimensions';
import back_icon from 'images/back_icon.png';
import back_icon_hover from 'images/back_icon_hover.png';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  BackContainer,
  BackIcon,
  GlobalStyle,
  MiInfo,
  MiInfoContainer,
  NetworkContainer,
  NetworkMapContainer,
  SocialNetworkItem,
  SocialNetworkName,
  WeatherCard,
} from 'styles/styles';

const SocialNetwork = () => {
  const { t } = useTranslation();
  let navigate = useNavigate();
  const { isDesktopOrLaptop, isMobileDevice, isSmallMobileDevice } = useDimensions();
  const [mouseOver, setMouseOver] = useState(false);

  return (
    <>
      <GlobalStyle />
      <WeatherCard
        isDesktopOrLaptop={isDesktopOrLaptop}
        isMobileDevice={isMobileDevice}
        isSmallMobileDevice={isSmallMobileDevice}
      >
        <BackContainer
          onMouseEnter={() => setMouseOver(true)}
          onMouseLeave={() => setMouseOver(false)}
          onClick={() => {
            navigate(`/`);
          }}
        >
          <BackIcon mouseOver={mouseOver} regular={back_icon} hover={back_icon_hover} />
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
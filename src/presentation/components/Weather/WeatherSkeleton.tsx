import React from 'react';
import styled from 'styled-components';

import { skeletonBase } from '../Skeleton';
import WeatherCardSkeleton from '../WeatherDataCard/WeatherCardSkeleton';

interface WeatherSkeletonProps {
  $isDesktop?: boolean;
}

const Outer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  padding: 24px;
  box-sizing: border-box;
`;

const Panel = styled.div`
  width: 460px;
  max-width: 100%;
  background: linear-gradient(180deg, rgba(245, 250, 255, 0.98), rgba(238, 248, 255, 0.96));
  border-radius: 18px;
  padding: 24px;
  box-shadow: 0 10px 36px rgba(12, 60, 90, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.6);
  position: relative;
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 18px;
  margin-bottom: 18px;
  position: relative;
`;

const InnerHeader = styled.div`
  flex: 1 1 60%;
  background: linear-gradient(180deg, #ffffff, #fbfdff);
  border-radius: 12px;
  padding: 18px;
  padding-right: 96px;
  padding-left: 18px;
  box-shadow: 0 8px 18px rgba(12, 60, 90, 0.06);
  position: relative;
`;

const CityName = styled.div`
  height: 24px;
  width: 60%;
  border-radius: 8px;
  ${skeletonBase}
  margin-bottom: 12px;
`;

const Temperature = styled.div`
  height: 46px;
  width: 25%;
  border-radius: 10px;
  ${skeletonBase}
  margin-bottom: 10px;
`;

const FeelsLike = styled.div`
  height: 14px;
  width: 55%;
  border-radius: 8px;
  ${skeletonBase}
  margin-bottom: 8px;
`;

const Description = styled.div`
  height: 16px;
  width: 45%;
  border-radius: 8px;
  ${skeletonBase}
`;

const IconCircle = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  ${skeletonBase}
  box-shadow: 0 8px 18px rgba(12,60,90,0.06);
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 18px;
`;

const FooterBar = styled.div`
  width: 100%;
  background: linear-gradient(180deg, #ffffff, #fbfdff);
  border-radius: 12px;
  padding: 8px 12px;
  box-shadow: 0 8px 18px rgba(12, 60, 90, 0.04);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const Footer = styled.div`
  margin-top: 12px;
`;

const UpdatedText = styled.div`
  width: 140px;
  height: 18px;
  border-radius: 8px;
  ${skeletonBase}
  flex: 0 0 auto;
`;

const PaginationDots = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  ${skeletonBase}
  opacity: 0.7;
`;

const DateText = styled.div`
  width: 140px;
  height: 18px;
  border-radius: 8px;
  ${skeletonBase}
  flex: 0 0 auto;
`;

const ControlsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;
  justify-content: center;
  margin-top: 18px;
  width: 100%;
`;

const UnitsPill = styled.div`
  display: flex;
  background: linear-gradient(180deg, #ffffff, #fbfdff);
  border-radius: 12px;
  padding: 10px;
  box-shadow: 0 10px 22px rgba(12, 60, 90, 0.05);
  gap: 12px;
`;

const UnitSegment = styled.div`
  width: 88px;
  height: 44px;
  border-radius: 10px;
  ${skeletonBase}
`;

const SmallControlsPill = styled.div`
  display: flex;
  background: linear-gradient(180deg, #ffffff, #fbfdff);
  border-radius: 12px;
  padding: 8px 10px;
  box-shadow: 0 10px 22px rgba(12, 60, 90, 0.05);
  gap: 10px;
`;

const SmallDot = styled.div`
  width: 34px;
  height: 28px;
  border-radius: 8px;
  ${skeletonBase}
`;

const LanguagePill = styled.div`
  width: 180px;
  height: 44px;
  border-radius: 12px;
  ${skeletonBase}
  box-shadow: 0 8px 18px rgba(12,60,90,0.04);
`;

const InfoBubble = styled.div`
  position: absolute;
  right: 22px;
  bottom: 32px;
  width: 24px;
  height: 24px;
  border-radius: 25px;
  ${skeletonBase}
`;

const WeatherSkeleton: React.FC<WeatherSkeletonProps> = () => {
  return (
    <Outer aria-busy="true">
      <Panel>
        <Header>
          <InnerHeader>
            <CityName />
            <Temperature />
            <FeelsLike />
            <Description />
          </InnerHeader>
          <IconCircle />
        </Header>

        <Grid>
          <WeatherCardSkeleton hasInfoButton />
          <WeatherCardSkeleton />
          <WeatherCardSkeleton />
          <WeatherCardSkeleton />
          <WeatherCardSkeleton />
          <WeatherCardSkeleton />
          <WeatherCardSkeleton />
          <WeatherCardSkeleton />
        </Grid>

        <Footer>
          <FooterBar>
            <UpdatedText />

            <PaginationDots>
              <Dot />
              <Dot />
              <Dot />
            </PaginationDots>

            <DateText />
          </FooterBar>
        </Footer>

        <ControlsWrapper>
          <UnitsPill>
            <UnitSegment />
            <UnitSegment />
          </UnitsPill>

          <SmallControlsPill>
            <SmallDot />
            <SmallDot />
            <SmallDot />
          </SmallControlsPill>

          <LanguagePill />

          <InfoBubble />
        </ControlsWrapper>
      </Panel>
    </Outer>
  );
};

export default WeatherSkeleton;

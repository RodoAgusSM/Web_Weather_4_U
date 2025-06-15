import React, { memo } from 'react';

import {
  CardContainer,
  ContentContainer,
  HeaderContainer,
  IconContainer,
  SkeletonIcon,
  SkeletonLabel,
  SkeletonValue,
} from './WeatherCardSkeletonStyles';

interface WeatherCardSkeletonProps {
  hasInfoButton?: boolean;
}

const WeatherCardSkeleton: React.FC<WeatherCardSkeletonProps> = ({ hasInfoButton = false }) => {
  return (
    <CardContainer $hasInfoButton={hasInfoButton}>
      <IconContainer>
        <SkeletonIcon />
      </IconContainer>

      <ContentContainer>
        <HeaderContainer>
          <SkeletonLabel />
        </HeaderContainer>
        <SkeletonValue />
      </ContentContainer>

      {hasInfoButton && <IconContainer className="info-button" />}
    </CardContainer>
  );
};

export default memo(WeatherCardSkeleton);

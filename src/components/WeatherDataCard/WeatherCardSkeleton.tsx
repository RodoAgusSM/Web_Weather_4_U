import React from 'react';

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
      {/* Column 1: Icon Skeleton */}
      <IconContainer>
        <SkeletonIcon />
      </IconContainer>

      {/* Column 2: Content Skeleton */}
      <ContentContainer>
        <HeaderContainer>
          <SkeletonLabel />
        </HeaderContainer>
        <SkeletonValue />
      </ContentContainer>

      {/* Column 3: Info Button Skeleton (if needed) */}
      {hasInfoButton && <IconContainer className="info-button" />}
    </CardContainer>
  );
};

export default WeatherCardSkeleton;

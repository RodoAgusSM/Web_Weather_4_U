import { memo, useState } from 'react';
import React from 'react';
import { getRandomNumber } from 'utils/helpers';

import { useGenerateRandomStars, useSpringsAnimation } from '../../hooks/useAnimations';
import useDimensions from '../../hooks/useDimensions';

import {
  AnimatedSpring,
  SpaceContainer,
  StarAfter,
  StarBeforeAfter,
  StarElement,
} from './SpaceStyles';

const MIN_STAR_COUNT = 0;
const MAX_STAR_COUNT = 8;

const StarsAnimation = () => {
  const [randomStarCount] = useState(() => getRandomNumber(MIN_STAR_COUNT, MAX_STAR_COUNT));
  const { isMobileDevice } = useDimensions();
  const springs = useSpringsAnimation(randomStarCount);
  const stars = useGenerateRandomStars(randomStarCount);

  // Detect iOS devices
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  // Reduce star count on mobile for better performance
  const mobileStarCount = isMobileDevice ? Math.min(randomStarCount, 4) : randomStarCount;

  return (
    <SpaceContainer>
      {stars.slice(0, mobileStarCount).map((star, index) => (
        <React.Fragment key={index}>
          <StarElement
            $delay={star.delay}
            $top={star.top}
            $left={star.left}
            $isMobile={isMobileDevice || isIOS}>
            <StarBeforeAfter $isMobile={isMobileDevice || isIOS} />
            <StarAfter $isMobile={isMobileDevice || isIOS} />
          </StarElement>
          {/* Show AnimatedSpring on all devices but with iOS optimizations */}
          <AnimatedSpring
            style={{
              ...springs[index],
              ...(isIOS && {
                filter: 'brightness(1.3) contrast(1.2)',
                boxShadow: '0 0 12px rgba(230, 232, 199, 0.9), 0 0 24px rgba(230, 232, 199, 0.5)',
                willChange: 'transform',
                backfaceVisibility: 'hidden',
              }),
            }}
          />
        </React.Fragment>
      ))}
    </SpaceContainer>
  );
};

export default memo(StarsAnimation);
(StarsAnimation as any).displayName = 'StarsAnimation';

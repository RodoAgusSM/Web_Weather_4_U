import { memo, useState } from 'react';
import React from 'react';
import { useGenerateRandomStars, useSpringsAnimation } from 'hooks/useAnimations';
import useDimensions from 'hooks/useDimensions';
import { getRandomNumber } from 'utils/helpers';

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
  const { isDesktopOrLaptop } = useDimensions();
  const springs = useSpringsAnimation(randomStarCount);
  const stars = useGenerateRandomStars(randomStarCount);

  return (
    <SpaceContainer>
      {isDesktopOrLaptop &&
        stars.map((star, index) => (
          <React.Fragment key={index}>
            <StarElement $delay={star.delay} $top={star.top} $left={star.left}>
              <StarBeforeAfter />
              <StarAfter />
            </StarElement>
            <AnimatedSpring style={{ ...springs[index] }} />
          </React.Fragment>
        ))}
    </SpaceContainer>
  );
};

export default memo(StarsAnimation);
(StarsAnimation as any).displayName = 'StarsAnimation';

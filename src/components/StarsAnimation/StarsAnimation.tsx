import { memo } from 'react';
import { useSpringsAnimation } from 'hooks/useAnimations';
import { Star } from 'interfaces/index';
import { getRandomNumber } from 'utils/helpers';

import {
  AnimatedSpring,
  StarAfter,
  StarBeforeAfter,
  StarContainer,
  StarElement,
} from './StarsAnimationStyles';

const MIN_STAR_COUNT = 0;
const MAX_STAR_COUNT = 8;
const MIN_TOP_POSITION = -100;
const MAX_TOP_POSITION = 700;
const MIN_LEFT_POSITION = -300;
const MAX_LEFT_POSITION = 250;
const MIN_DELAY = 0.1;
const MAX_DELAY = 2;

const generateRandomStarsData = (count: number): Star[] => {
  return Array.from({ length: count }, () => ({
    top: getRandomNumber(MIN_TOP_POSITION, MAX_TOP_POSITION),
    left: getRandomNumber(MIN_LEFT_POSITION, MAX_LEFT_POSITION),
    delay: getRandomNumber(MIN_DELAY, MAX_DELAY),
  }));
};

const StarsAnimation = () => {
  const springsData = useSpringsAnimation(getRandomNumber(MIN_STAR_COUNT, MAX_STAR_COUNT));
  const randomStarsData = generateRandomStarsData(getRandomNumber(MIN_STAR_COUNT, MAX_STAR_COUNT));

  return (
    <StarContainer>
      {randomStarsData.map((star, index: number) => (
        <StarElement key={index} delay={star.delay} top={star.top} left={star.left}>
          <StarBeforeAfter />
          <StarAfter />
        </StarElement>
      ))}
      {springsData.map((spring, index: number) => (
        <AnimatedSpring key={index} style={{ ...spring }} />
      ))}
    </StarContainer>
  );
};

export default memo(StarsAnimation);

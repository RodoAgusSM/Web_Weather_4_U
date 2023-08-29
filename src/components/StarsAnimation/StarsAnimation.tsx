import { memo, useEffect } from 'react';
import { useSpringsAnimation } from 'hooks/useAnimations';
import { Colors } from 'styles/colors';
import { getRandomNumber } from 'utils/helpers';

import { animated } from '@react-spring/web';

import { Star, StarAfter, StarBeforeAfter, StarContainer } from './StarsAnimationStyles';

const generateRandomStarsData = (count: number) => {
  return Array.from({ length: count }, () => ({
    top: getRandomNumber(-100, 700),
    left: getRandomNumber(-300, 250),
    delay: getRandomNumber(0.1, 2),
  }));
};

const StarsAnimation = () => {
  const springsData = useSpringsAnimation(getRandomNumber(0, 8));
  const randomStarsData = generateRandomStarsData(getRandomNumber(0, 8));

  useEffect(() => {}, []);

  return (
    <StarContainer>
      {randomStarsData.map((star: any, index: number) => (
        <Star key={index} delay={star.delay} top={star.top} left={star.left}>
          <StarBeforeAfter />
          <StarAfter />
        </Star>
      ))}
      {springsData.map((spring: any, index: number) => (
        <animated.div
          key={index}
          style={{
            width: 10,
            height: 10,
            background: `${Colors.shootingStar}`,
            borderRadius: 25,
            ...spring,
          }}
        />
      ))}
    </StarContainer>
  );
};

export default memo(StarsAnimation);

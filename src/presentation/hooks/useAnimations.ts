import { getRandomNumber } from 'utils/helpers';

import { easings, useSpring } from '@react-spring/web';

import { Star } from '../../shared/types/UITypes';

const MIN_MASS = 0;
const MAX_MASS = 1;
const MIN_TENSION = 0;
const MAX_TENSION = 280;
const MIN_FRICTION = 0;
const MAX_FRICTION = 120;
const MIN_STEPS = 1000;
const MAX_STEPS = 2000;
const MIN_DURATION = 5000;
const MAX_DURATION = 10000;
const MIN_XY = -100;
const MAX_XY = 700;
const MIN_OPACITY = 0;
const MAX_OPACITY = 1;

const MIN_TOP_POSITION = -100;
const MAX_TOP_POSITION = 700;
const MIN_LEFT_POSITION = -300;
const MAX_LEFT_POSITION = 250;
const MIN_DELAY = 0.1;
const MAX_DELAY = 2;

const getRandomConfig = () => ({
  mass: getRandomNumber(MIN_MASS, MAX_MASS),
  tension: getRandomNumber(MIN_TENSION, MAX_TENSION),
  friction: getRandomNumber(MIN_FRICTION, MAX_FRICTION),
  easing: easings.steps(Math.round(getRandomNumber(MIN_STEPS, MAX_STEPS))),
  duration: getRandomNumber(MIN_DURATION, MAX_DURATION),
});

export const useGenerateRandomStars = (count: number): Star[] => {
  return Array.from({ length: count }, () => ({
    top: getRandomNumber(MIN_TOP_POSITION, MAX_TOP_POSITION),
    left: getRandomNumber(MIN_LEFT_POSITION, MAX_LEFT_POSITION),
    delay: getRandomNumber(MIN_DELAY, MAX_DELAY),
  }));
};

export const useSpringsAnimation = (count: number) => {
  const springsData = Array.from({ length: count }).map(() =>
    useSpring({
      from: { x: getRandomNumber(MIN_XY, MAX_XY), y: getRandomNumber(MIN_XY, MAX_XY), opacity: 1 },
      to: async next => {
        while (true) {
          await next({
            x: getRandomNumber(MIN_XY, MAX_XY),
            y: getRandomNumber(MIN_XY, MAX_XY),
            opacity: MIN_OPACITY,
          });
          await next({
            x: getRandomNumber(MIN_XY, MAX_XY),
            y: getRandomNumber(MIN_XY, MAX_XY),
            opacity: MAX_OPACITY,
          });
        }
      },
      config: getRandomConfig(),
      reset: true,
      loop: true,
    }),
  );
  return springsData;
};

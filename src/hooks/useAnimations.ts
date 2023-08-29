import { getRandomNumber } from 'utils/helpers';

import { easings, useSpring } from '@react-spring/web';

const getRandomConfig = () => ({
    mass: getRandomNumber(0, 1),
    tension: getRandomNumber(0, 280),
    friction: getRandomNumber(0, 120),
    easing: easings.steps(Math.round(getRandomNumber(1000, 2000))),
    duration: getRandomNumber(5000, 10000)
});


export const useSpringsAnimation = (count: number) => {
    const springsData = Array.from({ length: count }).map(() =>
        useSpring({
            from: { x: getRandomNumber(-100, 700), y: getRandomNumber(-100, 700) },
            to: { x: getRandomNumber(-100, 700), y: getRandomNumber(-100, 700) },
            config: getRandomConfig(),
            reset: true,
            loop: true
        })
    );
    return springsData;
};

import { memo, useEffect, useState } from 'react';

import { Star, StarAfter, StarBeforeAfter, StarContainer } from './StarsAnimationStyles';

const StarsAnimation = () => {
  const [starsData, setStarsData] = useState<any>([]);

  useEffect(() => {
    const randomStarsData = generateRandomStarsData(getRandomNumber(0, 8)); // Generate 5 random stars
    setStarsData(randomStarsData);
  }, []);

  const getRandomNumber = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  const generateRandomStarsData = (count: number) => {
    const starsData = [];
    for (let i = 0; i < count; i++) {
      const top = getRandomNumber(-100, 700);
      const left = getRandomNumber(-300, 250);
      const delay = getRandomNumber(0.1, 2);
      starsData.push({ top, left, delay });
    }
    return starsData;
  };

  return (
    <StarContainer>
      {starsData.map((star: any, index: number) => (
        <Star key={index} delay={star.delay} top={star.top} left={star.left}>
          <StarBeforeAfter />
          <StarAfter />
        </Star>
      ))}
    </StarContainer>
  );
};

export default memo(StarsAnimation);

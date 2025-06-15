import React, { memo, useMemo } from 'react';
import useResponsiveDesign from 'hooks/useResponsiveDesign';

import {
  CloudElement,
  GlassOverlay,
  RainDrop,
  SnowFlake,
  SpinnerContainer,
  SpinnerInner,
  SunElement,
  SunRay,
} from './WeatherSpinnerStyles';

interface WeatherSpinnerProps {
  size?: 'small' | 'medium' | 'large';
}

const WeatherSpinner: React.FC<WeatherSpinnerProps> = ({ size = 'medium' }) => {
  const { isMobileDevice } = useResponsiveDesign();

  const particleConfig = useMemo(() => {
    const particleCount = isMobileDevice ? 5 : 8;

    const raindrops = Array.from({ length: particleCount }).map((_, i) => ({
      key: `rain-${i}`,
      delay: i * 0.5 + Math.random() * 0.5,
      position: 5 + i * (90 / particleCount) + (Math.random() * 10 - 5),
      size: 2 + Math.random() * 3,
      duration: 1.2 + Math.random() * 0.8,
    }));

    const snowflakes = Array.from({ length: Math.floor(particleCount / 2) }).map((_, i) => ({
      key: `snow-${i}`,
      delay: i * 0.8 + Math.random() * 0.7,
      position: 15 + i * (70 / Math.floor(particleCount / 2)) + (Math.random() * 15 - 7.5),
      size: 3 + Math.random() * 4,
      duration: 2.5 + Math.random() * 1.5,
    }));

    const sunRays = Array.from({ length: 8 }).map((_, i) => ({
      key: `ray-${i}`,
      angle: i * (360 / 8),
      length: 12 + Math.random() * 8,
      delay: i * 0.15,
    }));

    return { raindrops, snowflakes, sunRays };
  }, [isMobileDevice]);

  return (
    <SpinnerContainer $size={size} aria-label="Loading weather data">
      <GlassOverlay />
      <SpinnerInner>
        <SunElement>
          {particleConfig.sunRays.map((ray) => (
            <SunRay key={ray.key} $angle={ray.angle} $length={ray.length} $delay={ray.delay} />
          ))}
        </SunElement>

        <CloudElement $delay={0} $size={22} $distance={40} $rotation={360} />
        <CloudElement $delay={2} $size={28} $distance={35} $rotation={-320} />
        <CloudElement $delay={3.5} $size={20} $distance={45} $rotation={300} />

        {particleConfig.raindrops.map((drop) => (
          <RainDrop
            key={drop.key}
            $delay={drop.delay}
            $position={drop.position}
            $size={drop.size}
            $duration={drop.duration}
          />
        ))}

        {particleConfig.snowflakes.map((flake) => (
          <SnowFlake
            key={flake.key}
            $delay={flake.delay}
            $position={flake.position}
            $size={flake.size}
            $duration={flake.duration}
          />
        ))}
      </SpinnerInner>
    </SpinnerContainer>
  );
};

export default memo(WeatherSpinner);

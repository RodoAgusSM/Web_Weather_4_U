import React, { memo, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';

const weatherColors = {
  sun: ['#F39C12', '#F5B041', '#F7DC6F'],
  cloud: ['#D6EAF8', '#AED6F1', '#85C1E9'],
  rain: ['#5DADE2', '#3498DB', '#2E86C1'],
  snow: ['#ECF0F1', '#D0D3D4', '#BDC3C7'],
  thunder: ['#F39C12', '#F1C40F', '#F4D03F'],
  mist: ['#D6DBDF', '#BDC3C7', '#A6ACAF'],
};

interface AnimatedWeatherIconProps {
  iconCode: string;
  size?: number;
}

const cloudFloat = keyframes`
  0%, 100% { transform: translateX(0) translateY(0); }
  50% { transform: translateX(5px) translateY(-3px); }
`;

const rainDrop = keyframes`
  0% { transform: translateY(0) scale(1); opacity: 0.8; }
  100% { transform: translateY(20px) scale(0.7); opacity: 0; }
`;

const snowfall = keyframes`
  0% { transform: translateY(0) rotate(0deg); opacity: 0.8; }
  100% { transform: translateY(20px) rotate(360deg); opacity: 0; }
`;

const sunPulse = keyframes`
  0%, 100% { transform: scale(1) rotate(0deg); filter: brightness(1); }
  50% { transform: scale(1.1) rotate(5deg); filter: brightness(1.1); }
`;

const mistFloat = keyframes`
  0% { opacity: 0.3; transform: translateX(-5px); }
  50% { opacity: 0.7; transform: translateX(5px); }
  100% { opacity: 0.3; transform: translateX(-5px); }
`;

const thunderFlash = keyframes`
  0%, 100% { opacity: 0; filter: brightness(1); }
  92% { opacity: 0; filter: brightness(1); }
  94% { opacity: 1; filter: brightness(1.5); }
  96% { opacity: 0; filter: brightness(1); }
  98% { opacity: 1; filter: brightness(1.5); }
`;

const Container = styled.div<{ size: number }>`
  position: relative;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  overflow: visible;
`;

const DefaultIcon = styled.img`
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15));
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const CloudIcon = styled(DefaultIcon)`
  animation: ${cloudFloat} 6s ease-in-out infinite;
`;

const SunIcon = styled(DefaultIcon)`
  animation: ${sunPulse} 4s ease-in-out infinite;
`;

const RainContainer = styled.div`
  position: absolute;
  top: 60%;
  left: 10%;
  width: 80%;
  height: 40%;
  pointer-events: none;
`;

const ThunderOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 195, 0, 0.5);
  border-radius: 50%;
  mix-blend-mode: overlay;
  animation: ${thunderFlash} 5s ease-in-out infinite;
  pointer-events: none;
`;

const MistOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 120%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.3) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: ${mistFloat} 8s ease-in-out infinite;
  pointer-events: none;
`;

const RainDrop = styled.div<{ delay: string; color: string; size: number }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size * 4}px;
  background-color: ${props => props.color};
  border-radius: 50%;
  animation: ${rainDrop} 1.5s linear infinite;
  animation-delay: ${props => props.delay};
  opacity: 0.7;
`;

const SnowFlake = styled.div<{ delay: string; color: string; size: number }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-color: ${props => props.color};
  border-radius: 50%;
  animation: ${snowfall} 2.5s linear infinite;
  animation-delay: ${props => props.delay};
  opacity: 0.8;
`;

const AnimatedWeatherIcon: React.FC<AnimatedWeatherIconProps> = ({ iconCode, size = 100 }) => {
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const particlePositions = useMemo(() => {
    return Array.from({ length: 8 }, () => ({
      left: `${Math.random() * 80 + 10}%`,
      delay: `${Math.random() * 1.5}s`,
      size: Math.random() * 2 + 1.5,
    }));
  }, [iconCode]);

  const getRandomColor = (type: keyof typeof weatherColors) => {
    const colors = weatherColors[type];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const renderAnimationEffects = () => {
    if (iconCode === '01d') {
      return <SunIcon src={iconUrl} alt="Clear sky" />;
    }

    if (iconCode === '01n') {
      return <DefaultIcon src={iconUrl} alt="Clear night" />;
    }

    if (iconCode.includes('09') || iconCode.includes('10')) {
      return (
        <>
          <CloudIcon src={iconUrl} alt="Rain" />
          <RainContainer>
            {particlePositions.map((pos, index) => (
              <RainDrop
                key={index}
                delay={pos.delay}
                color={getRandomColor('rain')}
                size={pos.size}
                style={{ left: pos.left }}
              />
            ))}
          </RainContainer>
        </>
      );
    }

    if (iconCode.includes('13')) {
      return (
        <>
          <CloudIcon src={iconUrl} alt="Snow" />
          <RainContainer>
            {particlePositions.map((pos, index) => (
              <SnowFlake
                key={index}
                delay={pos.delay}
                color={getRandomColor('snow')}
                size={pos.size * 2}
                style={{ left: pos.left }}
              />
            ))}
          </RainContainer>
        </>
      );
    }

    if (iconCode.includes('11')) {
      return (
        <>
          <CloudIcon src={iconUrl} alt="Thunderstorm" />
          <ThunderOverlay />
          <RainContainer>
            {particlePositions.slice(0, 5).map((pos, index) => (
              <RainDrop
                key={index}
                delay={pos.delay}
                color={getRandomColor('rain')}
                size={pos.size * 1.2}
                style={{ left: pos.left }}
              />
            ))}
          </RainContainer>
        </>
      );
    }

    if (iconCode.includes('50')) {
      return (
        <>
          <DefaultIcon src={iconUrl} alt="Mist" />
          <MistOverlay />
        </>
      );
    }

    if (iconCode.includes('02') || iconCode.includes('03') || iconCode.includes('04')) {
      return <CloudIcon src={iconUrl} alt="Clouds" />;
    }

    return <DefaultIcon src={iconUrl} alt="Weather" />;
  };

  return <Container size={size}>{renderAnimationEffects()}</Container>;
};

export default memo(AnimatedWeatherIcon);
(AnimatedWeatherIcon as any).displayName = 'AnimatedWeatherIcon';

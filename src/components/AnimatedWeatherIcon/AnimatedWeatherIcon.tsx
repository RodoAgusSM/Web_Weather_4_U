import React from 'react';
import styled, { keyframes } from 'styled-components';

interface AnimatedWeatherIconProps {
  iconCode: string;
  size?: number;
}

const cloudFloat = keyframes`
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(5px); }
`;

const rainDrop = keyframes`
  0% { transform: translateY(0) scale(1); opacity: 0.7; }
  100% { transform: translateY(15px) scale(0.9); opacity: 0; }
`;

const sunPulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.9; }
`;

const Container = styled.div<{ size: number }>`
  position: relative;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`;

const DefaultIcon = styled.img`
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
`;

const CloudIcon = styled(DefaultIcon)`
  animation: ${cloudFloat} 3s ease-in-out infinite;
`;

const SunIcon = styled(DefaultIcon)`
  animation: ${sunPulse} 3s ease-in-out infinite;
`;

const RainContainer = styled.div`
  position: absolute;
  top: 65%;
  left: 0;
  width: 100%;
  height: 35%;
`;

const RainDrop = styled.div<{ delay: string }>`
  position: absolute;
  width: 2px;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  animation: ${rainDrop} 1.5s linear infinite;
  animation-delay: ${(props) => props.delay};
`;

const AnimatedWeatherIcon: React.FC<AnimatedWeatherIconProps> = ({ iconCode, size = 100 }) => {
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const renderAnimationEffects = () => {
    // Clear
    if (iconCode === '01d' || iconCode === '01n') {
      return <SunIcon src={iconUrl} alt="Weather icon" />;
    }

    // Rain
    if (iconCode.includes('09') || iconCode.includes('10')) {
      return (
        <>
          <CloudIcon src={iconUrl} alt="Weather icon" />
          <RainContainer>
            <RainDrop delay="0s" style={{ left: '20%' }} />
            <RainDrop delay="0.3s" style={{ left: '40%' }} />
            <RainDrop delay="0.6s" style={{ left: '60%' }} />
            <RainDrop delay="0.9s" style={{ left: '80%' }} />
          </RainContainer>
        </>
      );
    }

    // Clouds
    if (iconCode.includes('02') || iconCode.includes('03') || iconCode.includes('04')) {
      return <CloudIcon src={iconUrl} alt="Weather icon" />;
    }

    // Default for any other icons
    return <DefaultIcon src={iconUrl} alt="Weather icon" />;
  };

  return <Container size={size}>{renderAnimationEffects()}</Container>;
};

export default AnimatedWeatherIcon;

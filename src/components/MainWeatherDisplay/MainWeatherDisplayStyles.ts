import styled, { keyframes } from 'styled-components';

const CONTAINER_MAX_WIDTH = '500px';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const MainWeatherDisplayContainer = styled.div<{ $isHovered?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin: 0 auto;
  max-width: ${CONTAINER_MAX_WIDTH};
  width: 100%;
  padding: 0.75rem;
  box-sizing: border-box;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.75), rgba(240, 248, 255, 0.65));
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: ${({ $isHovered }) =>
    $isHovered ? '0 6px 12px rgba(0, 0, 0, 0.15)' : '0 1px 3px rgba(0,0,0,0.08)'};
  transition: all 0.3s ease;
  transform: ${({ $isHovered }) => ($isHovered ? 'translateY(-5px)' : 'translateY(0)')};
  width: 100%;
  margin-bottom: 0.75rem;
  animation: ${fadeIn} 0.5s ease-out forwards;

  @media (max-width: 480px) {
    padding: 0.5rem;
  }

  &:hover {
    animation: pulse 1.5s infinite alternate;
  }

  @keyframes pulse {
    0% {
      transform: translateY(-5px) scale(1);
    }
    100% {
      transform: translateY(-5px) scale(1.02);
    }
  }

  @media (hover: none) {
    &:active {
      transform: scale(0.98);
      transition: transform 0.1s;
    }
  }
`;

export const ColumnsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const DataRowsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
  gap: 5px;
`;

export const IconRowsContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 35%;
`;

export const LocationContainer = styled.div<{
  $isMobile: boolean;
  $isSmallMobile: boolean;
}>`
  font-size: ${(props) => (props.$isSmallMobile ? '18px' : props.$isMobile ? '22px' : '24px')};
  font-weight: 600;
  white-space: ${(props) => (props.$isMobile ? 'normal' : 'nowrap')};
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
`;

export const RealFeelColumnContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const RealFeelContainer = styled.div<{
  $isMobile: boolean;
  $isSmallMobile: boolean;
}>`
  font-size: ${(props) => (props.$isSmallMobile ? '32px' : props.$isMobile ? '38px' : '42px')};
  font-weight: 900;
`;

export const UnitContainer = styled.div<{
  $isMobile: boolean;
  $isSmallMobile: boolean;
}>`
  font-size: ${(props) => (props.$isSmallMobile ? '20px' : props.$isMobile ? '22px' : '26px')};
  font-weight: 700;
  margin-left: 4px;
`;

export const FeelLikeContainer = styled.div<{
  $isMobile: boolean;
}>`
  color: #1976d2;
  font-size: ${(props) => (props.$isMobile ? '13px' : '14px')};
`;

export const DescriptionContainer = styled.div<{
  $isMobile: boolean;
  $isSmallMobile: boolean;
}>`
  font-size: ${(props) => (props.$isSmallMobile ? '15px' : props.$isMobile ? '16px' : '17px')};
  font-weight: 500;
  white-space: ${(props) => (props.$isSmallMobile ? 'normal' : 'nowrap')};
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const WeatherIcon = styled.img<{
  $isMobile: boolean;
  $isSmallMobile: boolean;
}>`
  width: ${(props) => (props.$isSmallMobile ? '4rem' : props.$isMobile ? '4.5rem' : '5rem')};
  height: ${(props) => (props.$isSmallMobile ? '4rem' : props.$isMobile ? '4.5rem' : '5rem')};
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
  backdrop-filter: blur(4px);
  box-shadow: '0 1px 3px rgba(0,0,0,0.08)';
  padding: 0.25rem;
  transition: all 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);

  ${MainWeatherDisplayContainer}:hover & {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

import styled from 'styled-components';
import { ThemeType } from 'styles/theme';

export const MainWeatherDisplayContainer = styled.div<{ theme: ThemeType; $isHovered?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin: 0 auto;
  width: 100%;
  padding: 0.75rem;
  box-sizing: border-box;
  background: ${({ theme }) => theme.cardBackground};
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: ${({ $isHovered }) =>
    $isHovered ? '0 6px 12px rgba(0, 0, 0, 0.15)' : '0 1px 3px rgba(0,0,0,0.08)'};
  transition: all 0.3s ease;
  transform: ${({ $isHovered }) => ($isHovered ? 'translateY(-5px)' : 'translateY(0)')};
  width: 100%;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.5);
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
  font-size: ${props => (props.$isSmallMobile ? '18px' : props.$isMobile ? '22px' : '24px')};
  font-weight: 600;
  white-space: ${props => (props.$isMobile ? 'normal' : 'nowrap')};
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
  color: black;
`;

export const RealFeelColumnContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const RealFeelContainer = styled.div<{
  $isMobile: boolean;
  $isSmallMobile: boolean;
}>`
  font-size: ${props => (props.$isSmallMobile ? '32px' : props.$isMobile ? '38px' : '42px')};
  font-weight: 900;
  color: black;
`;

export const UnitContainer = styled.div<{
  $isMobile: boolean;
  $isSmallMobile: boolean;
}>`
  font-size: ${props => (props.$isSmallMobile ? '20px' : props.$isMobile ? '22px' : '26px')};
  font-weight: 700;
  margin-left: 4px;
  color: black;
`;

export const FeelLikeContainer = styled.div<{
  theme: ThemeType;
  $isHovered: boolean;
  $isMobile: boolean;
}>`
  color: ${props => (props.$isHovered ? props.theme.blueTextHovered : props.theme.blueText)};
  font-size: ${props => (props.$isMobile ? '13px' : '14px')};
`;

export const DescriptionContainer = styled.div<{
  $isMobile: boolean;
  $isSmallMobile: boolean;
}>`
  font-size: ${props => (props.$isSmallMobile ? '15px' : props.$isMobile ? '16px' : '17px')};
  font-weight: 500;
  white-space: ${props => (props.$isSmallMobile ? 'normal' : 'nowrap')};
  overflow: hidden;
  text-overflow: ellipsis;
  color: black;
`;

export const WeatherIcon = styled.img<{
  theme: ThemeType;
  $isMobile: boolean;
  $isSmallMobile: boolean;
}>`
  width: ${props => (props.$isSmallMobile ? '4rem' : props.$isMobile ? '4.5rem' : '5rem')};
  height: ${props => (props.$isSmallMobile ? '4rem' : props.$isMobile ? '4.5rem' : '5rem')};
  border-radius: 50%;
  background: ${({ theme }) => theme.iconBackground};
  box-shadow: '0 1px 3px rgba(0,0,0,0.08)';
  padding: 0.25rem;
  transition: all 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);

  ${MainWeatherDisplayContainer}:hover & {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

import styled from 'styled-components';
import { ThemeType } from 'styles/theme';

export const CardContainer = styled.div<{
  theme: ThemeType;
  $isHovered: boolean;
  $hasInfoButton: boolean;
  $isMobile: boolean;
}>`
  display: flex;
  align-items: center;
  width: 100%;
  height: ${(props) => (props.$isMobile ? '70px' : '80px')};
  border-radius: 8px;
  padding: ${(props) => (props.$isMobile ? '10px' : '14px 16px')};
  box-sizing: border-box;
  gap: ${(props) => (props.$isMobile ? '8px' : '12px')};
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
  min-height: ${(props) => (props.$isMobile ? '70px' : '80px')};
  max-height: ${(props) => (props.$isMobile ? '70px' : '80px')};
  flex: 1;
  min-width: 0;
  margin: 0;
  background: ${({ theme }) => theme.cardBackground};

  &:hover {
    transform: translateY(-3px);
    box-shadow:
      0 8px 20px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.5);
  }
`;

export const IconContainer = styled.div < { theme: ThemeType; $isMobile: boolean } > `
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: ${(props) => (props.$isMobile ? '32px' : '40px')};
  height: ${(props) => (props.$isMobile ? '32px' : '40px')};
  background: ${({ theme }) => theme.iconBackground};
  border-radius: 50%;
  backdrop-filter: blur(4px);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.8);
  padding: 6px;
  transition: all 0.2s ease;
`;

export const CardIcon = styled.img<{ $isMobile: boolean; src: string }>`
  width: ${(props) => (props.$isMobile ? '22px' : '28px')};
  height: ${(props) => (props.$isMobile ? '22px' : '28px')};
  object-fit: contain;
  opacity: 0.85;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.1));
  transition: all 0.3s ease;
  ${CardContainer}:hover & {
    opacity: 1;
    transform: scale(1.05);
  }
`;

export const ContentContainer = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
  gap: ${(props) => (props.$isMobile ? '2px' : '4px')};
  width: 0;
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
`;

export const Label = styled.div<{ theme: ThemeType; $isHovered: boolean; $isMobile: boolean }>`
  font-size: ${(props) => (props.$isMobile ? '0.65rem' : '0.85rem')};
  font-weight: 700;
  color: ${(props) =>
    props.$isHovered ? props.theme.blueTextHovered : props.theme.blueText};
  transition: color 0.2s ease;
  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ValueText = styled.div<{ $isHovered: boolean; $isMobile: boolean }>`
  font-size: ${(props) => (props.$isMobile ? '0.75rem' : '0.95rem')};
  font-weight: 500;
  color: #333;
  transition: color 0.2s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${CardContainer}:hover & {
    color: #1a1a1a;
  }
`;

export const InfoColumnContainer = styled.div<{ $isMobile: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-left: auto;
`;

export const InfoButton = styled.button<{ $isMobile: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.$isMobile ? '20px' : '22px')};
  height: ${(props) => (props.$isMobile ? '20px' : '22px')};
  border-radius: 50%;
  background: linear-gradient(135deg, #1976d2, #2196f3);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 5px rgba(25, 118, 210, 0.3);

  &:hover {
    background: linear-gradient(135deg, #0d47a1, #1976d2);
    transform: scale(1.1);
    box-shadow: 0 3px 7px rgba(25, 118, 210, 0.4);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.4);
  }
`;

export const InfoButtonText = styled.span`
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
`;

export const Card = styled.div<{ $isMobileDevice: boolean; $isHovered: boolean }>`
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  overflow: hidden;
  flex: 1;
  min-width: 0;
  height: ${(props) =>
    props.$isMobileDevice ? '100px' : '120px'};

  ${(props) =>
    props.$isMobileDevice &&
    `
    max-width: 100%;
    min-height: 100px;
    display: flex;
    align-items: stretch;
  `}

  box-sizing: border-box;

  transition: height 0.3s ease, padding 0.3s ease;
`;

export const CardContent = styled.div`
  padding: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;

  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CardLabel = styled.div`
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

export const ValueContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CardValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
  display: flex;
  align-items: baseline;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  span {
    font-size: 0.875rem;
    margin-left: 4px;
    color: rgba(255, 255, 255, 0.7);
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;

    span {
      font-size: 0.75rem;
    }
  }
`;

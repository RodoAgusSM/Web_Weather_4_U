import styled from 'styled-components';

export const CardContainer = styled.div<{ $isHovered: boolean; $hasInfoButton?: boolean }>`
  display: grid;
  grid-template-columns: ${props => props.$hasInfoButton ? '40px 1fr 40px' : '40px 1fr'};
  align-items: center;
  gap: 12px;
  background-color: ${({ $isHovered }) =>
    $isHovered ? 'rgba(174, 214, 241, 0.75)' : 'rgba(174, 214, 241, 0.5)'};
  border-radius: 8px;
  padding: 12px;
  transition: all 0.3s ease;
  box-shadow: ${({ $isHovered }) =>
    $isHovered ? '0 4px 8px rgba(0, 0, 0, 0.1)' : '0 2px 4px rgba(0, 0, 0, 0.05)'};
  border: 1px solid rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(4px);
  
  @media (max-width: 480px) {
    grid-template-columns: ${props => props.$hasInfoButton ? '34px 1fr 34px' : '34px 1fr'};
    gap: 8px;
    padding: 10px;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  flex-shrink: 0;

  @media (max-width: 480px) {
    width: 28px;
    height: 28px;
  }
`;

export const CardIcon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const HeaderContainer = styled.div`
  margin-bottom: 4px;
`;

export const Label = styled.div<{ $isHovered: boolean }>`
  font-size: 0.8rem;
  font-weight: 500;
  color: ${({ $isHovered }) =>
    $isHovered ? '#2C3E50' : '#34495E'};
  transition: color 0.3s ease;
`;

export const ValueText = styled.div<{ $isHovered: boolean }>`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ $isHovered }) =>
    $isHovered ? '#2C3E50' : '#34495E'};
  transition: color 0.3s ease;
`;

export const InfoColumnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const InfoButton = styled.button`
  background: rgba(243, 156, 18, 0.8);
  border: none;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;

  &:hover {
    background: rgba(243, 156, 18, 1);
    transform: scale(1.1);
  }
`;

export const InfoButtonText = styled.span`
  color: white;
  font-size: 0.7rem;
  font-weight: bold;
  font-style: italic;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  line-height: 1;
`;

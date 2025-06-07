import styled from 'styled-components';

export const CardContainer = styled.div<{ $isHovered: boolean; $hasInfoButton?: boolean; $isMobile?: boolean }>`
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
    $isHovered ? '0 6px 12px rgba(0, 0, 0, 0.15)' : '0 2px 4px rgba(0, 0, 0, 0.05)'};
  border: 1px solid rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(4px);
  transform: ${({ $isHovered }) => $isHovered ? 'translateY(-5px)' : 'translateY(0)'};
  
  ${props => props.$isMobile && `
    grid-template-columns: ${props.$hasInfoButton ? '26px 1fr 30px' : '26px 1fr'};
    gap: 5px;
    padding: 6px 8px;
    width: 95%; 
    max-width: 280px;
    height: auto;
    min-height: 65px;
    max-height: 75px;
    margin: 3px auto;
    border-radius: 6px;
  `}
  
  /* Add a subtle pulse animation on hover */
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
`;

export const IconContainer = styled.div<{ $isMobile?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  transition: transform 0.3s ease;

  ${CardContainer}:hover & {
    transform: scale(1.15);
  }

  ${props => props.$isMobile && `
    width: 22px;
    height: 22px;
    min-width: 22px;
    min-height: 22px;
    margin-right: 2px;
  `}
`;

export const CardIcon = styled.img<{ $isMobile?: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: contain;
  
  ${props => props.$isMobile && `
    max-width: 20px;
    max-height: 20px;
  `}
`;

export const ContentContainer = styled.div<{ $isMobile?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  ${props => props.$isMobile && `
    width: 100%;
    overflow: hidden;
    padding-left: 0;
  `}
`;

export const HeaderContainer = styled.div`
  margin-bottom: 4px;
  
  @media (max-width: 480px) {
    margin-bottom: 2px;
  }
`;

export const Label = styled.div<{ $isHovered: boolean; $isMobile?: boolean }>`
  font-size: 0.8rem;
  font-weight: 500;
  color: ${({ $isHovered }) =>
    $isHovered ? '#2C3E50' : '#34495E'};
  transition: color 0.3s ease;
  
  ${CardContainer}:hover & {
    color: #2C3E50;
    text-shadow: 0 1px 1px rgba(255, 255, 255, 0.5);
  }
  
  ${props => props.$isMobile && `
    font-size: 0.65rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 0;
  `}
`;

export const ValueText = styled.div<{ $isHovered: boolean; $isMobile?: boolean }>`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ $isHovered }) =>
    $isHovered ? '#2C3E50' : '#34495E'};
  transition: color 0.3s ease, transform 0.3s ease;
  
  ${CardContainer}:hover & {
    color: #2C3E50;
    transform: scale(1.05);
    transform-origin: left center;
  }
  
  ${props => props.$isMobile && `
    font-size: 0.8rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
  
  ${CardContainer}:hover & {
    animation: wiggle 1s ease-in-out infinite;
  }
  
  @keyframes wiggle {
    0%, 100% { transform: rotate(0); }
    25% { transform: rotate(-10deg); }
    75% { transform: rotate(10deg); }
  }
`;

export const InfoColumnContainer = styled.div<{ $isMobile?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  
  ${props => props.$isMobile && `
    width: 100%;
    max-width: 26px;
    margin-left: -2px;
  `}
`;

export const InfoButton = styled.button<{ $isMobile?: boolean }>`
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
    transform: scale(1.2) rotate(10deg);
  }
  
  ${CardContainer}:hover & {
    animation: wiggle 1s ease-in-out infinite;
  }
  
  @keyframes wiggle {
    0%, 100% { transform: rotate(0); }
    25% { transform: rotate(-10deg); }
    75% { transform: rotate(10deg); }
  }
  
  ${props => props.$isMobile && `
    width: 18px;
    height: 18px;
  `}
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
  
  @media (max-width: 480px) {
    font-size: 0.6rem;
  }
`;

export const Card = styled.div<{ $isMobileDevice: boolean, $isHovered: boolean; }>`
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  overflow: hidden;
  flex: 1;
  min-width: 0; /* Allow cards to shrink below content size */
  height: ${props => props.$isMobileDevice ? '100px' : '120px'}; /* Fixed height for consistency */
  
  /* Add these properties for more consistent sizing on mobile */
  ${props => props.$isMobileDevice && `
    max-width: 100%;
    min-height: 100px;
    display: flex;
    align-items: stretch;
  `}
  
  /* Ensure all cards have the same dimensions */
  box-sizing: border-box;
  
  /* Add transition for smooth resizing */
  transition: height 0.3s ease, padding 0.3s ease;
`;

export const CardContent = styled.div`
  padding: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  
  /* Prevent content from overflowing */
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

import styled, { css, keyframes } from 'styled-components';

// Shimmer animation effect
const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

// Base skeleton styling - fixed by using css helper
const skeletonBase = css`
  background: linear-gradient(90deg, 
    rgba(155, 210, 230, 0.6) 25%, 
    rgba(155, 210, 230, 0.9) 50%, 
    rgba(155, 210, 230, 0.6) 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
`;

export const CardContainer = styled.div<{ $hasInfoButton?: boolean }>`
  display: grid;
  grid-template-columns: ${props => props.$hasInfoButton ? '40px 1fr 40px' : '40px 1fr'};
  align-items: center;
  gap: 12px;
  background-color: rgba(174, 214, 241, 0.3);
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(4px);
  
  @media (max-width: 480px) {
    grid-template-columns: ${props => props.$hasInfoButton ? '34px 1fr 34px' : '34px 1fr'};
    gap: 8px;
    padding: 10px;
  }
  
  &.info-button {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    ${skeletonBase}
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
  
  &.info-button {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    ${skeletonBase}
  }
`;

export const SkeletonIcon = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  ${skeletonBase}
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

export const HeaderContainer = styled.div`
  margin-bottom: 8px;
  width: 100%;
`;

export const SkeletonLabel = styled.div`
  height: 12px;
  width: 60%;
  ${skeletonBase}
  margin-bottom: 4px;
`;

export const SkeletonValue = styled.div`
  height: 16px;
  width: 80%;
  ${skeletonBase}
`;

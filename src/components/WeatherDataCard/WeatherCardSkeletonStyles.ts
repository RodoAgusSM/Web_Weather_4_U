import { skeletonBase } from 'components/Skeleton';
import styled from 'styled-components';

export const CardContainer = styled.div<{ $hasInfoButton?: boolean }>`
  display: grid;
  grid-template-columns: ${(props) => (props.$hasInfoButton ? '48px 1fr 20px' : '48px 1fr')};
  align-items: center;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(245, 250, 255, 0.98));
  border-radius: 10px;
  padding: 14px;
  box-shadow: 0 6px 18px rgba(12, 60, 90, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(4px);

  @media (max-width: 480px) {
    grid-template-columns: ${(props) => (props.$hasInfoButton ? '40px 1fr 34px' : '40px 1fr')};
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
  width: 65%;
  ${skeletonBase}
  margin-bottom: 4px;
`;

export const SkeletonValue = styled.div`
  height: 16px;
  width: 45%;
  ${skeletonBase}
`;

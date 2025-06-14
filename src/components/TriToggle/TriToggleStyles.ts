import styled from 'styled-components';
import { ThemeType } from 'styles/theme';

export const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const ToggleWrapper = styled.div<{ theme: ThemeType }>`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 8px;
  padding: 4px;
  gap: 4px;
  display: flex;
  position: relative;
  width: fit-content;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.2s ease;
  margin: 0 auto;
  z-index: 1;
  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    border-color: rgba(255, 255, 255, 0.4);
  }
`;

export const ToggleButton = styled.button<{ $isActive: boolean; $isMobile: boolean }>`
  background: ${({ $isActive }) => ($isActive ? 'rgba(255, 255, 255, 0.9)' : 'transparent')};
  color: ${({ $isActive }) => ($isActive ? '#3498db' : 'rgba(255, 255, 255, 0.8)')};
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: ${(props) => (props.$isMobile ? '0.7rem' : '0.8rem')};
  font-weight: ${({ $isActive }) => ($isActive ? '600' : '400')};
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 2;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  &:hover {
    background: ${(props) =>
    props.$isActive ? '#4a8ed3' : 'rgba(255, 255, 255, 0.5)'};
  }

  &:focus {
    outline: none;
  }
`;

export const IconContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

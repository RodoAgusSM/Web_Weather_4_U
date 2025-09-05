import styled, { css, keyframes } from 'styled-components';
import { ThemeType } from 'styles/theme';

const menuFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(5px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const menuFadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(5px) scale(0.98);
  }
`;

const itemFadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const itemFadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
  user-select: none;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:focus-within {
    transform: translateY(-2px);
  }

  * {
    box-sizing: border-box;
  }

  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.05));
`;

export const DropdownHeader = styled.div<{ theme: ThemeType }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8);
  width: 100%;
  box-sizing: border-box;
  min-width: 150px;
  background: ${({ theme }) => theme.dropdownBackground};

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    border-color: rgba(255, 255, 255, 0.4);
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.85), rgba(240, 248, 255, 0.7));
  }

  &:focus {
    transform: scale(1.02);
    outline: none;
  }

  color: #1976d2;
`;

export const DropdownSelected = styled.div<{ $isMobile: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 600;
  color: #1976d2;
  font-size: 0.95rem;
  width: 100%;
  text-align: center;
  padding-right: 16px;
  font-size: ${props => (props.$isMobile ? '0.8rem' : '0.85rem')};
  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.5);
`;

export const DropdownIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1976d2;
`;

export const DropdownPlaceholder = styled.div`
  color: #5a95c9;
  font-size: 0.95rem;
  font-weight: 400;
  width: 100%;
  text-align: center;
  padding-right: 16px;
`;

export const DropdownArrow = styled.span<{ $isOpen: boolean }>`
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  font-size: 0.7em;
  color: #1976d2;
  transform: ${props => (props.$isOpen ? 'rotate(180deg)' : 'rotate(0)')};
  opacity: 0.8;
  position: absolute;
  right: 16px;
`;

export const DropdownMenu = styled.ul<{ theme: ThemeType; $isClosing?: boolean }>`
  position: absolute;
  bottom: calc(100% + 8px);
  left: 0;
  margin: 0;
  padding: 6px 10px 6px 6px;
  list-style: none;
  background: ${({ theme }) => theme.dropdownBackground};
  border-radius: 8px;
  max-height: 240px;
  overflow-y: auto;
  z-index: 2;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transform-origin: bottom center;
  box-sizing: border-box;
  width: 100%;
  min-width: 150px;

  animation: ${props =>
    props.$isClosing
      ? css`
          ${menuFadeOut} 0.2s ease forwards
        `
      : css`
          ${menuFadeIn} 0.2s ease forwards
        `};

  animation-delay: ${props => (props.$isClosing ? '0.3s' : '0s')};

  &:before {
    content: '';
    display: block;
    height: 0;
    width: 0;
  }

  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(180, 180, 180, 0.5);
    border-radius: 3px;
  }
`;

export const DropdownMenuItem = styled.li<{
  $index?: number;
  $isClosing?: boolean;
  $totalItems?: number;
  $isActive?: boolean;
  $isMobile: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 10px;
  margin-bottom: 2px;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  background: ${props => (props.$isActive ? 'rgba(25, 118, 210, 0.15)' : 'transparent')};
  font-size: ${props => (props.$isMobile ? '0.8rem' : '0.85rem')};
  color: #1976d2;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  opacity: 0;
  border-bottom: 1px solid rgba(230, 240, 255, 0.4);

  animation: ${props => {
    if (!props.$isClosing) {
      const delay = (props.$index || 0) * 70 + 50;
      return css`
        ${itemFadeIn} 0.3s ease forwards ${delay}ms
      `;
    } else {
      const totalItems = props.$totalItems || 1;
      const index = props.$index || 0;
      const reversedIndex = totalItems - index - 1;
      const delay = reversedIndex * 50;
      return css`
        ${itemFadeOut} 0.3s ease forwards ${delay}ms
      `;
    }
  }};

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }

  &:hover {
    background: linear-gradient(to right, rgba(25, 118, 210, 0.1), rgba(25, 118, 210, 0.05));
    color: #0d47a1;
    font-weight: 500;
    transform: translateY(-1px);
  }

  &:active {
    background: rgba(25, 118, 210, 0.2);
    transform: scale(0.97);
  }
`;

export const StyledIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(25, 118, 210, 0.1);
  margin-right: 8px;
  padding: 4px;
`;

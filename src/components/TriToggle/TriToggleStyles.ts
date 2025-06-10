import styled from 'styled-components';

export const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const ToggleWrapper = styled.div`
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.75), rgba(240, 248, 255, 0.65));
  border-radius: 8px;
  padding: 4px;
  gap: 4px;
  display: flex;
  position: relative;
  width: fit-content;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.2s ease;

  /* Match the card style of the weather data panels */
  margin: 0 auto;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    border-color: rgba(255, 255, 255, 0.4);
  }
`;

export const ToggleButton = styled.button<{ $isActive: boolean }>`
  background: ${({ $isActive }) => ($isActive ? 'rgba(255, 255, 255, 0.9)' : 'transparent')};
  color: ${({ $isActive }) => ($isActive ? '#3498db' : 'rgba(255, 255, 255, 0.8)')};
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 14px;
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

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

export const ToggleIcon = styled.span<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 6px;

  img {
    width: 18px;
    height: 18px;
    object-fit: contain;
    transition: all 0.2s ease;
    filter: ${(props) => (props.$isActive ? 'brightness(0) invert(1)' : 'none')};
    opacity: ${(props) => (props.$isActive ? 1 : 0.7)};
  }

  svg {
    width: 18px;
    height: 18px;
    transition: all 0.2s ease;
    fill: ${(props) => (props.$isActive ? 'white' : '#1976d2')};
    opacity: ${(props) => (props.$isActive ? 1 : 0.7)};
  }
`;

export const ToggleOption = styled.button<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  background: ${(props) => (props.$isActive ? '#4a8ed3' : 'transparent')};
  color: ${(props) => (props.$isActive ? 'white' : '#1976d2')};
  font-size: 0.95rem;
  font-weight: ${(props) => (props.$isActive ? '600' : '500')};
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  z-index: 1;
  outline: none;
  min-width: 100px;
  text-align: center;
  box-shadow: ${(props) => (props.$isActive ? '0 2px 8px rgba(25, 118, 210, 0.3)' : 'none')};
  text-shadow: ${(props) => (props.$isActive ? '0 1px 1px rgba(0, 0, 0, 0.1)' : 'none')};
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  &:hover {
    background: ${(props) =>
    props.$isActive ? '#4a8ed3' : 'rgba(255, 255, 255, 0.5)'};
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.4);
  }

  &:active {
    transform: ${(props) => (props.$isActive ? 'none' : 'scale(0.97)')};
  }
`;

// New component to position the toggle better in the layout
export const ToggleContainerCentered = styled(ToggleContainer)`
  margin: 20px auto 25px;
  max-width: 320px;
  position: relative;
  
  /* Add subtle highlight effect */
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: -10px;
    left: 0;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.6),
      transparent
    );
  }
`;

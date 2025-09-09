import React, { memo } from 'react';

import { useTheme } from '../../../context/ThemeContext';
import { darkTheme, lightTheme } from '../../../styles/theme';
import useResponsiveDesign from '../../hooks/useResponsiveDesign';

import { ToggleContainer, ToggleIcon, ToggleOption, ToggleWrapper } from './ToggleStyles';

export interface ToggleItem {
  id: string;
  label: string;
  value: any;
  icon?: React.ReactNode;
}

interface ToggleProps {
  items: ToggleItem[];
  selectedValue: string;
  onChange: (value: any) => void;
  className?: string;
}

const Toggle: React.FC<ToggleProps> = ({ items, selectedValue, onChange, className = '' }) => {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;
  const responsiveInfo = useResponsiveDesign();

  if (items.length < 2) {
    console.warn('Toggle component requires at least 2 items');
    return null;
  }

  return (
    <ToggleContainer className={className}>
      <ToggleWrapper theme={theme}>
        {items.map(item => (
          <ToggleOption
            key={item.id}
            $isActive={selectedValue === item.value}
            onClick={() => onChange(item.value)}
            aria-pressed={selectedValue === item.value}
            tabIndex={0}
            role="switch"
            aria-checked={selectedValue === item.value}
            aria-label={`Select ${item.label}`}
            $isMobile={responsiveInfo.isMobileDevice}>
            {item.icon && (
              <ToggleIcon $isActive={selectedValue === item.value}>{item.icon}</ToggleIcon>
            )}
            {item.label}
          </ToggleOption>
        ))}
      </ToggleWrapper>
    </ToggleContainer>
  );
};

export default memo(Toggle);
(Toggle as any).displayName = 'Toggle';

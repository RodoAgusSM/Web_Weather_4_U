import React, { memo, ReactNode } from 'react';
import useResponsiveDesign from 'hooks/useResponsiveDesign';

import { useTheme } from '../../context/ThemeContext';
import { darkTheme, lightTheme } from '../../styles/theme';

import { IconContainer, ToggleButton, ToggleContainer, ToggleWrapper } from './TriToggleStyles';

interface ToggleItem {
  id: string;
  label?: string;
  icon?: ReactNode;
  value: any;
}

interface TriToggleProps {
  items: ToggleItem[];
  selectedValue: any;
  onChange: (value: any) => void;
}

const TriToggle: React.FC<TriToggleProps> = ({ items, selectedValue, onChange }) => {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;
  const responsiveInfo = useResponsiveDesign();

  if (!items || items.length !== 3) {
    console.error('TriToggle requires exactly three items');
    return null;
  }

  return (
    <ToggleContainer>
      <ToggleWrapper theme={theme}>
        {items.map(item => (
          <ToggleButton
            key={item.id}
            $isActive={selectedValue === item.value}
            onClick={() => onChange(item.value)}
            $isMobile={responsiveInfo.isMobileDevice}>
            {item.icon && <IconContainer>{item.icon}</IconContainer>}
            {item.label}
          </ToggleButton>
        ))}
      </ToggleWrapper>
    </ToggleContainer>
  );
};

export default memo(TriToggle);

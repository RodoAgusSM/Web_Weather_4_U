import React, { ReactNode } from 'react';

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
  if (!items || items.length !== 3) {
    console.error('TriToggle requires exactly three items');
    return null;
  }

  return (
    <ToggleContainer>
      <ToggleWrapper>
        {items.map((item) => (
          <ToggleButton
            key={item.id}
            $isActive={selectedValue === item.value}
            onClick={() => onChange(item.value)}
          >
            {item.icon && <IconContainer>{item.icon}</IconContainer>}
            {item.label}
          </ToggleButton>
        ))}
      </ToggleWrapper>
    </ToggleContainer>
  );
};

export default TriToggle;

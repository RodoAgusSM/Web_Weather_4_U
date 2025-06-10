import React, { useState } from 'react';

import { Dropdown, DropdownItem } from './Dropdown';

// Example with simple string values
const ExampleStringDropdown: React.FC = () => {
  const [selected, setSelected] = useState<DropdownItem<string> | undefined>();
  
  const items: DropdownItem<string>[] = [
    { id: 1, value: 'option1', label: 'Option 1' },
    { id: 2, value: 'option2', label: 'Option 2' },
    { id: 3, value: 'option3', label: 'Option 3' },
  ];
  
  return (
    <Dropdown 
      items={items}
      defaultValue={items[0]}
      selectedValue={selected}
      onSelect={setSelected}
      placeholder="Select an option"
    />
  );
};

// Example with complex object values and icons
interface WeatherType {
  type: string;
  temperature: number;
}

const ExampleWeatherDropdown: React.FC = () => {
  const [selected, setSelected] = useState<DropdownItem<WeatherType> | undefined>();
  
  const weatherItems: DropdownItem<WeatherType>[] = [
    { 
      id: 1, 
      value: { type: 'sunny', temperature: 25 }, 
      label: 'Sunny (25°C)', 
    },
    { 
      id: 2, 
      value: { type: 'cloudy', temperature: 18 }, 
      label: 'Cloudy (18°C)',
    },
    { 
      id: 3, 
      value: { type: 'rainy', temperature: 15 }, 
      label: 'Rainy (15°C)', 
    },
    { 
      id: 4, 
      value: { type: 'snowy', temperature: -2 }, 
      label: 'Snowy (-2°C)', 
    },
  ];
  
  return (
    <Dropdown 
      items={weatherItems}
      defaultValue={weatherItems[0]}
      selectedValue={selected}
      onSelect={setSelected}
      placeholder="Select weather"
    />
  );
};

export { ExampleStringDropdown, ExampleWeatherDropdown };

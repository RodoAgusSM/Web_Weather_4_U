import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import useResponsiveDesign from 'hooks/useResponsiveDesign';

import { useTheme } from '../../context/ThemeContext';
import { darkTheme, lightTheme } from '../../styles/theme';

import {
  DropdownArrow,
  DropdownContainer,
  DropdownHeader,
  DropdownIcon,
  DropdownMenu,
  DropdownMenuItem,
  DropdownPlaceholder,
  DropdownSelected,
} from './DropdownStyles';

export interface DropdownItem<T> {
  id: string | number;
  value: T;
  label: string;
  icon?: React.ReactNode;
}

interface DropdownProps<T> {
  items: DropdownItem<T>[];
  defaultValue?: DropdownItem<T>;
  selectedValue?: DropdownItem<T>;
  onSelect: (item: DropdownItem<T>) => void;
  placeholder?: string;
  className?: string;
}

export const Dropdown = <T,>({
  items,
  defaultValue,
  selectedValue,
  onSelect,
  placeholder = 'Select an option',
  className = '',
}: DropdownProps<T>) => {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;
  const responsiveInfo = useResponsiveDesign();

  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const displayValue = selectedValue || defaultValue;

  const CLOSING_DURATION = Math.max(300, items.length * 50 + 200);

  const toggleDropdown = () => {
    if (isOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, CLOSING_DURATION);
    } else {
      setIsOpen(true);
    }
  };

  const handleItemClick = (item: DropdownItem<T>) => {
    onSelect(item);
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, CLOSING_DURATION);
  };

  useEffect(() => {
    if (isOpen && menuRef.current && dropdownRef.current) {
      const headerElement = dropdownRef.current.querySelector('div');
      const headerRect = headerElement?.getBoundingClientRect();
      const menuRect = menuRef.current.getBoundingClientRect();

      if (headerRect) {
        menuRef.current.style.width = `${headerRect.width}px`;
      }

      if (menuRect.top < 0) {
        menuRef.current.style.bottom = 'auto';
        menuRef.current.style.top = 'calc(100% + 8px)';
        menuRef.current.style.transformOrigin = 'top center';
      } else {
        menuRef.current.style.top = 'auto';
        menuRef.current.style.bottom = 'calc(100% + 8px)';
        menuRef.current.style.transformOrigin = 'bottom center';
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && isOpen) {
        setIsClosing(true);
        setTimeout(() => {
          setIsOpen(false);
          setIsClosing(false);
        }, CLOSING_DURATION);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const isItemActive = useCallback(
    (item: DropdownItem<T>) => {
      return displayValue?.id === item.id;
    },
    [displayValue],
  );

  return (
    <DropdownContainer className={className} ref={dropdownRef}>
      <DropdownHeader
        theme={theme}
        onClick={toggleDropdown}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            toggleDropdown();
            e.preventDefault();
          } else if (e.key === 'Escape' && isOpen) {
            setIsOpen(false);
            e.preventDefault();
          }
        }}>
        {displayValue ? (
          <DropdownSelected $isMobile={responsiveInfo.isMobileDevice}>
            {displayValue.icon && <DropdownIcon>{displayValue.icon}</DropdownIcon>}
            {displayValue.label}
          </DropdownSelected>
        ) : (
          <DropdownPlaceholder>{placeholder}</DropdownPlaceholder>
        )}
        <DropdownArrow $isOpen={isOpen}>▼</DropdownArrow>
      </DropdownHeader>
      {(isOpen || isClosing) && (
        <DropdownMenu theme={theme} role="listbox" ref={menuRef} $isClosing={isClosing}>
          {items.map((item, index) => (
            <DropdownMenuItem
              key={item.id}
              onClick={() => handleItemClick(item)}
              role="option"
              aria-selected={isItemActive(item)}
              tabIndex={0}
              $index={index}
              $isClosing={isClosing}
              $totalItems={items.length}
              $isActive={isItemActive(item)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleItemClick(item);
                  e.preventDefault();
                }
              }}
              $isMobile={responsiveInfo.isMobileDevice}>
              {item.icon && <DropdownIcon>{item.icon}</DropdownIcon>}
              {item.label}

              {isItemActive(item) && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginLeft: '4px' }}>
                  <path
                    d="M13.3334 4L6.00008 11.3333L2.66675 8"
                    stroke="#1976d2"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

export default memo(Dropdown);

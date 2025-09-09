/* eslint-disable simple-import-sort/imports */
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import useIOSThemeOptimizations from '../presentation/hooks/useIOSThemeOptimizations';

import { darkTheme, lightTheme } from '../styles/theme';

import {
  enforceIOSBackgroundConsistency,
  setupIOSThemeOptimizations,
  updateThemeColors,
} from '../utils/themeUtils';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const savedMode = localStorage.getItem('themeMode');
    return (savedMode as ThemeMode) || 'system';
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Setup iOS optimizations on mount
  useEffect(() => {
    setupIOSThemeOptimizations();
  }, []);

  // Use iOS-specific theme optimizations
  useIOSThemeOptimizations(isDarkMode);

  useEffect(() => {
    localStorage.setItem('themeMode', mode);

    if (mode === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      setIsDarkMode(mode === 'dark');
    }
  }, [mode]);

  // Update theme colors whenever dark mode changes
  useEffect(() => {
    updateThemeColors(isDarkMode);
    enforceIOSBackgroundConsistency(isDarkMode);
  }, [isDarkMode]);

  const appliedTheme = isDarkMode
    ? { ...(darkTheme as any), mode: 'dark' }
    : { ...(lightTheme as any), mode: 'light' };

  return (
    <ThemeContext.Provider value={{ mode, setMode, isDarkMode }}>
      <StyledThemeProvider theme={appliedTheme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

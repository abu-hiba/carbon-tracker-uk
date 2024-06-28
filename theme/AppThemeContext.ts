import React from "react";

export type ThemeOptions = 'light' | 'dark' | 'system';
export type ThemeMode = Exclude<ThemeOptions, 'system'>;
export type Theme = { mode: ThemeMode, isSystem: boolean };

type AppTheme = { theme: Theme, setAppTheme: (newTheme: ThemeOptions) => void };

export const AppThemeContext = React.createContext<AppTheme>({
  theme: { mode: 'light', isSystem: false },
  setAppTheme: () => {}
});


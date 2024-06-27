import React from "react";

export type ThemeOptions = 'light' | 'dark' | 'system';
export type Theme = 'light' | 'dark';
type AppTheme = { theme: Theme, setAppTheme: (newTheme: ThemeOptions) => void };
export const AppThemeContext = React.createContext<AppTheme>({ theme: 'light', setAppTheme: () => {} });


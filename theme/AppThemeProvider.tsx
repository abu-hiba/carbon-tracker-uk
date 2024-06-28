import React from "react";
import { AppThemeContext, Theme, ThemeMode, ThemeOptions } from "./AppThemeContext";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<Theme>({ mode: 'light', isSystem: false });
  const systemTheme = useColorScheme();

  React.useEffect(() => {
    const getTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme === 'system' || !savedTheme) {
          setTheme({ mode: systemTheme === 'dark' ? 'dark' : 'light', isSystem: true });
        } else {
          setTheme({ mode: savedTheme as ThemeMode, isSystem: false });
        }
      } catch (error) {
        console.error(error);
      }
    };
    getTheme();
  }, [theme.mode, systemTheme]);

  const setAppTheme = (newTheme: ThemeOptions) => {
    try {
      if (newTheme === 'system') {
        setTheme({ mode: systemTheme === 'dark' ? 'dark' : 'light', isSystem: true });
      } else {
        setTheme({ mode: newTheme, isSystem: false });
      }
      AsyncStorage.setItem('theme', newTheme);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppThemeContext.Provider value={{ theme, setAppTheme }}>
      {children}
    </AppThemeContext.Provider>
  
  );
}


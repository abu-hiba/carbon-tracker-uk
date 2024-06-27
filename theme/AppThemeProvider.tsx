import React from "react";
import { AppThemeContext, Theme, ThemeOptions } from "./AppThemeContext";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<Theme>('light');
  const systemTheme = useColorScheme();

  React.useEffect(() => {
    const getTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme === 'system' || !savedTheme) {
          setTheme(systemTheme === 'dark' ? 'dark' : 'light');
        } else {
          setTheme(savedTheme as Theme);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getTheme();
  }, [theme, systemTheme]);

  const setAppTheme = (newTheme: ThemeOptions) => {
    try {
      if (newTheme === 'system') {
        setTheme(systemTheme === 'dark' ? 'dark' : 'light');
      } else {
        setTheme(newTheme);
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


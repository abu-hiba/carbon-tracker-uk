import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// type Theme = 'light' | 'dark' | 'system';
type Theme = 'light' | 'dark';
type AppTheme = { theme: Theme, setAppTheme: (newTheme: Theme) => void };
export const AppThemeContext = React.createContext<AppTheme>({ theme: 'light', setAppTheme: () => {} });

function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<Theme>('light');

  React.useEffect(() => {
    console.log('AppThemeProvider: theme:', theme);
  }, [theme]);

  React.useEffect(() => {
    const getTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme) {
          setTheme(savedTheme as Theme);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getTheme();
  }, [theme]);

  //const getTheme = async () => {
  //  return theme;
  //  try {
  //    const savedTheme = await AsyncStorage.getItem('theme');
  //    if (savedTheme) {
  //      return savedTheme;
  //    }
  //  } catch (error) {
  //    console.error(error);
  //  }
  //  return 'light';
  //};

  const setAppTheme = (newTheme: Theme) => {
    try {
      setTheme(newTheme);
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

function App() {
  const { theme: appTheme } = React.useContext(AppThemeContext);
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={appTheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
};

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <App />
    </AppThemeProvider>
  );
}


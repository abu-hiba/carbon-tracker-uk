import React from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { AppThemeContext } from '@/theme/AppThemeContext';
import { AppThemeProvider } from '@/theme/AppThemeProvider';

function App() {
  const { theme: appTheme } = React.useContext(AppThemeContext);

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


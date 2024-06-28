import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { AppThemeContext, type ThemeOptions } from "@/theme/AppThemeContext";
import { FlatList, ListRenderItemInfo, StyleSheet } from "react-native";
import { ThemeItem } from "./ThemeItem";

// TODO: use theme type enum
const options = [
  { theme: 'light', description: 'Always use light theme', title: 'Light' },
  { theme: 'dark', description: 'Always use dark theme', title: 'Dark' },
  { theme: 'system', description: 'Use device settings', title: 'System' },
];

export function ThemeScreen() {
  const { theme, setAppTheme } = React.useContext(AppThemeContext)
  const [activeTheme, setActiveTheme] = React.useState<ThemeOptions>(theme.mode);

  React.useEffect(() => {
    if (theme.isSystem) {
      setActiveTheme('system');
    } else {
      setActiveTheme(theme.mode);
    }
  }, [theme])

  const selectTheme = (newTheme: ThemeOptions) => () => {
    setAppTheme(newTheme);
  };

  const handleRenderItem = ({ item }: ListRenderItemInfo<any>) => (
    <ThemeItem
      name={item.title}
      onPress={selectTheme(item.theme as ThemeOptions)}
      active={activeTheme === item.theme}
      description={item.description}
    />
  );

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={options}
        renderItem={handleRenderItem}
        keyExtractor={(item) => item.theme}
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

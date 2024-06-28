import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { AppThemeContext, type ThemeOptions } from "@/theme/AppThemeContext";
import { FlatList, ListRenderItemInfo, Pressable, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

// TODO: use theme type enum
const options = [
  { theme: 'light', description: 'Always use light theme', title: 'Light' },
  { theme: 'dark', description: 'Always use dark theme', title: 'Dark' },
  { theme: 'system', description: 'Use device settings', title: 'System' },
];

type ThemeItemProps = {
  name: string,
  onPress: () => void,
  active: boolean,
  description?: string,
};

function ThemeItem({ name, onPress, active, description }: ThemeItemProps) {
  const tintColor = useThemeColor({}, 'activeListItem');
  const secondaryTextColor = useThemeColor({}, 'secondaryText');

  return (
    <Pressable onPress={onPress}>
      <ThemedView style={[styles.themeItem, active && { ...styles.activeThemeItem, backgroundColor: tintColor }]}>
        <ThemedText>{name}</ThemedText>
        <ThemedText style={[styles.themeItemDescription, { color: secondaryTextColor }]}>{description}</ThemedText>
      </ThemedView>
    </Pressable>
  )
}

export default function Theme() {
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
  themeItem: {
    padding: 16,
    marginBottom: 16,
  },
  themeItemDescription: {
    fontSize: 14,
  },
  activeThemeItem: {
    borderRadius: 8,
  },
});

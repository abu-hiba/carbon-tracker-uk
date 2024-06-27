import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { AppThemeContext } from "@/theme/AppThemeContext";
import { useContext } from "react";
import { Pressable, StyleSheet } from "react-native";

export default function SettingsScreen() {
    const { setAppTheme } = useContext(AppThemeContext)
  
    return (
        <ThemedView style={styles.container}>
            <ThemedText>Settings</ThemedText>

            <Pressable style={styles.themeButton} onPress={() => { console.log('light'); setAppTheme('light') }}>
              <ThemedText>Light Theme</ThemedText>
            </Pressable>

            <Pressable style={styles.themeButton} onPress={() => { console.log('dark'); setAppTheme('dark') }}>
              <ThemedText>Dark Theme</ThemedText>
            </Pressable>

            <Pressable style={styles.themeButton} onPress={() => { console.log('system'); setAppTheme('system') }}>
              <ThemedText>System Theme</ThemedText>
            </Pressable>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeButton: {
    margin: 10,
  },
});

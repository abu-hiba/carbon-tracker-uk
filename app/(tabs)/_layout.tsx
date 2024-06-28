import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="(home)" options={{ tabBarLabel: "Home", tabBarIcon: () => <></> }} />
      <Tabs.Screen name="region" options={{ tabBarLabel: "Region", tabBarIcon: () => <></> }} />
    </Tabs>
  );
}


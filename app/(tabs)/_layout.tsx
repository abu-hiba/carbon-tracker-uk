import { useThemeColor } from '@/hooks/useThemeColor';
import { TabBarIcon } from '@/tabBar/TabBarIcon';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  const tabBarActiveTintColor = useThemeColor({}, 'tabIconSelected');

  return (
    <Tabs screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarActiveTintColor }}>
      <Tabs.Screen name="index" options={{ tabBarIcon: TabBarIcon('home-sharp') }} />
      <Tabs.Screen name="region" options={{ tabBarIcon: TabBarIcon('map') }} />
    </Tabs>
  );
}


import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link, useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();

  return (
    <ThemedView style={styles.container}>
      <ThemedText>Details of user: {id}</ThemedText>
        <Link href="about">
          <ThemedText>About page</ThemedText>
        </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


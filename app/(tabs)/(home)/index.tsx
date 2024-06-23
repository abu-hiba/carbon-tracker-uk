import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function HomeScreen() {
    return (
        <ThemedView style={styles.container}>
            <ThemedText>Home</ThemedText>
            {[1000, 1001, 1002, 1003, 1004, 1005].map(id => (
                <Link
                    href={{
                        pathname: "/details/[id]",
                        params: { id }
                    }}
                    key={id}>
                    <ThemedText>ThemedView user {id} details</ThemedText>
                </Link>
            ))}
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


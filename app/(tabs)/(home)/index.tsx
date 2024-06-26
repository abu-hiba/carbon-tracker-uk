import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
//import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

type CarbonIntensityData = {
    data: {
        from: string;
        to: string;
        intensity: {
            forecast: number;
            actual: number | null;
            index: string;
        };
    }[];
};

export default function HomeScreen() {
    const [carbonIntensityData, setCarbonIntensityData] = useState<CarbonIntensityData>();
    const [error, setError] = useState<Error>();
    const [loading, setLoading] = useState(true);

    const getCarbonIntensity = async () => {
        try {
            const response = await fetch('https://api.carbonintensity.org.uk/intensity');
            const data = await response.json();
            setCarbonIntensityData(data);
        } catch (error: any) {
            console.error('Error fetching data: ', error);
            if (error instanceof Error) setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        (async () => {
            await getCarbonIntensity();
        })();
    }, []);

    const displayIntensity = (intensity: number | null): string => {
        if (intensity === null) {
            return 'Not available';
        }
        return `${intensity} gCO2/kWh`; 
    };

    return (
        <ThemedView style={styles.container}>
            {loading && <ThemedText>Loading...</ThemedText>}

            {error && <ThemedText>Error: {error.message}</ThemedText>}

            {carbonIntensityData && (
                <ThemedView>
                    <ThemedText>Carbon Intensity</ThemedText>
                    <ThemedText>Actual: {displayIntensity(carbonIntensityData.data[0].intensity.actual)}</ThemedText>
                    <ThemedText>Forecast: {displayIntensity(carbonIntensityData.data[0].intensity.forecast)}</ThemedText>
                </ThemedView>
            )}

            {/*
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
            */}
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


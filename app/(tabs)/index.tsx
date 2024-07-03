import { ThemedScrollView } from '@/components/ThemedScrollView';
import { ThemedText } from '@/components/ThemedText';
import { CarbonIntensityData, carbonIntensityAPI } from '@/services/carbonIntensityAPI';
//import { Link } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, RefreshControl } from 'react-native';

export default function HomeScreen() {
    const [carbonIntensityData, setCarbonIntensityData] = useState<CarbonIntensityData>();
    const [error, setError] = useState<Error>();
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const getCarbonIntensity = useCallback(async () => {
      const { data, error } = await carbonIntensityAPI.get('/intensity');
      if (error) {
        setError(error);
      } else {
        setCarbonIntensityData(data);
      }
    }, []);

    const refreshCarbonIntensity = async () => {
      setRefreshing(true);
      await getCarbonIntensity();
      setRefreshing(false);
    };

    useEffect(() => {
      (async () => {
        await getCarbonIntensity();
        setLoading(false);
      })();
    }, []);

    const displayIntensity = (intensity: number | null): string => {
        if (intensity === null) {
            return 'Not available';
        }
        return `${intensity} gCO2/kWh`; 
    };

    return (
        <ThemedScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContentContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refreshCarbonIntensity} />
          }>
            {loading && <ThemedText>Loading...</ThemedText>}

            {error && <ThemedText>Error: {error.message}</ThemedText>}

            {carbonIntensityData && (
              <>
                <ThemedText>Carbon Intensity</ThemedText>
                <ThemedText>From: {carbonIntensityData.data[0].from}</ThemedText>
                <ThemedText>To: {carbonIntensityData.data[0].to}</ThemedText>
                <ThemedText>Actual: {displayIntensity(carbonIntensityData.data[0].intensity.actual)}</ThemedText>
                <ThemedText>Forecast: {displayIntensity(carbonIntensityData.data[0].intensity.forecast)}</ThemedText>
                <ThemedText>Index: {carbonIntensityData.data[0].intensity.index}</ThemedText>
              </>
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
    </ThemedScrollView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
      flexGrow: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
   scrollContainer: {
    flexGrow: 1,
  },
  carbonIntensity: {
    flexGrow: 1,
  },
});

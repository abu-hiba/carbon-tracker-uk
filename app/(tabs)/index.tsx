import { ThemedScrollView } from '@/components/ThemedScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { CarbonIntensityResponse, carbonIntensityAPI } from '@/services/carbonIntensityAPI';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, RefreshControl, Dimensions } from 'react-native';

const formatIntensity = (intensity: number | null): string => {
  if (intensity === null) {
    return 'Not available';
  }
  return `${intensity} gCO2/kWh`; 
};


type CurrentCarbonIntensityProps = {
  carbonIntensityData: CarbonIntensityResponse["data"][0];
};

function CurrentCarbonIntensity({ carbonIntensityData }: CurrentCarbonIntensityProps) {
  const screenWidth = Dimensions.get('screen').width;
  const screenHeight = Dimensions.get('screen').height;
  const circleStyle = {
    borderRadius: (screenWidth + screenHeight) * 0.5,
    width: screenWidth * 0.5, 
    height: screenWidth * 0.5
  };

  const index = carbonIntensityData.intensity.index;

  return (
    <ThemedView style={[styles.carbonIntensity, circleStyle]}>
      <ThemedText style={styles.mainValue}>
        {carbonIntensityData.intensity.actual || carbonIntensityData.intensity.forecast}
      </ThemedText>
      <ThemedText style={styles.units}> gCO2/kWh</ThemedText>
      {/*<ThemedText>Forecast: {formatIntensity(carbonIntensityData.intensity.forecast)}</ThemedText>*/}
      <ThemedText style={styles.index}>{index.charAt(0).toUpperCase() + index.slice(1)}</ThemedText>
    </ThemedView>

  );
}

export default function HomeScreen() {
  const [carbonIntensityData, setCarbonIntensityData] = useState<CarbonIntensityResponse>();
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

      {carbonIntensityData && <CurrentCarbonIntensity carbonIntensityData={carbonIntensityData.data[0]} />}
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flexGrow: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
    //justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  carbonIntensity: {
    flexGrow: 0,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'lightgreen', // TODO: add colors to theme
    shadowRadius: 10,
    marginTop: 70,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 0 },
  },
  mainValue: {
    fontSize: 40,
    lineHeight: 40,
  },
  units: {
    fontSize: 15,
    color: 'gray', // TODO: add colors to theme
    marginTop: -5,
  },
  index: {
    fontSize: 20,
    marginTop: 10,
    color: 'lightgreen', // TODO: add colors to theme
  }
});

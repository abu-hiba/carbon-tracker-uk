const BASE_URL = 'https://api.carbonintensity.org.uk';

export type CarbonIntensityData = {
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

export const carbonIntensityAPI = {
  get: async (path: string): Promise<{ data?: CarbonIntensityData, error?: Error }> => {
    try {
      const response = await fetch(`${BASE_URL}${path}`);
      const data = await response.json();
      return { data };
    } catch (error: any) {
      return { error };
    }
  },
};

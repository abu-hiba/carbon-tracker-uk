const BASE_URL = 'https://api.carbonintensity.org.uk';

export const carbonIntensityAPI = {
  get: async (path: string): Promise<{ data?: any, error?: Error }> => {
    try {
      const response = await fetch(`${BASE_URL}${path}`);
      const data = await response.json();
      return { data };
    } catch (error: any) {
      return { error };
    }
  },
};

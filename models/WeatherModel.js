import { fetchLocations, fetchWeatherForecast } from '../api/weather';
import { getData, storeData } from '../utils/asyncStorage';

export const WeatherModel = {
    fetchWeatherForecast: async (cityName, days = '7') => {
        const data = await fetchWeatherForecast({ cityName, days });
        return data;
    },
    
    fetchLocations: async (cityName) => {
        const data = await fetchLocations({ cityName });
        return data;
    },

    getStoredCity: async () => {
        const city = await getData('city');
        return city || 'Vietnam';
    },

    storeCity: async (cityName) => {
        await storeData('city', cityName);
    }
};

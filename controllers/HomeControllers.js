import React, { useCallback, useEffect, useState } from 'react';
import HomeView from '../views/HomeView';
import { WeatherModel } from '../models/WeatherModel';
import { debounce } from 'lodash';

const HomeController = () => {
    const [showSearch, toggleSearch] = useState(false);
    const [locations, setLocations] = useState([]);
    const [weather, setWeather] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMyWeatherData();
    }, []);

    const fetchMyWeatherData = async () => {
        const cityName = await WeatherModel.getStoredCity();
        const data = await WeatherModel.fetchWeatherForecast(cityName);
        setWeather(data);
        setLoading(false);
    };

    const handleSearch = async (value) => {
        if (value.length > 2) {
            const data = await WeatherModel.fetchLocations(value);
            setLocations(data);
        } else {
            setLocations([]);
        }
    };

    const handleLocation = async (loc) => {
        setLocations([]);
        toggleSearch(false);
        setLoading(true);
        const data = await WeatherModel.fetchWeatherForecast(loc.name);
        setWeather(data);
        setLoading(false);
        await WeatherModel.storeCity(loc.name);
    };

    const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

    return (
        <HomeView
            showSearch={showSearch}
            toggleSearch={toggleSearch}
            locations={locations}
            handleTextDebounce={handleTextDebounce}
            handleLocation={handleLocation}
            weather={weather}
            loading={loading}
        />
    );
};

export default HomeController;

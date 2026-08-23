import axios from "axios";

const API_KEY = process.env.OPENWEATHER_API_KEY;

// Current weather by city
export const getWeather = async (city) => {

    const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    return response.data;
};


// Current weather by coordinates
export const getWeatherByCoords = async (lat, lon) => {

    const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    return response.data;
};


// 5-Day Forecast
export const getForecast = async (city) => {

    const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    return response.data;
};


// Air Quality
export const getAirQuality = async (lat, lon) => {

    const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );

    return response.data;
};
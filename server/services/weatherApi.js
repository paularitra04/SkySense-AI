import "dotenv/config";
import axios from "axios";

// Current weather by city
export const getWeather = async (city) => {

    const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
    );

    return response.data;
};


// Current weather by coordinates
export const getWeatherByCoords = async (lat, lon) => {

    const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
    );

    return response.data;
};


// 5-Day Forecast
export const getForecast = async (city) => {

    const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
    );

    return response.data;
};


// Air Quality
export const getAirQuality = async (lat, lon) => {

    const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}`
    );

    return response.data;
};
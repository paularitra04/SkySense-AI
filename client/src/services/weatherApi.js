import axios from "axios";

const API_BASE_URL = "https://skysense-ai-backend-1.onrender.com";

// Current weather by city
export const getWeather = async (city) => {
    const response = await axios.get(
        `${API_BASE_URL}/api/weather?city=${encodeURIComponent(city)}`
    );

    return response.data;
};

// Current weather by coordinates
export const getWeatherByCoords = async (lat, lon) => {
    const response = await axios.get(
        `${API_BASE_URL}/api/weather/coords?lat=${lat}&lon=${lon}`
    );

    return response.data;
};

// 5-Day Forecast
export const getForecast = async (city) => {
    const response = await axios.get(
        `${API_BASE_URL}/api/weather/forecast?city=${encodeURIComponent(city)}`
    );

    return response.data;
};

// Air Quality
export const getAirQuality = async (lat, lon) => {
    const response = await axios.get(
        `${API_BASE_URL}/api/weather/air?lat=${lat}&lon=${lon}`
    );

    return response.data;
};

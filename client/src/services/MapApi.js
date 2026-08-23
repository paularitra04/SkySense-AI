import axios from "axios";

const API_BASE_URL = "https://skysense-ai-backend-1.onrender.com";

// Weather by coordinates
export const getWeatherByCoords = async (lat, lon) => {
    const response = await axios.get(
        `${API_BASE_URL}/api/weather/coords?lat=${lat}&lon=${lon}`
    );

    return response.data;
};

// Air Quality
export const getAirQualityByCoords = async (lat, lon) => {
    const response = await axios.get(
        `${API_BASE_URL}/api/weather/air?lat=${lat}&lon=${lon}`
    );

    return response.data;
};

// Reverse Geocoding
export const reverseGeocode = async (lat, lon) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/api/weather/reverse?lat=${lat}&lon=${lon}`
        );

        return response.data;
    } catch (error) {
        console.error("Reverse Geocode Error:", error);

        return {
            name: "Unknown Location",
            state: "",
            country: ""
        };
    }
};

// Combined Map Weather
export const getMapWeather = async (lat, lon) => {
    const response = await axios.get(
        `${API_BASE_URL}/api/weather/map?lat=${lat}&lon=${lon}`
    );

    return response.data;
};

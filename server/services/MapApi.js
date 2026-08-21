import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

// ==========================
// Weather by Coordinates
// ==========================
export const getWeatherByCoords = async (lat, lon) => {

    const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    return response.data;

};

// ==========================
// Air Quality
// ==========================
export const getAirQualityByCoords = async (lat, lon) => {

    const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );

    return response.data;

};

// ==========================
// Reverse Geocoding
// ==========================
export const reverseGeocode = async (lat, lon) => {

    try {

        const response = await axios.get(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
        );

        if (!response.data || response.data.length === 0) {

            return {
                name: "Unknown Location",
                state: "",
                country: ""
            };

        }

        return response.data[0];

    } catch (error) {

        console.log("Reverse Geocode Error:", error);

        return {
            name: "Unknown Location",
            state: "",
            country: ""
        };

    }

};

// ==========================
// Combined Map Weather
// ==========================
export const getMapWeather = async (lat, lon) => {

    try {

        const weather = await getWeatherByCoords(lat, lon);

        const air = await getAirQualityByCoords(lat, lon);

        let place;

        try {

            place = await reverseGeocode(lat, lon);

        } catch {

            place = {
                name: weather.name || "Unknown Location",
                state: "",
                country: weather.sys?.country || ""
            };

        }

        return {
            weather,
            air,
            place
        };

    } catch (error) {

        console.error("Map Weather API Error:", error);

        throw error;

    }

};
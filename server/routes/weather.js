import express from "express";

import {
    getWeather,
    getWeatherByCoords,
    getForecast,
    getAirQuality
} from "../services/weatherApi.js";

import {
    getMapWeather
} from "../services/MapApi.js";

const router = express.Router();


// ==============================
// Current weather by city
// GET /api/weather?city=Kolkata
// ==============================

router.get("/", async (req, res) => {

    try {

        const { city } = req.query;

        if (!city) {

            return res.status(400).json({
                message: "City is required."
            });

        }

        const weather = await getWeather(city);

        res.json(weather);

    } catch (error) {

        console.error("Weather API Error:", error.message);

        res.status(500).json({
            message: "Unable to fetch weather."
        });

    }

});


// ==============================
// Weather by coordinates
// GET /api/weather/coords?lat=...&lon=...
// ==============================

router.get("/coords", async (req, res) => {

    try {

        const { lat, lon } = req.query;

        if (!lat || !lon) {

            return res.status(400).json({
                message: "Latitude and longitude are required."
            });

        }

        const weather = await getWeatherByCoords(lat, lon);

        res.json(weather);

    } catch (error) {

        console.error("Coordinate Weather Error:", error.message);

        res.status(500).json({
            message: "Unable to fetch weather."
        });

    }

});


// ==============================
// Forecast
// GET /api/weather/forecast?city=Kolkata
// ==============================

router.get("/forecast", async (req, res) => {

    try {

        const { city } = req.query;

        if (!city) {

            return res.status(400).json({
                message: "City is required."
            });

        }

        const forecast = await getForecast(city);

        res.json(forecast);

    } catch (error) {

        console.error("Forecast API Error:", error.message);

        res.status(500).json({
            message: "Unable to fetch forecast."
        });

    }

});


// ==============================
// Air Quality
// GET /api/weather/air?lat=...&lon=...
// ==============================

router.get("/air", async (req, res) => {

    try {

        const { lat, lon } = req.query;

        if (!lat || !lon) {

            return res.status(400).json({
                message: "Latitude and longitude are required."
            });

        }

        const air = await getAirQuality(lat, lon);

        res.json(air);

    } catch (error) {

        console.error("Air Quality API Error:", error.message);

        res.status(500).json({
            message: "Unable to fetch air quality."
        });

    }

});


// ==============================
// Map Weather
// GET /api/weather/map?lat=...&lon=...
// ==============================

router.get("/map", async (req, res) => {

    try {

        const { lat, lon } = req.query;

        if (!lat || !lon) {

            return res.status(400).json({
                message: "Latitude and longitude are required."
            });

        }

        const data = await getMapWeather(lat, lon);

        res.json(data);

    } catch (error) {

        console.error("Map Weather API Error:", error.message);

        res.status(500).json({
            message: "Unable to fetch map weather."
        });

    }

});


export default router;
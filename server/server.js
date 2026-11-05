
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { weatherAssistant } from "./weatherAssistant.js";

import stormRoutes from "./routes/storms.js";
import weatherRoutes from "./routes/weather.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Gemini AI configuration
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

// ==============================
// Storm API
// ==============================

app.use("/api/storms", stormRoutes);

// ==============================
// Weather API
// ==============================

app.use("/api/weather", weatherRoutes);

// ==============================
// Home Route
// ==============================

app.get("/", (req, res) => {
    res.send("✅ SkySense AI Backend is running");
});

// ==============================
// AI Weather Assistant
// ==============================

app.post("/api/weather-ai", async (req, res) => {
    const { question, weather } = req.body;

    if (!question?.trim() || !weather) {
        return res.status(400).json({
            answer: "Please provide a question and weather data.",
        });
    }

    // Normalize weather data
    const temperature = Number(weather.temperature ?? weather.temp);
    const feelsLike = Number(weather.feelsLike);
    const humidity = Number(weather.humidity);
    const windMs = Number(weather.windSpeed ?? weather.wind);
    const windKmh = Number.isFinite(windMs)
        ? windMs * 3.6
        : null;

    const currentWeather = {
        city: weather.city || "Unknown location",
        temperature: Number.isFinite(temperature) ? temperature : null,
        feelsLike: Number.isFinite(feelsLike) ? feelsLike : null,
        humidity: Number.isFinite(humidity) ? humidity : null,
        condition: weather.condition || "Unknown",
        description: weather.description || "Unavailable",
        windKmh,
        clouds: weather.clouds ?? null,
        visibility: weather.visibility ?? null,
        pressure: weather.pressure ?? null,
    };

    const prompt = `
You are SkySense AI.

Current Weather:
City: ${currentWeather.city}
Temperature: ${currentWeather.temperature ?? "Unavailable"}°C
Feels Like: ${currentWeather.feelsLike ?? "Unavailable"}°C
Humidity: ${currentWeather.humidity ?? "Unavailable"}%
Condition: ${currentWeather.condition}
Description: ${currentWeather.description}
Wind Speed: ${currentWeather.windKmh ?? "Unavailable"} km/h
Cloud Cover: ${currentWeather.clouds ?? "Unavailable"}%
Visibility: ${currentWeather.visibility ?? "Unavailable"} km
Pressure: ${currentWeather.pressure ?? "Unavailable"} hPa

User Question:
${question}

Reply naturally in 2-3 sentences. Never invent missing weather values.
`;

    try {
        const response = await Promise.race([
            ai.models.generateContent({
                model: "gemini-flash-latest",
                contents: prompt,
            }),

            new Promise((_, reject) => {
                setTimeout(
                    () => reject(new Error("Gemini request timed out")),
                    25000
                );
            }),
        ]);

        const answer = response?.text;

        if (!answer) {
            throw new Error("Empty Gemini response");
        }

        return res.status(200).json({ answer });

    } catch (error) {
        console.error("Gemini AI Error:", error.message);

        // Fallback response if Gemini is unavailable
        try {
            const fallbackWeather = {
                ...currentWeather,
                temp: currentWeather.temperature,
                wind: currentWeather.windKmh,
                condition: currentWeather.condition,
            };

            const answer = weatherAssistant(
                question,
                fallbackWeather
            );

            return res.status(200).json({ answer });

        } catch (fallbackError) {
            console.error("Fallback Error:", fallbackError);

            return res.status(500).json({
                answer: "⚠️ SkySense AI is temporarily unavailable. Please try again.",
            });
        }
    }
});

// ==============================
// Error Handling
// ==============================

app.use((err, req, res, next) => {
    console.error("Server Error:", err);

    res.status(500).json({
        answer: "Internal server error.",
    });
});

// ==============================
// Start Server
// ==============================

app.listen(PORT, () => {
    console.log(`🚀 SkySense AI Backend running on port ${PORT}`);
});

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { weatherAssistant } from "./weatherAssistant.js";

// NEW
import stormRoutes from "./routes/storms.js";
import weatherRoutes from "./routes/weather.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

// ==============================
// Storm API
// ==============================

app.use("/api/storms", stormRoutes);
app.use("/api/weather", weatherRoutes);

// ==============================
// Home
// ==============================

app.get("/", (req, res) => {
    res.send("✅ SkySense AI Backend is running");
});

// ==============================
// AI Assistant
// ==============================

app.post("/api/weather-ai", async (req, res) => {

    const { question, weather } = req.body;

    if (!question || !weather) {

        return res.status(400).json({
            answer: "Please provide a question and weather data."
        });

    }

    const prompt = `
You are SkySense AI.

Current Weather:
City: ${weather.city}
Temperature: ${weather.temp}°C
Feels Like: ${weather.feelsLike}°C
Humidity: ${weather.humidity}%
Condition: ${weather.condition}
Wind Speed: ${weather.wind} km/h

User Question:
${question}

Reply naturally in 2-3 sentences.
`;

    try {

        const response = await Promise.race([

            ai.models.generateContent({

                model: "gemini-flash-latest",

                contents: prompt

            }),

            new Promise((_, reject) =>

                setTimeout(() => reject(new Error("TIMEOUT")), 15000)

            )

        ]);

        if (!response || !response.text) {

            throw new Error("Empty Gemini response");

        }

        return res.json({

            answer: response.text

        });

    } catch (err) {

        console.error("Gemini unavailable:", err);

        try {

            const answer = weatherAssistant(question, weather);

            return res.status(200).json({

                answer

            });

        } catch (fallbackError) {

            console.error("Fallback failed:", fallbackError);

            return res.status(200).json({

                answer: "⚠️ SkySense AI is temporarily unavailable."

            });

        }

    }

});

// ==============================
// Error Handling
// ==============================

process.on("uncaughtException", (err) => {

    console.error("UNCAUGHT EXCEPTION");

    console.error(err);

});

process.on("unhandledRejection", (reason) => {

    console.error("UNHANDLED REJECTION");

    console.error(reason);

});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {

    console.log(`🚀 Server running on ${PORT}`);

});

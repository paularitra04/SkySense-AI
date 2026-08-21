import { useState } from "react";
import axios from "axios";

function AIAssistant({ weather }) {

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    async function askAI() {

        if (!question.trim()) {
            setAnswer("⚠️ Please enter a question.");
            return;
        }

        if (!weather) {
            setAnswer("⚠️ Weather data is not available.");
            return;
        }

        try {

            setAnswer("🤖 SkySense AI is thinking...");

            const response = await axios.post(
                "http://localhost:5001/api/weather-ai",
                {
                    question,
                    weather: {
                        city: weather.name,
                        temp: weather.main.temp,
                        feelsLike: weather.main.feels_like,
                        humidity: weather.main.humidity,
                        condition: weather.weather[0].main,
                        wind: weather.wind.speed
                    }
                },
                {
                    timeout: 20000
                }
            );

            console.log("Backend Response:", response.data);

            setAnswer(response.data.answer);

        } catch (error) {

            console.error("Axios Error:", error);

            if (error.response) {

                console.log("Status:", error.response.status);
                console.log("Data:", error.response.data);

                setAnswer(
                    error.response.data.answer ||
                    "⚠️ Backend returned an error."
                );

            } else if (error.request) {

                console.log("No response received from backend.");

                setAnswer("❌ Cannot connect to backend server.");

            } else {

                console.log(error.message);

                setAnswer(error.message);

            }

        }

    }

    return (

        <div className="mt-16 bg-white/20 backdrop-blur-xl rounded-3xl p-8">

            <h2 className="text-3xl font-bold text-white mb-6">
                🤖 SkySense AI Assistant
            </h2>

            <div className="flex gap-4">

                <input
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask anything about today's weather..."
                    className="flex-1 rounded-xl p-4 bg-white/20 text-white outline-none placeholder-white/60"
                />

                <button
                    onClick={askAI}
                    className="px-8 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold"
                >
                    Ask AI
                </button>

            </div>

            {answer && (

                <div className="mt-6 bg-white/10 rounded-2xl p-5">

                    <p className="text-white text-lg">
                        {answer}
                    </p>

                </div>

            )}

        </div>

    );

}

export default AIAssistant;
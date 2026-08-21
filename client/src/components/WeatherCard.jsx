import { useState } from "react";
import useWeather from "../hooks/useWeather";
import useForecast from "../hooks/useForecast";
import useAirQuality from "../hooks/useAirQuality";
import useFavorites from "../hooks/useFavorites";
import AIAssistant from "./AIAssistant";

function WeatherCard() {
    const [city, setCity] = useState("Kolkata");
    const [searchCity, setSearchCity] = useState("Kolkata");

    const weather = useWeather(city);
    console.log("Weather:", weather);

    const { forecast, hourly } = useForecast(city);
    const air = useAirQuality(
        weather?.coord?.lat,
        weather?.coord?.lon
    );
    const {
        favorites,
        addFavorite,
        removeFavorite
    } = useFavorites();

    if (!weather) {
        return (
            <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-500 via-cyan-500 to-blue-700">
                <h2 className="text-white text-3xl font-bold">
                    Loading Weather...
                </h2>
            </section>
        );
    }

    const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    const sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    const isDay =
        weather.dt >= weather.sys.sunrise &&
        weather.dt < weather.sys.sunset;

    function getWeatherEmoji(condition, temp, isDay) {
        if (temp <= 0) return "❄️";

        switch (condition.toLowerCase()) {
            case "clear":
                return isDay ? "☀️" : "🌙";

            case "clouds":
                return isDay ? "⛅" : "☁️";

            case "rain":
                return "🌧️";

            case "drizzle":
                return "🌦️";

            case "thunderstorm":
                return "⛈️";

            case "snow":
                return "❄️";

            case "mist":
            case "fog":
            case "haze":
                return "🌫️";

            default:
                return isDay ? "🌤️" : "🌙";
        }
    }
    function getAQI(level) {

        switch (level) {

            case 1:
                return "🟢 Good";

            case 2:
                return "🟡 Fair";

            case 3:
                return "🟠 Moderate";

            case 4:
                return "🔴 Poor";

            case 5:
                return "🟣 Very Poor";

            default:
                return "Loading...";
        }

    }
    function getWeatherAlerts(weather) {

        const alerts = [];

        // Temperature

        if (weather.main.temp >= 38) {

            alerts.push({
                color: "red",
                icon: "🥵",
                title: "Heatwave Alert",
                message:
                    "Avoid direct sunlight between 12 PM and 3 PM. Stay hydrated."
            });

        }

        else if (weather.main.temp <= 8) {

            alerts.push({
                color: "blue",
                icon: "🥶",
                title: "Cold Wave",
                message:
                    "Wear warm clothes before going outside."
            });

        }

        // Rain

        if (
            weather.weather[0].main === "Rain" ||
            weather.weather[0].main === "Drizzle"
        ) {

            alerts.push({
                color: "yellow",
                icon: "🌧",
                title: "Rain Alert",
                message:
                    "Carry an umbrella while going outside."
            });

        }

        // Thunderstorm

        if (weather.weather[0].main === "Thunderstorm") {

            alerts.push({
                color: "purple",
                icon: "⛈",
                title: "Thunderstorm Warning",
                message:
                    "Avoid open fields and tall trees."
            });

        }

        // Wind

        if (weather.wind.speed >= 12) {

            alerts.push({
                color: "cyan",
                icon: "💨",
                title: "Strong Wind",
                message:
                    "Secure loose objects and drive carefully."
            });

        }

        // Humidity

        if (weather.main.humidity >= 85) {

            alerts.push({
                color: "orange",
                icon: "💧",
                title: "High Humidity",
                message:
                    "It may feel warmer than the actual temperature."
            });

        }

        // Default

        if (alerts.length === 0) {

            alerts.push({
                color: "green",
                icon: "🌤",
                title: "Great Weather",
                message:
                    "Perfect weather for outdoor activities."
            });

        }

        return alerts;

    }
    //phase 10
    function getBackground(condition, isDay) {

        switch (condition.toLowerCase()) {

            case "clear":
                return isDay
                    ? "from-yellow-400 via-orange-400 to-orange-600"
                    : "from-slate-900 via-blue-900 to-black";

            case "clouds":
                return "from-slate-400 via-slate-500 to-blue-700";

            case "rain":
            case "drizzle":
                return "from-blue-700 via-slate-600 to-slate-800";

            case "thunderstorm":
                return "from-purple-900 via-slate-800 to-black";

            case "snow":
                return "from-sky-100 via-white to-sky-300";

            case "mist":
            case "fog":
            case "haze":
                return "from-gray-300 via-gray-400 to-gray-600";

            default:
                return "from-sky-500 via-cyan-500 to-blue-700";
        }
    }

    return (
        //<section className="min-h-screen bg-gradient-to-br from-sky-500 via-cyan-500 to-blue-700 py-16 px-5">
        <section
            id="weather-section"
            className={`min-h-screen bg-gradient-to-br ${getBackground(
                weather.weather[0].main,
                isDay
            )} py-16 px-5 transition-all duration-1000`}
        >

            <div className="max-w-5xl mx-auto">

                {/* Search Box */}
                <div className="flex justify-center mb-10">

                    <div className="flex w-full max-w-2xl rounded-2xl overflow-hidden bg-white/20 backdrop-blur-lg border border-white/20 shadow-xl">

                        <input
                            type="text"
                            value={searchCity}
                            onChange={(e) => setSearchCity(e.target.value)}
                            placeholder="🔍 Search any city..."
                            className="flex-1 bg-transparent px-6 py-4 text-white placeholder-white/70 outline-none text-lg"
                        />

                        <button
                            onClick={() => setCity(searchCity)}
                            className="bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white px-8 font-semibold transition duration-300"
                        >
                            Search
                        </button>

                    </div>

                </div>

                {/* favorite cities */}
                <div className="mt-6">

                    <h2 className="text-white text-xl font-semibold mb-3">
                        ⭐ Favorite Cities
                    </h2>

                    <div className="flex flex-wrap gap-3">

                        {favorites.map(cityName => (

                            <div
                                key={cityName}
                                className="flex items-center gap-3
    bg-white/20
    backdrop-blur-lg
    px-4 py-2
    rounded-full
    shadow-lg"
                            >
                                <span className="text-xl">📍</span>

                                <button
                                    onClick={() => setCity(cityName)}
                                    className="text-white font-medium"
                                >
                                    {cityName}
                                </button>

                                <button
                                    onClick={() => removeFavorite(cityName)}
                                    className="text-red-400 hover:text-red-600 text-lg"
                                    title="Remove"
                                >
                                    ✕
                                </button>
                            </div>

                        ))}

                    </div>

                </div>

                {/* Current Weather */}

                <div className="mt-8 bg-white/20 backdrop-blur-xl rounded-[30px] p-8 border border-white/20 shadow-2xl">

                    <div className="flex flex-col md:flex-row justify-between items-center">

                        {/* Left */}

                        <div className="flex-1">

                            <div className="flex items-center gap-3">

                                <h2 className="text-5xl font-bold text-white">
                                    {weather.name}, {weather.sys.country}
                                </h2>

                                <button
                                    onClick={() => addFavorite(weather.name)}
                                    className="text-4xl hover:scale-110 transition"
                                >
                                    ⭐
                                </button>

                            </div>

                            <p className="text-2xl text-white/80 capitalize mt-3">
                                {weather.weather[0].description}
                            </p>

                            <h1 className="text-[100px] font-bold text-white leading-none mt-8">
                                {Math.round(weather.main.temp)}°
                            </h1>

                            <p className="text-2xl text-white/70 mt-2">
                                Feels Like {Math.round(weather.main.feels_like)}°
                            </p>

                        </div>

                        {/* Right */}

                        <div className="flex-1 flex justify-end">

                            <div className="text-[140px]">
                                {getWeatherEmoji(
                                    weather.weather[0].main,
                                    weather.main.temp,
                                    isDay
                                )}
                            </div>

                        </div>

                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">

                        <div className="bg-white/15 rounded-2xl p-5 text-center backdrop-blur-lg">
                            <h3 className="font-semibold">💧 Humidity</h3>
                            <p className="text-2xl mt-2">{weather.main.humidity}%</p>
                        </div>

                        <div className="bg-white/15 rounded-2xl p-5 text-center backdrop-blur-lg">
                            <h3 className="font-semibold">🌬 Wind</h3>
                            <p className="text-2xl mt-2">{weather.wind.speed} km/h</p>
                        </div>

                        <div className="bg-white/15 rounded-2xl p-5 text-center backdrop-blur-lg">
                            <h3 className="font-semibold">🌅 Sunrise</h3>
                            <p className="text-xl mt-2">{sunrise}</p>
                        </div>

                        <div className="bg-white/15 rounded-2xl p-5 text-center backdrop-blur-lg">
                            <h3 className="font-semibold">🌇 Sunset</h3>
                            <p className="text-xl mt-2">{sunset}</p>
                        </div>

                    </div>

                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">

                    <div className="bg-white/15 rounded-2xl p-5 text-center backdrop-blur-lg">
                        <h3>🌫 AQI</h3>
                        <p>{air ? getAQI(air.main.aqi) : "Loading..."}</p>
                    </div>

                    <div className="bg-white/15 rounded-2xl p-5 text-center backdrop-blur-lg">
                        <h3>👁 Visibility</h3>
                        <p>{weather.visibility / 1000} km</p>
                    </div>

                    <div className="bg-white/15 rounded-2xl p-5 text-center backdrop-blur-lg">
                        <h3>🌡 Pressure</h3>
                        <p>{weather.main.pressure} hPa</p>
                    </div>

                    <div className="bg-white/15 rounded-2xl p-5 text-center backdrop-blur-lg">
                        <h3>🧭 Wind Direction</h3>
                        <p>{weather.wind.deg}°</p>
                    </div>

                </div>
                <div className="mt-12">

                    <h2 className="text-3xl font-bold text-white mb-6">
                        Next 24 Hours
                    </h2>

                    <div className="flex gap-5 overflow-x-auto pb-3">

                        {hourly.map((hour) => (

                            <div
                                key={hour.dt}
                                className="min-w-[120px] bg-white/20 backdrop-blur-lg rounded-2xl p-4 text-center text-white"
                            >

                                <p>
                                    {new Date(hour.dt * 1000).toLocaleTimeString([], {
                                        hour: "numeric",
                                    })}
                                </p>

                                <img
                                    src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                                    className="mx-auto"
                                    alt={hour.weather[0].description}
                                />

                                <p className="text-xl font-bold">
                                    {Math.round(hour.main.temp)}°
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

                {/* 5-Day Forecast */}

                <div className="mt-12">

                    <h2 className="text-3xl font-bold text-white mb-6">
                        5-Day Forecast
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-5">

                        {forecast.map((day) => (

                            <div
                                key={day.dt}
                                className="bg-white/20 backdrop-blur-lg rounded-2xl p-5 text-center text-white"
                            >

                                <p className="font-semibold">
                                    {new Date(day.dt_txt).toLocaleDateString("en-US", {
                                        weekday: "short",
                                    })}
                                </p>

                                <img
                                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                                    alt={day.weather[0].description}
                                    className="mx-auto"
                                />

                                <p className="text-2xl font-bold">
                                    {Math.round(day.main.temp)}°
                                </p>

                                <p className="capitalize text-sm mt-2">
                                    {day.weather[0].description}
                                </p>

                            </div>

                        ))}

                    </div>
                    {/* Smart Weather Alerts */}

                    <div className="mt-12">

                        <h2 className="text-3xl font-bold text-white mb-6">
                            ⚠ Smart Weather Alerts
                        </h2>

                        <div className="space-y-5">

                            {getWeatherAlerts(weather).map((alert, index) => (

                                <div
                                    key={index}
                                    className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl"
                                >

                                    <div className="flex items-start gap-4">

                                        <div className="text-5xl">
                                            {alert.icon}
                                        </div>

                                        <div>

                                            <h3 className="text-2xl font-bold text-white">
                                                {alert.title}
                                            </h3>

                                            <p className="text-white/80 mt-2">
                                                {alert.message}
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>
                    {/* AI Assistant */}
                    <div id="ai-assistant">
                        <AIAssistant weather={weather} />
                    </div>

                </div>

            </div>

        </section>
    );
}

export default WeatherCard;
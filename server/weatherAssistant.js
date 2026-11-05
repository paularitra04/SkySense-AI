
export function weatherAssistant(question, weather) {
    const q = String(question || "").toLowerCase();

    const city = weather.city || "your location";
    const temp = weather.temperature;
    const feels = weather.feelsLike;
    const humidity = weather.humidity;
    const condition = String(weather.condition || "").toLowerCase();
    const description = String(weather.description || "").toLowerCase();
    const wind = weather.windKmh;

    const hasTemp = Number.isFinite(temp);
    const hasHumidity = Number.isFinite(humidity);
    const hasWind = Number.isFinite(wind);

    const rainy =
        condition.includes("rain") ||
        condition.includes("drizzle") ||
        description.includes("rain");

    const stormy =
        condition.includes("thunder") ||
        description.includes("thunderstorm") ||
        condition.includes("tornado");

    const veryHot =
        hasTemp && temp >= 36;

    const veryCold =
        hasTemp && temp <= 8;

    const strongWind =
        hasWind && wind >= 30;

    // Cricket and outdoor sports
    if (
        q.includes("cricket") ||
        q.includes("football") ||
        q.includes("outdoor sport") ||
        q.includes("playing outside") ||
        q.includes("play outside")
    ) {
        if (stormy) {
            return `⛈️ Outdoor sports are not recommended in ${city} right now. Thunderstorm conditions can be dangerous. Stay indoors.`;
        }

        if (rainy) {
            return `🌧️ Playing outside in ${city} is not ideal right now because rainy conditions may make the ground slippery.`;
        }

        if (veryHot) {
            return `🥵 Outdoor sports in ${city} may be uncomfortable because the temperature is ${temp}°C. Consider playing during cooler hours, take breaks and drink plenty of water.`;
        }

        if (veryCold) {
            return `🥶 It is quite cold in ${city} at ${temp}°C. Wear suitable clothing and warm up properly before playing.`;
        }

        if (strongWind) {
            return `💨 Playing conditions in ${city} may be affected by winds of ${wind.toFixed(1)} km/h, especially for cricket because wind can affect the ball.`;
        }

        if (hasTemp && hasHumidity && hasWind) {
            return `🏏 Current conditions in ${city} look reasonably suitable for outdoor sports at ${temp}°C, with ${humidity}% humidity and winds of ${wind.toFixed(1)} km/h. Check the forecast for rain before leaving.`;
        }

        return `🏏 I cannot fully assess outdoor sports conditions in ${city} because some weather information is missing. Please check local rain and weather conditions before playing.`;
    }

    // Umbrella
    if (q.includes("umbrella") || q.includes("rain")) {
        if (rainy || stormy) {
            return `🌧️ Rain-related conditions are currently reported in ${city}. Carry an umbrella and take care outdoors.`;
        }

        if (weather.forecast) {
            return `Check the supplied forecast for precipitation before leaving ${city}. Current conditions alone cannot establish whether it will rain later.`;
        }

        return `☂️ Current conditions in ${city} do not report rain. However, I don't have forecast data to confirm whether rain will occur later.`;
    }

    // Jogging and exercise
    if (
        q.includes("jog") ||
        q.includes("running") ||
        q.includes("exercise")
    ) {
        if (stormy || rainy) {
            return `🌧️ Outdoor exercise is not recommended in ${city} during these conditions. Consider exercising indoors.`;
        }

        if (veryHot || (hasHumidity && humidity >= 85)) {
            return `🥵 Outdoor exercise may be uncomfortable in ${city}. Heat and humidity can increase dehydration risk. Exercise during cooler hours and stay hydrated.`;
        }

        return `🏃 Current conditions in ${city} may be suitable for exercise, but consider the temperature, wind and any changing weather before heading out.`;
    }

    // Cycling
    if (q.includes("cycle") || q.includes("cycling") || q.includes("bicycle")) {
        if (rainy || stormy || strongWind) {
            return `🚴 Cycling may be difficult or unsafe in ${city} under the current weather conditions. Be cautious and consider postponing.`;
        }

        return `🚴 Current conditions in ${city} appear reasonably suitable for cycling. Check road conditions and the forecast before starting.`;
    }

    // Clothing
    if (q.includes("wear") || q.includes("clothes") || q.includes("sweater") || q.includes("jacket")) {
        if (!hasTemp) {
            return `I don't have temperature information for ${city}, so I cannot recommend suitable clothing reliably.`;
        }

        if (temp <= 15) {
            return `🧥 At ${temp}°C in ${city}, wear warm clothing such as a sweater or jacket.`;
        }

        if (temp <= 25) {
            return `👕 At ${temp}°C in ${city}, comfortable light clothing should work. A light jacket may be useful.`;
        }

        return `☀️ At ${temp}°C in ${city}, lightweight, breathable clothing is recommended.`;
    }

    // Temperature
    if (q.includes("temperature") || q.includes("hot") || q.includes("cold")) {
        if (!hasTemp) return "Temperature information is unavailable.";

        return `🌡️ The current temperature in ${city} is ${temp}°C${Number.isFinite(feels) ? `, feeling like ${feels}°C` : ""}.`;
    }

    // Humidity
    if (q.includes("humidity")) {
        return hasHumidity
            ? `💧 Current humidity in ${city} is ${humidity}%.`
            : "Humidity information is unavailable.";
    }

    // Wind
    if (q.includes("wind")) {
        return hasWind
            ? `💨 Current wind speed in ${city} is ${wind.toFixed(1)} km/h.`
            : "Wind information is unavailable.";
    }

    // General weather
    if (q.includes("weather")) {
        return `🌤️ Current weather in ${city}: ${weather.description || weather.condition || "Unknown conditions"}${hasTemp ? `, ${temp}°C` : ""}.`;
    }

    return `I can answer questions about current weather and outdoor activities in ${city}. Please ask me a specific question, such as whether it is suitable for cricket, cycling or jogging.`;
}

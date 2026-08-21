export function weatherAssistant(question, weather) {

    const q = question.toLowerCase();

    const temp = weather.temp;
    const humidity = weather.humidity;
    const condition = weather.condition.toLowerCase();
    const wind = weather.wind;
    const city = weather.city;

    // Umbrella
    if (q.includes("umbrella") || q.includes("rain")) {

        if (
            condition.includes("rain") ||
            condition.includes("drizzle") ||
            condition.includes("storm")
        ) {
            return "🌧️ Yes, you should carry an umbrella because rain is expected.";
        }

        return "☂️ You probably don't need an umbrella today.";
    }

    // Sweater
    if (
        q.includes("sweater") ||
        q.includes("jacket") ||
        q.includes("hoodie")
    ) {

        if (temp <= 18)
            return "🧥 Yes, wear a sweater or jacket because it's quite cool.";

        if (temp <= 25)
            return "👕 A light jacket is optional.";

        return "☀️ No sweater is needed today.";
    }

    // Jogging
    if (
        q.includes("jog") ||
        q.includes("running") ||
        q.includes("exercise")
    ) {

        if (temp > 36)
            return "🥵 It's too hot for jogging. Exercise indoors if possible.";

        if (condition.includes("rain"))
            return "🌧️ Better avoid jogging because of the rain.";

        return "🏃 Great weather for jogging.";
    }

    // Clothes
    if (q.includes("wear") || q.includes("clothes")) {

        if (temp < 15)
            return "Wear warm clothes, a sweater and long pants.";

        if (temp < 25)
            return "Light full-sleeve clothing is recommended.";

        return "Cotton T-shirt and light clothes are ideal.";
    }

    // Cycling
    if (q.includes("cycle") || q.includes("bike")) {

        if (wind > 25)
            return "Strong winds may make cycling difficult.";

        return "🚴 It looks like a good day for cycling.";
    }

    // Picnic
    if (q.includes("picnic")) {

        if (condition.includes("rain"))
            return "Rain may spoil a picnic today.";

        return "🌳 Today looks suitable for a picnic.";
    }

    // Photography
    if (q.includes("photo")) {

        if (condition.includes("cloud"))
            return "📷 Cloudy skies are great for soft photography.";

        return "📷 Good weather for outdoor photography.";
    }

    // Temperature
    if (q.includes("temperature") || q.includes("hot")) {

        return `🌡️ Current temperature in ${city} is ${temp}°C.`;
    }

    // Humidity
    if (q.includes("humidity")) {

        return `💧 Humidity is ${humidity}%.`;
    }

    // Wind
    if (q.includes("wind")) {

        return `💨 Wind speed is ${wind} km/h.`;
    }

    // Weather
    if (q.includes("weather")) {

        return `🌤️ Current weather in ${city} is ${condition} with ${temp}°C.`;
    }

    return `Current weather in ${city}: ${temp}°C, ${condition}, humidity ${humidity}% and wind ${wind} km/h.`;
}
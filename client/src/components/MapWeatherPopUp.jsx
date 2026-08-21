function MapWeatherPopup({ location }) {

    if (!location) return null;

    const { weather, air, place } = location;

    const aqiText = [
        "Unknown",
        "🟢 Good",
        "🟡 Fair",
        "🟠 Moderate",
        "🔴 Poor",
        "🟣 Very Poor"
    ];

    const sunrise = new Date(
        weather.sys.sunrise * 1000
    ).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    const sunset = new Date(
        weather.sys.sunset * 1000
    ).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    const updated = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    return (

        <div className="w-[330px]">

            {/* Header */}

            <div className="text-center">

                <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                    className="mx-auto w-24"
                    alt=""
                />

                <h2 className="text-2xl font-bold text-slate-800">

                    📍 {place?.name || weather.name}

                </h2>

                <p className="text-gray-600">

                    {place?.state
                        ? `${place.state}, `
                        : ""}

                    {place?.country || weather.sys.country}

                </p>

            </div>

            {/* Temperature */}

            <div className="text-center mt-3">

                <h1 className="text-5xl font-bold text-sky-600">

                    {Math.round(weather.main.temp)}°C

                </h1>

                <p className="capitalize text-gray-600">

                    {weather.weather[0].description}

                </p>

                <p className="text-sm text-gray-500 mt-1">

                    Feels Like {Math.round(weather.main.feels_like)}°C

                </p>

            </div>

            {/* Details */}

            <div className="grid grid-cols-2 gap-3 mt-5">

                <div className="bg-sky-50 rounded-xl p-3">

                    💧 Humidity

                    <br />

                    <strong>{weather.main.humidity}%</strong>

                </div>

                <div className="bg-sky-50 rounded-xl p-3">

                    💨 Wind

                    <br />

                    <strong>{weather.wind.speed} km/h</strong>

                </div>

                <div className="bg-sky-50 rounded-xl p-3">

                    🌡 Pressure

                    <br />

                    <strong>{weather.main.pressure} hPa</strong>

                </div>

                <div className="bg-sky-50 rounded-xl p-3">

                    👁 Visibility

                    <br />

                    <strong>{weather.visibility / 1000} km</strong>

                </div>

                <div className="bg-sky-50 rounded-xl p-3">

                    🌫 AQI

                    <br />

                    <strong>

                        {air
                            ? aqiText[air.list[0].main.aqi]
                            : "Loading"}

                    </strong>

                </div>

                <div className="bg-sky-50 rounded-xl p-3">

                    📍 Coordinates

                    <br />

                    <strong>

                        {weather.coord.lat.toFixed(2)},
                        {" "}
                        {weather.coord.lon.toFixed(2)}

                    </strong>

                </div>

                <div className="bg-sky-50 rounded-xl p-3">

                    🌅 Sunrise

                    <br />

                    <strong>{sunrise}</strong>

                </div>

                <div className="bg-sky-50 rounded-xl p-3">

                    🌇 Sunset

                    <br />

                    <strong>{sunset}</strong>

                </div>

            </div>

            {/* Footer */}

            <div className="mt-4 text-center text-gray-500 text-sm">

                Last Updated: {updated}

            </div>

        </div>

    );

}

export default MapWeatherPopup;
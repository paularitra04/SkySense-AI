import { useEffect } from "react";

import useStorms from "../hooks/useStorms";
import WeatherMap from "../components/WeatherMap";

function Maps() {

    const {
        storms,
        loading,
        error,
        refreshStorms
    } = useStorms();


    // ==========================================
    // Fetch live storms
    // ==========================================

    useEffect(() => {

        refreshStorms();

        // Refresh every 5 minutes
        const interval = setInterval(() => {
            refreshStorms();
        }, 5 * 60 * 1000);

        return () => clearInterval(interval);

    }, []);


    return (

        <div className="min-h-screen bg-gradient-to-br from-sky-500 via-cyan-500 to-blue-700 pt-32 pb-16 px-6">

            <div className="max-w-7xl mx-auto">


                {/* ==========================================
                    HEADING
                ========================================== */}

                <div className="text-center mb-12">

                    <h1 className="text-6xl font-extrabold text-white">
                        🌍 SkySense Weather Maps
                    </h1>

                    <p className="text-white/80 text-xl mt-5 max-w-4xl mx-auto">
                        Explore weather anywhere in the world, search for cities,
                        check your current location and track active storms
                        in real time.
                    </p>

                </div>


                {/* ==========================================
                    LIVE STORM STATUS
                ========================================== */}

                <div className="
                    bg-white/15
                    backdrop-blur-2xl
                    rounded-3xl
                    p-6
                    mb-8
                    border
                    border-white/20
                    shadow-2xl
                ">

                    {/* Header */}

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">

                        <div>

                            <h2 className="text-2xl font-bold text-white">
                                🌪️ Live Storm Tracker
                            </h2>

                            <p className="text-white/70 mt-1">
                                Monitor currently active storms around the world.
                            </p>

                        </div>


                        <button
                            onClick={refreshStorms}
                            disabled={loading}
                            className="
                                bg-sky-600
                                hover:bg-sky-700
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                                text-white
                                px-5
                                py-2.5
                                rounded-xl
                                font-semibold
                                shadow-lg
                                transition
                            "
                        >
                            {loading ? "🔄 Updating..." : "🔄 Refresh"}
                        </button>

                    </div>


                    {/* Loading */}

                    {loading && (

                        <div className="
                            bg-white/10
                            rounded-2xl
                            p-5
                            text-white/80
                        ">
                            🌎 Fetching live storm data...
                        </div>

                    )}


                    {/* Error */}

                    {error && (

                        <div className="
                            bg-red-500/20
                            border
                            border-red-300/30
                            rounded-2xl
                            p-5
                            text-red-100
                        ">
                            ⚠️ Unable to load storm information.
                            <br />
                            <span className="text-sm">
                                {error}
                            </span>
                        </div>

                    )}


                    {/* No storms */}

                    {!loading && !error && storms.length === 0 && (

                        <div className="
                            bg-green-500/20
                            border
                            border-green-300/30
                            rounded-2xl
                            p-5
                            text-white
                        ">
                            ✅ No active storms detected right now.
                        </div>

                    )}


                    {/* Storm List */}

                    {!loading && storms.length > 0 && (

                        <>

                            <div className="
                                bg-red-500/20
                                border
                                border-red-300/30
                                rounded-2xl
                                p-4
                                mb-5
                            ">

                                <div className="text-white font-bold text-lg">
                                    🌪️ {storms.length} Active Storm
                                    {storms.length > 1 ? "s" : ""}
                                </div>

                                <div className="text-white/70 text-sm mt-1">
                                    Click the storm markers on the map to view
                                    detailed storm information.
                                </div>

                            </div>


                            <div className="grid md:grid-cols-2 gap-4">

                                {storms.map((storm) => (

                                    <div
                                        key={storm.id || storm.name}
                                        className="
                                            bg-black/20
                                            hover:bg-black/30
                                            rounded-2xl
                                            p-5
                                            text-white
                                            border
                                            border-white/10
                                            transition
                                        "
                                    >

                                        {/* Storm Name */}

                                        <div className="text-xl font-bold">
                                            🌪️ {storm.name || "Unknown Storm"}
                                        </div>


                                        {/* Storm Type */}

                                        <div className="text-white/70 mt-1">
                                            {storm.type || "Storm"}
                                        </div>


                                        {/* Wind */}

                                        <div className="text-white/80 mt-3">
                                            💨 Wind:
                                            {" "}
                                            {storm.wind ?? "N/A"} kt
                                        </div>


                                        {/* Coordinates */}

                                        <div className="text-white/80 mt-1">
                                            📍
                                            {" "}
                                            {Number.isFinite(
                                                Number(storm.latitude)
                                            )
                                                ? Number(storm.latitude).toFixed(2)
                                                : "N/A"}
                                            °,
                                            {" "}
                                            {Number.isFinite(
                                                Number(storm.longitude)
                                            )
                                                ? Number(storm.longitude).toFixed(2)
                                                : "N/A"}
                                            °
                                        </div>

                                    </div>

                                ))}

                            </div>

                        </>

                    )}

                </div>


                {/* ==========================================
                    WEATHER MAP
                ========================================== */}

                <div className="
                    bg-white/15
                    backdrop-blur-2xl
                    rounded-3xl
                    p-6
                    border
                    border-white/20
                    shadow-2xl
                ">

                    <WeatherMap storms={storms} />

                </div>


                {/* ==========================================
                    FEATURES
                ========================================== */}

                <div className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-5
                    gap-6
                    mt-12
                ">


                    {/* Explore Anywhere */}

                    <div className="
                        bg-white/15
                        backdrop-blur-xl
                        rounded-3xl
                        p-7
                        text-center
                        border
                        border-white/20
                        shadow-xl
                        hover:scale-105
                        transition
                        duration-300
                    ">

                        <div className="text-5xl mb-4">
                            🌍
                        </div>

                        <h3 className="text-xl font-bold text-white">
                            Explore Anywhere
                        </h3>

                        <p className="text-white/80 mt-3 text-sm">
                            Click anywhere on Earth to instantly view
                            live weather information.
                        </p>

                    </div>


                    {/* Search Cities */}

                    <div className="
                        bg-white/15
                        backdrop-blur-xl
                        rounded-3xl
                        p-7
                        text-center
                        border
                        border-white/20
                        shadow-xl
                        hover:scale-105
                        transition
                        duration-300
                    ">

                        <div className="text-5xl mb-4">
                            🔍
                        </div>

                        <h3 className="text-xl font-bold text-white">
                            Search Cities
                        </h3>

                        <p className="text-white/80 mt-3 text-sm">
                            Search any city in the world and instantly
                            fly to its location.
                        </p>

                    </div>


                    {/* My Location */}

                    <div className="
                        bg-white/15
                        backdrop-blur-xl
                        rounded-3xl
                        p-7
                        text-center
                        border
                        border-white/20
                        shadow-xl
                        hover:scale-105
                        transition
                        duration-300
                    ">

                        <div className="text-5xl mb-4">
                            📍
                        </div>

                        <h3 className="text-xl font-bold text-white">
                            My Location
                        </h3>

                        <p className="text-white/80 mt-3 text-sm">
                            Return to your current location instantly
                            with one click.
                        </p>

                    </div>


                    {/* Live Weather */}

                    <div className="
                        bg-white/15
                        backdrop-blur-xl
                        rounded-3xl
                        p-7
                        text-center
                        border
                        border-white/20
                        shadow-xl
                        hover:scale-105
                        transition
                        duration-300
                    ">

                        <div className="text-5xl mb-4">
                            🌦️
                        </div>

                        <h3 className="text-xl font-bold text-white">
                            Live Weather
                        </h3>

                        <p className="text-white/80 mt-3 text-sm">
                            View temperature, humidity, wind speed,
                            pressure and visibility in real time.
                        </p>

                    </div>


                    {/* ==========================================
                        NEW STORM TRACKER CARD
                    ========================================== */}

                    <div className="
                        bg-red-500/20
                        backdrop-blur-xl
                        rounded-3xl
                        p-7
                        text-center
                        border
                        border-red-300/30
                        shadow-xl
                        hover:scale-105
                        transition
                        duration-300
                    ">



                        <h3 className="text-xl font-bold text-white">
                            Storm Tracker
                        </h3>

                        <p className="text-white/80 mt-3 text-sm">
                            Track active tropical storms and view their
                            location, wind speed and movement.
                        </p>

                        <div className="
                            mt-4
                            inline-block
                            bg-red-600/70
                            text-white
                            px-3
                            py-1
                            rounded-full
                            text-sm
                            font-semibold
                        ">
                            {storms.length} Active
                        </div>

                    </div>

                </div>


            </div>

        </div>

    );

}

export default Maps;
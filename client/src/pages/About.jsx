function About() {
    return (
        <section className="min-h-screen bg-gradient-to-br from-sky-500 via-cyan-500 to-blue-700 py-16 px-6">

            <div className="max-w-7xl mx-auto">

                {/* ============================= */}
                {/* HERO SECTION */}
                {/* ============================= */}

                <div className="text-center mb-16">

                    <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-xl border border-white/20 px-5 py-2 rounded-full text-white font-semibold mb-6">
                        ✨ Smart Weather • Powered by AI
                    </div>

                    <h1 className="text-6xl md:text-7xl font-extrabold text-white">
                        🌦️ About SkySense AI
                    </h1>

                    <p className="text-white/85 text-xl md:text-2xl mt-6 max-w-4xl mx-auto leading-relaxed">
                        A modern intelligent weather platform designed to make
                        understanding the atmosphere easier, faster and smarter.
                    </p>

                </div>


                {/* ============================= */}
                {/* INTRODUCTION */}
                {/* ============================= */}

                <div className="bg-white/15 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl mb-10">

                    <div className="grid lg:grid-cols-2 gap-10 items-center">

                        <div>

                            <div className="text-6xl mb-6">
                                🌍
                            </div>

                            <h2 className="text-4xl font-bold text-white mb-5">
                                Weather Intelligence at Your Fingertips
                            </h2>

                            <p className="text-white/85 text-lg leading-8">
                                SkySense AI is an AI-powered weather application
                                that combines real-time weather information,
                                interactive maps, forecasts, atmospheric data
                                and intelligent assistance into one platform.
                            </p>

                            <p className="text-white/80 text-lg leading-8 mt-4">
                                Instead of simply displaying weather numbers,
                                SkySense AI helps users understand what those
                                numbers mean through an intuitive and interactive
                                experience.
                            </p>

                        </div>


                        <div className="grid grid-cols-2 gap-4">

                            <div className="bg-white/10 rounded-2xl p-6 text-center border border-white/10">
                                <div className="text-4xl mb-3">🌡️</div>
                                <h3 className="text-white font-bold text-xl">
                                    Live Weather
                                </h3>
                                <p className="text-white/70 text-sm mt-2">
                                    Current atmospheric conditions
                                </p>
                            </div>

                            <div className="bg-white/10 rounded-2xl p-6 text-center border border-white/10">
                                <div className="text-4xl mb-3">🤖</div>
                                <h3 className="text-white font-bold text-xl">
                                    AI Assistant
                                </h3>
                                <p className="text-white/70 text-sm mt-2">
                                    Intelligent weather conversations
                                </p>
                            </div>

                            <div className="bg-white/10 rounded-2xl p-6 text-center border border-white/10">
                                <div className="text-4xl mb-3">🌪️</div>
                                <h3 className="text-white font-bold text-xl">
                                    Storm Tracker
                                </h3>
                                <p className="text-white/70 text-sm mt-2">
                                    Live active storm monitoring
                                </p>
                            </div>

                            <div className="bg-white/10 rounded-2xl p-6 text-center border border-white/10">
                                <div className="text-4xl mb-3">🛰️</div>
                                <h3 className="text-white font-bold text-xl">
                                    Smart Maps
                                </h3>
                                <p className="text-white/70 text-sm mt-2">
                                    Normal and satellite views
                                </p>
                            </div>

                        </div>

                    </div>

                </div>


                {/* ============================= */}
                {/* FEATURES */}
                {/* ============================= */}

                <div className="mb-10">

                    <div className="text-center mb-10">

                        <h2 className="text-4xl font-bold text-white">
                            🚀 What SkySense AI Offers
                        </h2>

                        <p className="text-white/75 text-lg mt-3">
                            Everything you need to understand the weather.
                        </p>

                    </div>


                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {/* Feature 1 */}
                        <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-7 border border-white/20 shadow-xl hover:scale-105 transition duration-300">

                            <div className="text-5xl mb-5">
                                🤖
                            </div>

                            <h3 className="text-2xl font-bold text-white">
                                AI Weather Assistant
                            </h3>

                            <p className="text-white/75 mt-3 leading-7">
                                Ask weather-related questions and receive
                                natural-language answers using the current
                                weather conditions.
                            </p>

                        </div>


                        {/* Feature 2 */}
                        <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-7 border border-white/20 shadow-xl hover:scale-105 transition duration-300">

                            <div className="text-5xl mb-5">
                                🌪️
                            </div>

                            <h3 className="text-2xl font-bold text-white">
                                Live Storm Tracker
                            </h3>

                            <p className="text-white/75 mt-3 leading-7">
                                Monitor active storms directly on the map with
                                storm position, wind speed, pressure, category,
                                basin and historical track information.
                            </p>

                        </div>


                        {/* Feature 3 */}
                        <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-7 border border-white/20 shadow-xl hover:scale-105 transition duration-300">

                            <div className="text-5xl mb-5">
                                🗺️
                            </div>

                            <h3 className="text-2xl font-bold text-white">
                                Interactive Weather Maps
                            </h3>

                            <p className="text-white/75 mt-3 leading-7">
                                Explore locations around the world using an
                                interactive map and instantly retrieve weather
                                information.
                            </p>

                        </div>


                        {/* Feature 4 */}
                        <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-7 border border-white/20 shadow-xl hover:scale-105 transition duration-300">

                            <div className="text-5xl mb-5">
                                🛰️
                            </div>

                            <h3 className="text-2xl font-bold text-white">
                                Satellite View
                            </h3>

                            <p className="text-white/75 mt-3 leading-7">
                                Switch between a standard geographical map and
                                satellite imagery to explore weather systems
                                visually.
                            </p>

                        </div>


                        {/* Feature 5 */}
                        <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-7 border border-white/20 shadow-xl hover:scale-105 transition duration-300">

                            <div className="text-5xl mb-5">
                                📍
                            </div>

                            <h3 className="text-2xl font-bold text-white">
                                Location Weather
                            </h3>

                            <p className="text-white/75 mt-3 leading-7">
                                Use your current location or click anywhere on
                                the map to retrieve weather conditions for that
                                location.
                            </p>

                        </div>


                        {/* Feature 6 */}
                        <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-7 border border-white/20 shadow-xl hover:scale-105 transition duration-300">

                            <div className="text-5xl mb-5">
                                🔍
                            </div>

                            <h3 className="text-2xl font-bold text-white">
                                Global City Search
                            </h3>

                            <p className="text-white/75 mt-3 leading-7">
                                Search for cities around the world and quickly
                                move the map to the selected location.
                            </p>

                        </div>

                    </div>

                </div>


                {/* ============================= */}
                {/* HOW IT WORKS */}
                {/* ============================= */}

                <div className="bg-white/15 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl mb-10">

                    <div className="text-center mb-10">

                        <h2 className="text-4xl font-bold text-white">
                            ⚡ How SkySense AI Works
                        </h2>

                        <p className="text-white/75 text-lg mt-3">
                            Weather data flows through multiple layers to create
                            a simple user experience.
                        </p>

                    </div>


                    <div className="grid md:grid-cols-4 gap-6">

                        <div className="text-center">

                            <div className="w-16 h-16 mx-auto rounded-full bg-white/20 flex items-center justify-center text-3xl">
                                📡
                            </div>

                            <h3 className="text-white font-bold text-xl mt-4">
                                01. Data
                            </h3>

                            <p className="text-white/70 mt-2">
                                Weather and storm data is collected from external
                                data services.
                            </p>

                        </div>


                        <div className="text-center">

                            <div className="w-16 h-16 mx-auto rounded-full bg-white/20 flex items-center justify-center text-3xl">
                                ⚙️
                            </div>

                            <h3 className="text-white font-bold text-xl mt-4">
                                02. Processing
                            </h3>

                            <p className="text-white/70 mt-2">
                                The backend processes and prepares the data for
                                the frontend.
                            </p>

                        </div>


                        <div className="text-center">

                            <div className="w-16 h-16 mx-auto rounded-full bg-white/20 flex items-center justify-center text-3xl">
                                🤖
                            </div>

                            <h3 className="text-white font-bold text-xl mt-4">
                                03. Intelligence
                            </h3>

                            <p className="text-white/70 mt-2">
                                AI assistance helps users understand weather
                                information naturally.
                            </p>

                        </div>


                        <div className="text-center">

                            <div className="w-16 h-16 mx-auto rounded-full bg-white/20 flex items-center justify-center text-3xl">
                                🌦️
                            </div>

                            <h3 className="text-white font-bold text-xl mt-4">
                                04. Experience
                            </h3>

                            <p className="text-white/70 mt-2">
                                Users receive weather information through a
                                simple interactive interface.
                            </p>

                        </div>

                    </div>

                </div>


                {/* ============================= */}
                {/* TECHNOLOGY STACK */}
                {/* ============================= */}

                <div className="bg-white/15 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl mb-10">

                    <div className="text-center mb-10">

                        <h2 className="text-4xl font-bold text-white">
                            🛠️ Technology Stack
                        </h2>

                        <p className="text-white/75 mt-3 text-lg">
                            Technologies used to build SkySense AI.
                        </p>

                    </div>


                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

                        {[
                            ["⚛️", "React.js"],
                            ["🎨", "Tailwind CSS"],
                            ["🟢", "Node.js"],
                            ["🚀", "Express.js"],
                            ["🌍", "Weather API"],
                            ["🤖", "Google Gemini AI"]
                        ].map(([icon, name]) => (

                            <div
                                key={name}
                                className="bg-white/10 rounded-2xl p-5 text-center border border-white/10 hover:bg-white/20 transition"
                            >

                                <div className="text-4xl">
                                    {icon}
                                </div>

                                <div className="text-white font-semibold mt-3">
                                    {name}
                                </div>

                            </div>

                        ))}

                    </div>

                </div>


                {/* ============================= */}
                {/* PROJECT GOAL */}
                {/* ============================= */}

                <div className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl mb-10 text-center">

                    <div className="text-6xl mb-5">
                        🎯
                    </div>

                    <h2 className="text-4xl font-bold text-white">
                        Our Goal
                    </h2>

                    <p className="text-white/80 text-lg md:text-xl leading-8 max-w-4xl mx-auto mt-5">
                        The goal of SkySense AI is to transform complex weather
                        information into an easy-to-understand digital
                        experience. By combining real-time data, interactive
                        visualization and artificial intelligence, the platform
                        aims to make weather information more accessible and
                        useful.
                    </p>

                </div>


                {/* ============================= */}
                {/* DEVELOPER */}
                {/* ============================= */}

                <div className="bg-white/15 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">

                    <div className="text-center">

                        <div className="text-6xl mb-5">
                            👨‍💻
                        </div>

                        <h2 className="text-4xl font-bold text-white">
                            Developer
                        </h2>

                        <h3 className="text-3xl font-bold text-white mt-5">
                            Aritra Paul
                        </h3>

                        <p className="text-white/80 text-lg mt-2">
                            BCA Student • Techno Main Salt Lake
                        </p>

                        <p className="text-white/70 max-w-2xl mx-auto mt-5 leading-7">
                            SkySense AI is developed as a modern full-stack
                            weather application combining frontend
                            technologies, backend services, APIs and
                            artificial intelligence.
                        </p>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default About;
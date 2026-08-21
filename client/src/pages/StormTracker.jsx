import StormMap from "../components/StormMap";

function StormTracker() {

    return (

        <div className="min-h-screen bg-gradient-to-br from-sky-500 via-cyan-500 to-blue-700 pt-32 pb-16 px-6">

            <div className="max-w-7xl mx-auto">

                {/* Heading */}

                <div className="text-center mb-10">

                    <h1 className="text-6xl font-extrabold text-white">

                        🌀 Live Storm Tracker

                    </h1>

                    <p className="text-white/80 text-xl mt-4">

                        Track hurricanes, cyclones and typhoons around
                        the world in real time.

                    </p>

                </div>

                {/* Storm Map */}

                <div className="bg-white/15 backdrop-blur-2xl rounded-3xl border border-white/20 p-6 shadow-2xl">

                    <StormMap />

                </div>

            </div>

        </div>

    );

}

export default StormTracker;
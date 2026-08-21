import { useState } from "react";

function SatelliteToggle({ satellite, setSatellite }) {

    return (

        <div className="flex gap-2">

            <button
                onClick={() => setSatellite(false)}
                className={`px-5 py-3 rounded-xl font-semibold transition-all
                ${!satellite
                        ? "bg-sky-600 text-white"
                        : "bg-white text-slate-700 hover:bg-gray-200"
                    }`}
            >
                🗺️ Normal
            </button>

            <button
                onClick={() => setSatellite(true)}
                className={`px-5 py-3 rounded-xl font-semibold transition-all
                ${satellite
                        ? "bg-green-600 text-white"
                        : "bg-white text-slate-700 hover:bg-gray-200"
                    }`}
            >
                🛰️ Satellite
            </button>

        </div>

    );

}

export default SatelliteToggle;
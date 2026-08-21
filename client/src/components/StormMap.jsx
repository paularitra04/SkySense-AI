import React, { useEffect } from "react";

import {
    MapContainer,
    TileLayer,
    CircleMarker,
    Popup,
    Polyline,
    useMap
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import useStorms from "../hooks/useStorms";
import StormPopup from "./StormPopup";


function MapController({ storms }) {

    const map = useMap();

    useEffect(() => {

        if (!storms || storms.length === 0) {
            return;
        }

        const firstStorm = storms[0];

        if (
            typeof firstStorm.latitude === "number" &&
            typeof firstStorm.longitude === "number"
        ) {

            map.setView(
                [
                    firstStorm.latitude,
                    firstStorm.longitude
                ],
                3
            );

        }

    }, [storms, map]);

    return null;
}


function StormMap() {

    const {
        storms,
        loading,
        error,
        refreshStorms
    } = useStorms();


    useEffect(() => {

        refreshStorms();

    }, []);


    return (

        <div className="space-y-6">

            {/* ========================= */}
            {/* HEADER */}
            {/* ========================= */}

            <div className="flex items-center justify-between">

                <div>

                    <h2 className="text-3xl font-bold text-white">
                        🌍 Global Storm Map
                    </h2>

                    <p className="text-white/70">
                        Live hurricanes, cyclones & typhoons
                    </p>

                </div>


                <button
                    onClick={refreshStorms}
                    className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-3 rounded-xl font-semibold"
                >

                    🔄 Refresh

                </button>

            </div>


            {/* ========================= */}
            {/* STATUS */}
            {/* ========================= */}

            {loading && (

                <div className="text-center text-white text-xl">

                    🌪️ Loading live storms...

                </div>

            )}


            {error && (

                <div className="bg-red-500/20 border border-red-400 rounded-xl p-4 text-white">

                    {error}

                </div>

            )}


            {/* ========================= */}
            {/* DEBUG / LIVE STATUS */}
            {/* ========================= */}

            <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-4 text-white">

                <h3 className="text-lg font-bold mb-2">
                    🌪️ Live Storm Status
                </h3>


                {storms.length === 0 ? (

                    <p className="text-white/70">
                        No active storms detected.
                    </p>

                ) : (

                    storms.map((storm) => (

                        <div
                            key={storm.id}
                            className="mb-2"
                        >

                            <span className="font-bold">
                                {storm.name}
                            </span>

                            {" — "}

                            {storm.type}

                            {" — "}

                            {storm.wind} kt

                            {" — "}

                            {Number(storm.latitude).toFixed(2)}°,

                            {" "}

                            {Number(storm.longitude).toFixed(2)}°

                        </div>

                    ))

                )}

            </div>


            {/* ========================= */}
            {/* MAP */}
            {/* ========================= */}

            <div className="rounded-3xl overflow-hidden shadow-2xl">

                <MapContainer

                    center={[20, 140]}

                    zoom={3}

                    minZoom={2}

                    style={{
                        height: "700px",
                        width: "100%"
                    }}

                >

                    <TileLayer

                        attribution="© OpenStreetMap contributors"

                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

                    />


                    <MapController
                        storms={storms}
                    />


                    {/* ========================= */}
                    {/* STORMS */}
                    {/* ========================= */}

                    {storms.map((storm) => (

                        <React.Fragment
                            key={storm.id}
                        >

                            {/* Storm marker */}

                            <CircleMarker

                                center={[
                                    Number(storm.latitude),
                                    Number(storm.longitude)
                                ]}

                                radius={
                                    storm.wind >= 120
                                        ? 18
                                        : storm.wind >= 80
                                            ? 16
                                            : storm.wind >= 40
                                                ? 14
                                                : 12
                                }

                                pathOptions={{

                                    color: "#ffffff",

                                    fillColor:
                                        storm.wind >= 64
                                            ? "#ff0000"
                                            : "#ff6600",

                                    fillOpacity: 1,

                                    weight: 3

                                }}

                            >

                                <Popup minWidth={300}>

                                    <StormPopup
                                        storm={storm}
                                    />

                                </Popup>

                            </CircleMarker>


                            {/* Storm track */}

                            {storm.track &&
                                storm.track.length > 1 && (

                                    <Polyline

                                        positions={storm.track.map(
                                            (point) => [
                                                Number(point[0]),
                                                Number(point[1])
                                            ]
                                        )}

                                        pathOptions={{

                                            color: "#ff6600",

                                            weight: 5,

                                            opacity: 1

                                        }}

                                    />

                                )}

                        </React.Fragment>

                    ))}

                </MapContainer>

            </div>


            {/* ========================= */}
            {/* STATISTICS */}
            {/* ========================= */}

            <div className="grid md:grid-cols-4 gap-5">


                <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-6 text-center">

                    <h3 className="text-white text-xl font-bold">
                        🌀 Active Storms
                    </h3>

                    <p className="text-4xl font-extrabold text-white mt-3">
                        {storms.length}
                    </p>

                </div>


                <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-6 text-center">

                    <h3 className="text-white text-xl font-bold">
                        🌍 Coverage
                    </h3>

                    <p className="text-2xl text-white mt-3">
                        Worldwide
                    </p>

                </div>


                <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-6 text-center">

                    <h3 className="text-white text-xl font-bold">
                        ⏱ Updated
                    </h3>

                    <p className="text-2xl text-white mt-3">
                        Live
                    </p>

                </div>


                <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-6 text-center">

                    <h3 className="text-white text-xl font-bold">
                        🔄 Refresh
                    </h3>

                    <p className="text-2xl text-white mt-3">
                        5 min
                    </p>

                </div>

            </div>

        </div>

    );

}


export default StormMap;
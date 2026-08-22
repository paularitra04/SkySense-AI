import { useEffect, useState } from "react";

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    LayersControl,
    useMap,
    useMapEvents
} from "react-leaflet";

import L from "leaflet";

import useMapWeather from "../hooks/useMapWeather";
import StormLayer from "./StormLayer";
import MapWeatherPopUp from "./MapWeatherPopUp";

// ======================================
// Fix Leaflet marker icons
// ======================================

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});

// ======================================
// Fly to selected location
// ======================================

function FlyToLocation({ position }) {

    const map = useMap();

    useEffect(() => {

        if (position) {

            map.flyTo(position, 10, {
                duration: 1.5
            });

        }

    }, [position, map]);

    return null;
}

// ======================================
// Detect click on map
// ======================================

function ClickHandler({ onClick }) {

    useMapEvents({

        click(e) {

            onClick(
                e.latlng.lat,
                e.latlng.lng
            );

        }

    });

    return null;
}

// ======================================
// Show all live storms
// ======================================

function StormViewButton({ storms }) {

    const map = useMap();

    function showStorms() {

        if (!storms || storms.length === 0) {

            alert("No active storms detected.");

            return;
        }

        const validStorms = storms.filter(
            storm =>
                Number.isFinite(Number(storm.latitude)) &&
                Number.isFinite(Number(storm.longitude))
        );

        if (validStorms.length === 0) {

            alert("Storm coordinates are unavailable.");

            return;
        }

        const bounds = L.latLngBounds(
            validStorms.map(storm => [
                Number(storm.latitude),
                Number(storm.longitude)
            ])
        );

        map.fitBounds(bounds, {
            padding: [100, 100],
            maxZoom: 5,
            animate: true
        });
    }

    return (

        <button
            onClick={showStorms}
            className="
                absolute
                top-4
                right-16
                z-[1000]
                bg-red-600
                hover:bg-red-700
                text-white
                px-4
                py-3
                rounded-xl
                font-bold
                shadow-xl
            "
        >
            🌪️ View Live Storms ({storms.length})
        </button>

    );
}

// ======================================
// Main Component
// ======================================

function WeatherMap({ storms = [] }) {

    const {
        selectedLocation,
        loading,
        fetchWeather
    } = useMapWeather();

    const [position, setPosition] = useState([
        22.5726,
        88.3639
    ]);

    const [search, setSearch] = useState("");

    // ======================================
    // Get current location
    // ======================================

    useEffect(() => {

        if (!navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition(

            async (pos) => {

                const lat = pos.coords.latitude;
                const lon = pos.coords.longitude;

                setPosition([
                    lat,
                    lon
                ]);

                await fetchWeather(
                    lat,
                    lon
                );

            },

            () => {

                console.log(
                    "Location permission denied."
                );

            }

        );

    }, []);

    // ======================================
    // Click anywhere on map
    // ======================================

    async function handleMapClick(lat, lon) {

        setPosition([
            lat,
            lon
        ]);

        await fetchWeather(
            lat,
            lon
        );

    }

    // ======================================
    // Search city
    // ======================================

    async function searchLocation() {

        if (!search.trim()) return;

        try {

            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(search)}`
            );

            const data = await response.json();

            if (!data.length) {

                alert("Location not found.");

                return;
            }

            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);

            setPosition([
                lat,
                lon
            ]);

            await fetchWeather(
                lat,
                lon
            );

        } catch (error) {

            console.error(error);

            alert(
                "Unable to search this location."
            );

        }

    }

    // ======================================
    // Current location
    // ======================================

    function goToCurrentLocation() {

        if (!navigator.geolocation) {

            alert(
                "Geolocation is not supported."
            );

            return;
        }

        navigator.geolocation.getCurrentPosition(

            async (position) => {

                const lat =
                    position.coords.latitude;

                const lon =
                    position.coords.longitude;

                setPosition([
                    lat,
                    lon
                ]);

                await fetchWeather(
                    lat,
                    lon
                );

            },

            () => {

                alert(
                    "Location permission denied."
                );

            }

        );

    }

    return (

        <div className="space-y-6">

            {/* ================================= */}
            {/* Top Controls */}
            {/* ================================= */}

            <div className="flex flex-col lg:flex-row gap-4">

                <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    onKeyDown={(e) => {

                        if (e.key === "Enter") {

                            searchLocation();

                        }

                    }}
                    placeholder="🔍 Search any city..."
                    className="
                        flex-1
                        rounded-xl
                        border
                        border-gray-300
                        px-5
                        py-3
                        outline-none
                        focus:ring-2
                        focus:ring-sky-500
                    "
                />

                <button
                    onClick={searchLocation}
                    className="
                        bg-sky-600
                        hover:bg-sky-700
                        text-white
                        px-6
                        py-3
                        rounded-xl
                    "
                >
                    Search
                </button>

                <button
                    onClick={goToCurrentLocation}
                    className="
                        bg-green-600
                        hover:bg-green-700
                        text-white
                        px-6
                        py-3
                        rounded-xl
                    "
                >
                    📍 My Location
                </button>

            </div>

            {/* ================================= */}
            {/* Storm Information */}
            {/* ================================= */}

            {storms.length > 0 && (

                <div
                    className="
                        bg-red-500/10
                        border
                        border-red-300
                        rounded-2xl
                        p-4
                    "
                >

                    <h3
                        className="
                            text-red-700
                            font-bold
                            text-xl
                        "
                    >
                        🌪️ {storms.length} Active Storm
                        {storms.length > 1 ? "s" : ""}
                    </h3>

                    <p className="text-gray-700 mt-1">
                        Live storms are displayed directly on the map.
                    </p>

                </div>

            )}

            {/* ================================= */}
            {/* Loading */}
            {/* ================================= */}

            {loading && (

                <div
                    className="
                        text-center
                        text-sky-600
                        font-bold
                        text-lg
                    "
                >
                    Loading weather...
                </div>

            )}

            {/* ================================= */}
            {/* MAP */}
            {/* ================================= */}

            <div
                className="
                    rounded-3xl
                    overflow-hidden
                    shadow-2xl
                "
            >

                <MapContainer
                    center={position}
                    zoom={6}
                    scrollWheelZoom={true}
                    style={{
                        height: "650px",
                        width: "100%"
                    }}
                >

                    {/* ================================= */}
                    {/* Storm Button */}
                    {/* ================================= */}

                    <StormViewButton
                        storms={storms}
                    />

                    {/* ================================= */}
                    {/* Map Layers */}
                    {/* ================================= */}

                    <LayersControl
                        position="topright"
                    >

                        {/* Normal Map */}

                        <LayersControl.BaseLayer
                            checked
                            name="🗺️ Normal Map"
                        >

                            <TileLayer
                                attribution="© OpenStreetMap contributors"
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                        </LayersControl.BaseLayer>

                        {/* Satellite Map */}

                        <LayersControl.BaseLayer
                            name="🛰️ Satellite"
                        >

                            <TileLayer
                                attribution="Tiles © Esri"
                                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                            />

                        </LayersControl.BaseLayer>

                    </LayersControl>

                    {/* ================================= */}
                    {/* Fly to weather location */}
                    {/* ================================= */}

                    <FlyToLocation
                        position={position}
                    />

                    {/* ================================= */}
                    {/* Map Click */}
                    {/* ================================= */}

                    <ClickHandler
                        onClick={handleMapClick}
                    />

                    {/* ================================= */}
                    {/* Weather Marker */}
                    {/* ================================= */}

                    {selectedLocation && (

                        <Marker
                            position={[
                                selectedLocation.lat,
                                selectedLocation.lon
                            ]}
                        >

                            <Popup
                                minWidth={340}
                            >

                                <MapWeatherPopup
                                    location={
                                        selectedLocation
                                    }
                                />

                            </Popup>

                        </Marker>

                    )}

                    {/* ================================= */}
                    {/* LIVE STORM LAYER */}
                    {/* ================================= */}

                    <StormLayer
                        storms={storms}
                    />

                </MapContainer>

            </div>

        </div>

    );

}

export default WeatherMap;
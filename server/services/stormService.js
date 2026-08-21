import axios from "axios";

const OBSERVED_POSITION_URL =
    "https://services9.arcgis.com/RHVPKKiFTONKtxq3/ArcGIS/rest/services/Active_Hurricanes_v1/FeatureServer/1/query";

const OBSERVED_TRACK_URL =
    "https://services9.arcgis.com/RHVPKKiFTONKtxq3/ArcGIS/rest/services/Active_Hurricanes_v1/FeatureServer/3/query";

// =====================================================
// Fetch current storm positions
// =====================================================

async function fetchObservedPositions() {

    const response = await axios.get(
        OBSERVED_POSITION_URL,
        {
            params: {
                where: "1=1",
                outFields: "*",
                returnGeometry: true,
                f: "json"
            },
            timeout: 15000
        }
    );

    return response.data.features || [];
}

// =====================================================
// Fetch current storm tracks
// =====================================================

async function fetchObservedTracks() {

    const response = await axios.get(
        OBSERVED_TRACK_URL,
        {
            params: {
                where: "1=1",
                outFields: "*",
                returnGeometry: true,
                f: "json"
            },
            timeout: 15000
        }
    );

    return response.data.features || [];
}

// =====================================================
// Convert ArcGIS geometry to Leaflet coordinates
// =====================================================

function convertPaths(paths) {

    const coordinates = [];

    if (!paths) {
        return coordinates;
    }

    for (const path of paths) {

        for (const point of path) {

            if (
                Array.isArray(point) &&
                point.length >= 2
            ) {

                coordinates.push([
                    Number(point[1]),
                    Number(point[0])
                ]);

            }

        }

    }

    return coordinates;
}

// =====================================================
// Remove duplicate coordinates
// =====================================================

function removeDuplicates(points) {

    const result = [];

    const seen = new Set();

    for (const point of points) {

        const key =
            `${point[0].toFixed(5)},${point[1].toFixed(5)}`;

        if (!seen.has(key)) {

            seen.add(key);

            result.push(point);

        }

    }

    return result;
}

// =====================================================
// MAIN
// =====================================================

export async function getActiveStorms() {

    console.log("🌪 Fetching live storm data...");

    const [
        positionFeatures,
        trackFeatures
    ] = await Promise.all([
        fetchObservedPositions(),
        fetchObservedTracks()
    ]);

    console.log(
        `📍 Positions received: ${positionFeatures.length}`
    );

    console.log(
        `🛤 Tracks received: ${trackFeatures.length}`
    );

    // =================================================
    // Find latest position of every storm
    // =================================================

    const storms = {};

    for (const feature of positionFeatures) {

        const attributes =
            feature.attributes || {};

        const geometry =
            feature.geometry || {};

        const stormId =
            attributes.STORMID;

        if (!stormId) {
            continue;
        }

        const dtg =
            Number(attributes.DTG || 0);

        // Only keep latest observation
        if (
            storms[stormId] &&
            dtg <= storms[stormId].dtg
        ) {
            continue;
        }

        if (
            geometry.x === undefined ||
            geometry.y === undefined
        ) {
            continue;
        }

        storms[stormId] = {

            id: stormId,

            dtg,

            name:
                attributes.STORMNAME ||
                "Unnamed Storm",

            basin:
                attributes.BASIN ||
                "Unknown",

            type:
                attributes.STORMTYPE ||
                "Tropical Cyclone",

            category:
                Number(attributes.SS || 0),

            wind:
                Number(attributes.INTENSITY || 0),

            pressure:
                Number(attributes.MSLP || 0),

            latitude:
                Number(geometry.y),

            longitude:
                Number(geometry.x),

            updated:
                dtg
                    ? new Date(dtg).toISOString()
                    : new Date().toISOString(),

            track: []

        };

    }

    // =================================================
    // Attach tracks
    // =================================================

    for (const feature of trackFeatures) {

        const attributes =
            feature.attributes || {};

        const geometry =
            feature.geometry || {};

        const stormId =
            attributes.STORMID;

        if (!stormId) {
            continue;
        }

        if (!storms[stormId]) {
            continue;
        }

        const coordinates =
            convertPaths(
                geometry.paths
            );

        storms[stormId].track.push(
            ...coordinates
        );

    }

    // =================================================
    // Clean tracks
    // =================================================

    const result =
        Object.values(storms).map(
            (storm) => {

                storm.track =
                    removeDuplicates(
                        storm.track
                    );

                return storm;

            }
        );

    console.log(
        `🌪 Active storms found: ${result.length}`
    );

    // Debug information
    for (const storm of result) {

        console.log(
            `🌪 ${storm.name} | ` +
            `${storm.type} | ` +
            `${storm.wind} kt | ` +
            `${storm.latitude}, ${storm.longitude}`
        );

    }

    return result;

}
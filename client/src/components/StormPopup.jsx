function StormPopup({ storm }) {

    if (!storm) {
        return (
            <div
                style={{
                    padding: "15px",
                    color: "#111827"
                }}
            >
                <strong>
                    No storm information available.
                </strong>
            </div>
        );
    }

    const wind = Number(storm.wind);
    const latitude = Number(storm.latitude);
    const longitude = Number(storm.longitude);
    const pressure = Number(storm.pressure);
    const category = Number(storm.category);

    const safeWind = Number.isFinite(wind) ? wind : 0;

    // Knots → km/h
    const windKmh = Math.round(safeWind * 1.852);


    // ==========================================
    // Storm intensity
    // ==========================================

    function getIntensity() {

        if (category >= 5) {
            return "Category 5 Hurricane";
        }

        if (category === 4) {
            return "Category 4 Hurricane";
        }

        if (category === 3) {
            return "Category 3 Hurricane";
        }

        if (category === 2) {
            return "Category 2 Hurricane";
        }

        if (category === 1) {
            return "Category 1 Hurricane";
        }

        if (storm.type === "Tropical Storm") {
            return "Tropical Storm";
        }

        if (safeWind >= 34) {
            return "Tropical Storm";
        }

        return "Tropical Disturbance";
    }


    // ==========================================
    // Coordinates
    // ==========================================

    const latText = Number.isFinite(latitude)
        ? `${Math.abs(latitude).toFixed(2)}° ${latitude >= 0 ? "N" : "S"}`
        : "N/A";


    const lonText = Number.isFinite(longitude)
        ? `${Math.abs(longitude).toFixed(2)}° ${longitude >= 0 ? "E" : "W"}`
        : "N/A";


    // ==========================================
    // Updated time
    // ==========================================

    let updatedText = "N/A";

    if (storm.updated) {

        const date = new Date(storm.updated);

        if (!Number.isNaN(date.getTime())) {

            updatedText = date.toLocaleString(
                undefined,
                {
                    dateStyle: "medium",
                    timeStyle: "short"
                }
            );

        }

    }


    // ==========================================
    // Track
    // ==========================================

    const trackCount =
        Array.isArray(storm.track)
            ? storm.track.length
            : 0;


    return (

        <div
            style={{
                width: "330px",
                maxWidth: "90vw",
                fontFamily: "Arial, sans-serif",
                color: "#111827",
                overflow: "hidden",
                borderRadius: "14px",
                background: "white"
            }}
        >


            {/* ======================================
                HEADER
            ====================================== */}

            <div
                style={{
                    background:
                        "linear-gradient(135deg, #dc2626, #f97316)",
                    color: "white",
                    padding: "17px"
                }}
            >

                <div
                    style={{
                        fontSize: "23px",
                        fontWeight: "800"
                    }}
                >
                    🌪️ {storm.name || "Unnamed Storm"}
                </div>


                <div
                    style={{
                        marginTop: "5px",
                        fontSize: "14px",
                        fontWeight: "600",
                        opacity: 0.95
                    }}
                >
                    {getIntensity()}
                </div>

            </div>


            {/* ======================================
                BODY
            ====================================== */}

            <div
                style={{
                    padding: "15px"
                }}
            >


                {/* Storm Type */}

                <div
                    style={{
                        padding: "11px",
                        marginBottom: "10px",
                        background: "#fef2f2",
                        borderRadius: "10px"
                    }}
                >

                    <div
                        style={{
                            fontWeight: "700"
                        }}
                    >
                        🌀 Storm Type
                    </div>

                    <div
                        style={{
                            marginTop: "4px"
                        }}
                    >
                        {storm.type || "Unknown"}
                    </div>

                </div>


                {/* Wind */}

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px 0",
                        borderBottom: "1px solid #e5e7eb"
                    }}
                >

                    <strong>
                        💨 Wind Speed
                    </strong>

                    <div
                        style={{
                            textAlign: "right"
                        }}
                    >

                        <strong>
                            {Number.isFinite(wind)
                                ? `${wind} kt`
                                : "N/A"}
                        </strong>

                        <br />

                        <small
                            style={{
                                color: "#6b7280"
                            }}
                        >
                            {Number.isFinite(wind)
                                ? `≈ ${windKmh} km/h`
                                : ""}
                        </small>

                    </div>

                </div>


                {/* Pressure */}

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px 0",
                        borderBottom: "1px solid #e5e7eb"
                    }}
                >

                    <strong>
                        🌡️ Pressure
                    </strong>

                    <span>
                        {Number.isFinite(pressure) && pressure > 0
                            ? `${pressure} hPa`
                            : "N/A"}
                    </span>

                </div>


                {/* Category */}

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px 0",
                        borderBottom: "1px solid #e5e7eb"
                    }}
                >

                    <strong>
                        ⚠️ Category
                    </strong>

                    <span>
                        {Number.isFinite(category) && category > 0
                            ? `Category ${category}`
                            : "N/A"}
                    </span>

                </div>


                {/* Basin */}

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px 0",
                        borderBottom: "1px solid #e5e7eb"
                    }}
                >

                    <strong>
                        🌊 Basin
                    </strong>

                    <span>
                        {storm.basin || "N/A"}
                    </span>

                </div>


                {/* ======================================
                    CURRENT POSITION
                ====================================== */}

                <div
                    style={{
                        marginTop: "12px",
                        padding: "12px",
                        background: "#eff6ff",
                        borderRadius: "10px"
                    }}
                >

                    <div
                        style={{
                            fontWeight: "700",
                            marginBottom: "5px"
                        }}
                    >
                        📍 Current Position
                    </div>

                    <div
                        style={{
                            lineHeight: "1.6",
                            fontSize: "14px"
                        }}
                    >

                        Latitude:
                        {" "}
                        {latText}

                        <br />

                        Longitude:
                        {" "}
                        {lonText}

                    </div>

                </div>


                {/* ======================================
                    TRACK
                ====================================== */}

                <div
                    style={{
                        marginTop: "12px",
                        padding: "12px",
                        background: "#f9fafb",
                        borderRadius: "10px"
                    }}
                >

                    <div
                        style={{
                            fontWeight: "700"
                        }}
                    >
                        🛤️ Storm Track
                    </div>

                    <div
                        style={{
                            marginTop: "5px",
                            fontSize: "14px"
                        }}
                    >

                        {trackCount > 0
                            ? `${trackCount} recorded positions`
                            : "No track data available"}

                    </div>

                </div>


                {/* ======================================
                    STORM ID
                ====================================== */}

                <div
                    style={{
                        marginTop: "10px",
                        fontSize: "13px",
                        color: "#6b7280"
                    }}
                >

                    🆔 Storm ID:
                    {" "}
                    {storm.id || "N/A"}

                </div>


                {/* ======================================
                    LAST UPDATED
                ====================================== */}

                <div
                    style={{
                        marginTop: "8px",
                        paddingTop: "8px",
                        borderTop: "1px solid #e5e7eb",
                        fontSize: "12px",
                        color: "#6b7280"
                    }}
                >

                    🕒 Last Updated

                    <br />

                    {updatedText}

                </div>


            </div>

        </div>

    );

}

export default StormPopup;
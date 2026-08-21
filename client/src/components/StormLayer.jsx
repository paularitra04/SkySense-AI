import React from "react";

import {
    CircleMarker,
    Polyline,
    Popup
} from "react-leaflet";

import StormPopup from "./StormPopup";

function StormLayer({ storms = [] }) {

    return (
        <>
            {storms.map((storm) => (

                <React.Fragment
                    key={storm.id || storm.name}
                >

                    <CircleMarker
                        center={[
                            Number(storm.latitude),
                            Number(storm.longitude)
                        ]}
                        radius={
                            Number(storm.wind) >= 120
                                ? 16
                                : Number(storm.wind) >= 80
                                    ? 14
                                    : Number(storm.wind) >= 40
                                        ? 12
                                        : 10
                        }
                        pathOptions={{
                            color: "#ff0000",
                            fillColor: "#ff4500",
                            fillOpacity: 1,
                            weight: 3
                        }}
                    >

                        <Popup
                            minWidth={320}
                            maxWidth={350}
                        >

                            <StormPopup
                                storm={storm}
                            />

                        </Popup>

                    </CircleMarker>


                    {storm.track &&
                        storm.track.length > 1 && (

                            <Polyline
                                positions={storm.track.map(
                                    point => [
                                        Number(point[0]),
                                        Number(point[1])
                                    ]
                                )}
                                pathOptions={{
                                    color: "#ff4500",
                                    weight: 4,
                                    opacity: 0.9,
                                    dashArray: "8 8"
                                }}
                            />

                        )}

                </React.Fragment>

            ))}
        </>
    );
}

export default StormLayer;
import { useState } from "react";
import { getMapWeather } from "../../../server/services/MapApi";

function useMapWeather() {

    const [selectedLocation, setSelectedLocation] = useState(null);

    const [loading, setLoading] = useState(false);

    const fetchWeather = async (lat, lon) => {

        try {

            setLoading(true);

            const data = await getMapWeather(lat, lon);

            setSelectedLocation({

                lat,

                lon,

                weather: data.weather,

                air: data.air,

                place: data.place

            });

        } catch (error) {

            console.error("Weather Fetch Error:", error);

            setSelectedLocation({

                lat,

                lon,

                weather: {

                    name: "Unknown Location",

                    main: {
                        temp: "--",
                        feels_like: "--",
                        humidity: "--",
                        pressure: "--"
                    },

                    weather: [
                        {
                            main: "Unknown",
                            description: "Weather unavailable",
                            icon: "01d"
                        }
                    ],

                    wind: {
                        speed: "--"
                    },

                    visibility: 0,

                    sys: {
                        country: ""
                    }

                },

                air: {
                    list: [
                        {
                            main: {
                                aqi: 0
                            }
                        }
                    ]
                },

                place: {

                    name: "Unknown Location",

                    state: "",

                    country: ""

                }

            });

        } finally {

            setLoading(false);

        }

    };

    return {

        selectedLocation,

        loading,

        fetchWeather

    };

}

export default useMapWeather;
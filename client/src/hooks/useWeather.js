import { useEffect, useState } from "react";
import {
    getWeather,
    getWeatherByCoords
} from "../../../server/services/weatherApi";

function useWeather(city) {

    const [weather, setWeather] = useState(null);

    useEffect(() => {

        async function loadWeather() {

            try {

                if (navigator.geolocation) {

                    navigator.geolocation.getCurrentPosition(

                        async (position) => {

                            try {

                                const data =
                                    await getWeatherByCoords(
                                        position.coords.latitude,
                                        position.coords.longitude
                                    );

                                setWeather(data);

                            } catch {

                                const data = await getWeather(city);
                                setWeather(data);

                            }

                        },

                        async () => {

                            const data = await getWeather(city);
                            setWeather(data);

                        }

                    );

                } else {

                    const data = await getWeather(city);
                    setWeather(data);

                }

            } catch (error) {

                console.error("Weather Error:", error);

            }

        }

        loadWeather();

    }, [city]);

    return weather;

}

export default useWeather;
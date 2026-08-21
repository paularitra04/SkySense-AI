import { useEffect, useState } from "react";
import { getForecast } from "../../../server/services/weatherApi";

function useForecast(city) {

    const [forecast, setForecast] = useState([]);
    const [hourly, setHourly] = useState([]);

    useEffect(() => {

        async function loadForecast() {

            try {

                const data = await getForecast(city);

                if (!data || !data.list) {
                    setForecast([]);
                    setHourly([]);
                    return;
                }

                setHourly(data.list.slice(0, 8));

                const daily = data.list.filter(item =>
                    item.dt_txt.includes("12:00:00")
                );

                setForecast(daily);

            } catch (error) {

                console.error("Forecast Error:", error);

                setForecast([]);
                setHourly([]);

            }

        }

        loadForecast();

    }, [city]);

    return { forecast, hourly };

}

export default useForecast;
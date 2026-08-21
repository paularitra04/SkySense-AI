import { useEffect, useState } from "react";
import { getAirQuality } from "../../../server/services/weatherApi";

function useAirQuality(lat, lon) {

    const [aqi, setAqi] = useState(null);

    useEffect(() => {

        if (!lat || !lon) return;

        async function loadAQI() {

            try {

                const data = await getAirQuality(lat, lon);

                if (data && data.list && data.list.length > 0) {
                    setAqi(data.list[0]);
                } else {
                    setAqi(null);
                }

            } catch (error) {

                console.error("AQI Error:", error);
                setAqi(null);

            }

        }

        loadAQI();

    }, [lat, lon]);

    return aqi;

}

export default useAirQuality;
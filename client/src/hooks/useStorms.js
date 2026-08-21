import { useState } from "react";

function useStorms() {

    const [storms, setStorms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function refreshStorms() {

        try {

            setLoading(true);
            setError("");

            const response = await fetch(
                "http://localhost:5001/api/storms"
            );

            if (!response.ok) {
                throw new Error(
                    `Server error: ${response.status}`
                );
            }

            const data = await response.json();

            if (!data.success) {
                throw new Error(
                    data.message || "Unable to fetch storms"
                );
            }

            setStorms(data.storms || []);

        } catch (err) {

            console.error("Storm fetch error:", err);

            setError(
                "Unable to fetch live storm data."
            );

            setStorms([]);

        } finally {

            setLoading(false);

        }

    }

    return {
        storms,
        loading,
        error,
        refreshStorms
    };

}

export default useStorms;
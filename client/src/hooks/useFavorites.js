import { useEffect, useState } from "react";

function useFavorites() {

    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem("favorites");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    function addFavorite(city) {

        if (!favorites.includes(city)) {
            setFavorites([...favorites, city]);
        }

    }

    function removeFavorite(city) {
        setFavorites(favorites.filter(item => item !== city));
    }

    return {
        favorites,
        addFavorite,
        removeFavorite
    };

}

export default useFavorites;
function Hero() {

    const goToWeather = () => {

        const weatherSection = document.getElementById("weather-section");

        if (weatherSection) {
            weatherSection.scrollIntoView({
                behavior: "smooth"
            });
        }

    };

    return (

        <section className="min-h-[55vh] flex flex-col justify-center items-center text-white pt-24">

            <h1 className="text-6xl font-extrabold">
                🌤️ SkySense AI
            </h1>

            <p className="text-2xl mt-6 max-w-3xl">
                Your AI-powered weather companion with live forecasts,
                intelligent weather advice, maps and personalized recommendations.
            </p>

            <button
                onClick={() => {
                    document.getElementById("weather-section")?.scrollIntoView({
                        behavior: "smooth"
                    });
                }}
                className="mt-8 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-semibold"
            >
                Get Started
            </button>

        </section>

    );

}

export default Hero;
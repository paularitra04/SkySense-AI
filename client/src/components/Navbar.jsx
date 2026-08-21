import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();

    const scrollToAI = () => {

        if (location.pathname !== "/") {

            navigate("/");

            setTimeout(() => {

                const section = document.getElementById("ai-assistant");

                if (section) {
                    section.scrollIntoView({
                        behavior: "smooth"
                    });
                }

            }, 500);

        } else {

            const section = document.getElementById("ai-assistant");

            if (section) {
                section.scrollIntoView({
                    behavior: "smooth"
                });
            }

        }

    };

    return (

        <nav
            className="
    fixed top-0 left-0 w-full z-50
    bg-sky-900/20 backdrop-blur-2xl
    border-b border-white/10
    flex justify-between items-center
    px-10 py-5
    shadow-lg
">
            <h1 className="text-4xl font-extrabold text-white tracking-wide">
                🌤️ SkySense AI
            </h1>
            <div className="flex gap-8 items-center">

                <Link
                    to="/"
                    className="text-white/90 hover:text-cyan-300 font-semibold transition duration-300"
                >
                    Home
                </Link>

                <Link
                    to="/maps"
                    className="text-white/90 hover:text-cyan-300 font-semibold transition duration-300"
                >
                    🗺️ Maps
                </Link>

                <button
                    onClick={scrollToAI}
                    className="text-white/90 hover:text-cyan-300 font-semibold transition duration-300"
                >
                    🤖 AI Assistant
                </button>

                <Link
                    to="/about"
                    className="text-white/90 hover:text-cyan-300 font-semibold transition duration-300"
                >
                    About
                </Link>

            </div>

        </nav>

    );

}

export default Navbar;
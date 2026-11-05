
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const scrollToAI = () => {
        if (location.pathname !== "/") {
            navigate("/");

            setTimeout(() => {
                document.getElementById("ai-assistant")?.scrollIntoView({
                    behavior: "smooth"
                });
            }, 500);
        } else {
            document.getElementById("ai-assistant")?.scrollIntoView({
                behavior: "smooth"
            });
        }
    };

    const navLink =
        "relative text-sm md:text-base font-semibold text-white/90 " +
        "hover:text-cyan-300 transition-all duration-300";

    const activeLink =
        "text-cyan-300 after:absolute after:left-0 after:-bottom-2 " +
        "after:w-full after:h-[2px] after:bg-cyan-300 after:rounded-full";

    return (
        <nav className="
            sticky top-0 z-50 w-full
            bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900
            border-b border-cyan-400/20
            shadow-lg shadow-black/20
        ">
            <div className="
                max-w-7xl mx-auto
                flex justify-between items-center
                px-4 sm:px-6 lg:px-10
                py-4
            ">

                {/* Brand */}
                <Link to="/" className="flex items-center gap-2">
                    <span className="text-3xl md:text-4xl">🌤️</span>
                    <span className="
                        text-2xl md:text-3xl
                        font-extrabold tracking-tight
                        text-white
                    ">
                        SkySense <span className="text-cyan-400">AI</span>
                    </span>
                </Link>

                {/* Navigation */}
                <div className="
                    flex items-center
                    gap-3 sm:gap-5 lg:gap-9
                ">
                    <Link
                        to="/"
                        className={`${navLink} ${location.pathname === "/" ? activeLink : ""
                            }`}
                    >
                        Home
                    </Link>

                    <Link
                        to="/maps"
                        className={`${navLink} ${location.pathname === "/maps" ? activeLink : ""
                            }`}
                    >
                        Maps
                    </Link>

                    <button
                        onClick={scrollToAI}
                        className={`
                            ${navLink}
                            ${location.hash === "#ai-assistant" ? activeLink : ""}
                        `}
                    >
                        AI Assistant
                    </button>

                    <Link
                        to="/about"
                        className={`${navLink} ${location.pathname === "/about" ? activeLink : ""
                            }`}
                    >
                        About
                    </Link>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;

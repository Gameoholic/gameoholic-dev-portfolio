import { NavLink, useNavigate } from "react-router-dom";
import { smoothScrollToTop, smoothScrollToElement } from "../lib/scroll";

const AVATAR_SRC = "/avatar.jpg";

export default function Navbar() {
    const navigate = useNavigate();

    return (
        <nav className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between border-b border-stone-800/60 bg-stone-950/80 px-6 py-4 backdrop-blur-sm md:px-16 lg:px-32">
            <a
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    if (window.location.pathname === "/") {
                        smoothScrollToTop();
                    } else {
                        navigate("/");
                        setTimeout(
                            () => smoothScrollToElement("projects"),
                            100
                        );
                    }
                }}
                className="group flex items-center gap-3"
            >
                <img
                    src={AVATAR_SRC}
                    alt=""
                    className="h-9 w-9 rounded-sm object-cover ring-1 ring-stone-700 transition-all group-hover:ring-amber-400/60"
                />
                <span className="font-mono text-xs tracking-widest text-stone-500 uppercase transition-colors group-hover:text-stone-300">
                    gameoholic.dev
                </span>
            </a>

            <div className="flex items-center gap-8">
                <NavLink
                    to="/projects"
                    className={({ isActive }) =>
                        `font-mono text-xs tracking-widest uppercase transition-colors ${
                            isActive
                                ? "text-amber-400"
                                : "text-stone-400 hover:text-amber-400"
                        }`
                    }
                >
                    Projects
                </NavLink>

                <a
                    href="mailto:daniel@gameoholic.dev"
                    className="font-mono text-xs tracking-widest text-stone-400 uppercase transition-colors hover:text-amber-400"
                >
                    Contact
                </a>
            </div>
        </nav>
    );
}

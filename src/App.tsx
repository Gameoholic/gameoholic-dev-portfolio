import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProjectDetail from "./pages/projects/ProjectBase";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <div className="relative min-h-screen overflow-x-hidden bg-stone-950 text-stone-100">
                <div
                    className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    }}
                />

                <div className="relative z-10 flex min-h-screen flex-col">
                    <main className="flex-1">
                        <Routes>
                            <Route path="/" element={<Home />} />

                            <Route
                                path="/projects/:slug"
                                element={<ProjectDetail />}
                            />
                            <Route path="*" element={<Home />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </div>
        </BrowserRouter>
    );
}

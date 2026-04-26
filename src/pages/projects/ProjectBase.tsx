import { useParams, Navigate, useNavigate, Link } from "react-router-dom";
import { PROJECTS } from "../../lib/data";
import { OLDER_PROJECTS } from "../../lib/data";
import ChalkProject from "./Chalk";
import DanielsPortalProject from "./DanielsPortal";
import PartigonProject from "./Partigon";
import TrutensilsProject from "./Trutensils";
import TheStartupProject from "./TheStartup";
import BetterTicTacToe from "./BetterTicTacToe";
import { smoothScrollToElement } from "../../lib/scroll";
import type { JSX } from "react";

const PROJECT_COMPONENTS: Record<string, () => JSX.Element> = {
    chalk: ChalkProject,
    "daniels-portal": DanielsPortalProject,
    trutensils: TrutensilsProject,
    partigon: PartigonProject,
    "the-startup": TheStartupProject,
    "better-tic-tac-toe": BetterTicTacToe,
};

export default function ProjectDetail() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const project =
        PROJECTS.find((p) => p.slug === slug) ??
        OLDER_PROJECTS.find((p) => p.slug === slug);

    if (!project || !slug || !PROJECT_COMPONENTS[slug])
        return <Navigate to="/" replace />;

    const ProjectComponent = PROJECT_COMPONENTS[slug];

    return (
        <main className="px-6 pt-36 pb-24">
            <div className="mx-auto max-w-4xl">
                <button
                    onClick={() => {
                        navigate("/");
                        setTimeout(
                            () => smoothScrollToElement("projects"),
                            100
                        );
                    }}
                    className="mb-12 inline-flex cursor-pointer items-center gap-2 font-mono text-xs tracking-widest text-stone-500 uppercase transition-colors hover:text-amber-400"
                >
                    <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 16l-4-4m0 0l4-4m-4 4h18"
                        />
                    </svg>
                    All projects
                </button>

                <div className="mb-16">
                    <div className="mb-6 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="border border-stone-700 px-2 py-0.5 font-mono text-xs text-stone-500"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h1 className="font-display mb-6 text-5xl leading-tight font-black text-stone-100 md:text-6xl">
                        {project.title}
                    </h1>

                    <p className="font-body text-xl leading-relaxed text-stone-400">
                        {project.description}
                    </p>
                </div>

                <div className="mb-5 flex flex-wrap gap-3 border-b border-stone-800 pb-16">
                    {project.visitUrl && (
                        <a
                            href={project.visitUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-amber-400 px-8 py-4 font-mono text-sm font-bold tracking-widest text-stone-900 uppercase transition-colors hover:bg-amber-300"
                        >
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                            </svg>
                            Visit project
                        </a>
                    )}
                    {project.sourceUrl && (
                        <a
                            href={project.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 border border-stone-600 px-8 py-4 font-mono text-sm font-bold tracking-widest text-stone-300 uppercase transition-colors hover:border-stone-400 hover:text-stone-100"
                        >
                            <svg
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            View source
                        </a>
                    )}
                </div>

                <ProjectComponent />

                <div className="mt-24 border-t border-stone-800 pt-12">
                    <p className="mb-4 font-mono text-xs tracking-widest text-stone-600 uppercase">
                        Other projects
                    </p>
                    <div className="flex flex-wrap gap-4">
                        {[...PROJECTS, ...OLDER_PROJECTS]
                            .filter((p) => p.slug !== project.slug)
                            .map((p) => (
                                <Link
                                    key={p.slug}
                                    to={`/projects/${p.slug}`}
                                    className="font-display text-xl font-black text-stone-500 transition-colors hover:text-amber-400"
                                >
                                    {p.title}
                                </Link>
                            ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

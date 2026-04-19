import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import SkillGroup from "../components/SkillGroup";
import { PROJECTS, SKILL_GROUPS } from "../lib/data";

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        el.style.opacity = "0";
        el.style.transform = "translateY(24px)";
        requestAnimationFrame(() => {
            el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        });
    }, []);

    return (
        <div ref={containerRef}>
            <section className="mt-15 px-6 pt-10 pb-12 md:px-64 lg:px-128">
                <h1 className="font-display mb-4 text-5xl leading-tight font-black text-stone-100 md:text-6xl">
                    <span className="flex items-center gap-4 text-4xl">
                        Hi, I'm Daniel.
                        <img
                            src="/avatar.jpg"
                            alt=""
                            className="h-12 w-12 rounded-full object-cover"
                        />
                    </span>
                    I build{" "}
                    <span
                        style={{
                            display: "inline-flex",
                            alignItems: "baseline",
                        }}
                    >
                        <span className="relative inline-block">
                            <span className="relative z-10 text-amber-400">
                                backend systems
                                <span className="text-stone-100">.</span>
                            </span>
                            <span className="absolute right-0 bottom-1 left-0 z-0 hidden h-2 -rotate-1 bg-amber-400/20 md:block" />
                        </span>{" "}
                    </span>
                    <span className="block text-stone-400 italic">
                        The rest too, when needed.
                    </span>
                </h1>
                <p className="font-body max-w-2xl text-lg leading-relaxed text-stone-400">
                    Self-taught since I was a kid: Making silly just-for-fun
                    projects then, building grown-up projects now. I once spent
                    an entire weekend securing an auth system for an app with
                    exactly one user: me (
                    <Link
                        to="/projects/daniels-portal"
                        className="text-amber-400 transition-colors hover:text-amber-300"
                    >
                        portaldaniel.com
                    </Link>
                    )
                </p>
            </section>

            <section id="projects" className="px-6 pb-24 md:px-64 lg:px-128">
                <div className="mb-10 flex items-center gap-6">
                    <span className="font-mono text-xs tracking-[0.2em] text-amber-400 uppercase">
                        01
                    </span>
                    <h2 className="font-display text-4xl font-black text-stone-100 md:text-5xl">
                        Projects
                    </h2>
                    <div className="hidden h-px flex-1 bg-stone-800 md:block" />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {PROJECTS.map((project) => (
                        <ProjectCard key={project.slug} project={project} />
                    ))}
                </div>
            </section>

            <section
                id="skills"
                className="bg-stone-950/50 px-6 py-24 md:px-64 lg:px-128"
            >
                <div className="mb-16 flex items-center gap-6">
                    <span className="font-mono text-xs tracking-[0.2em] text-amber-400 uppercase">
                        02
                    </span>
                    <h2 className="font-display text-4xl font-black text-stone-100 md:text-5xl">
                        Skills & Technologies
                    </h2>
                    <div className="hidden h-px flex-1 bg-stone-800 md:block" />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {SKILL_GROUPS.map((group) => (
                        <SkillGroup key={group.label} group={group} />
                    ))}
                </div>
            </section>
        </div>
    );
}

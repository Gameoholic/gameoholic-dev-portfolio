import { useEffect, useRef } from "react";
import MediaPreview from "../../components/MediaPreview";
export default function ChalkProject() {
    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = 7;
        }
    }, []);
    const TECH = [
        "Node.js",
        "Express",
        "MongoDB",
        "React",
        "TypeScript",
        "JWT",
        "Docker",
        "Nginx",
        "GitHub Actions",
        "Sentry",
        "TailwindCSS",
    ];
    const TODO_LIST = [
        {
            category: "Performance",
            items: [
                "Divide boards into spatial chunks and only load what's visible, which becomes essential at scale.",
                'Pagination for the "My Boards" page instead of fetching everything at once.',
                <>
                    Simplify free-draw strokes using the{" "}
                    <a
                        href="https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-400 transition-colors hover:text-amber-300"
                    >
                        Ramer-Douglas-Peucker algorithm
                    </a>{" "}
                    to reduce point count before saving, which cuts down both
                    storage size and rendering cost on dense drawings.
                </>,
            ],
        },
        {
            category: "Security",
            items: [
                "Refresh token cycling has a known race condition: concurrent requests at the moment a token expires will all fail except the first. Auth service needs to handle this edge case.",
                "Refresh tokens should store the user ID so that logging out or changing a password invalidates all sessions.",
                "Object validation on upsert: no objects with absurd point counts, negative dimensions, invalid colors, etc. Currently the server trusts the client too much. This could be exploited to crash the client or fill up the database with junk data.",
                "Email verification on sign-up and forgot password flow.",
            ],
        },
        {
            category: "Developer Experience",
            items: [
                "Zod for runtime type validation (will also help with validating user data).",
                "Shared type package between client and server to avoid duplicated type definitions drifting out of sync.",
                <>
                    Rename PUT endpoints to PATCH.{" "}
                    <a
                        href="https://stackoverflow.com/questions/21660791/what-is-the-main-difference-between-patch-and-put-request"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-400 transition-colors hover:text-amber-300"
                    >
                        (Why?)
                    </a>
                </>,
                "React Query to replace the manual fetch/cache/retry logic that currently lives in custom hooks.",
            ],
        },
    ];
    return (
        <div className="max-w-4xl space-y-10">
            <MediaPreview src={"/chalk.mp4"} type={"video"} />

            <div>
                <h2 className="font-display mb-4 text-2xl font-black text-stone-100">
                    About
                </h2>
                <p className="font-body text-lg leading-relaxed text-stone-400">
                    Chalk is my first full-scale web app. I picked this project
                    because a whiteboard website is simple enough to get a quick
                    prototype working, but there's infinite room for features,
                    and it offers a lot of engineering challenges (scaling,
                    performance, UX). I avoided full-stack frameworks and
                    pre-built auth solutions, building those parts from scratch
                    instead.
                </p>
            </div>
            <div>
                <h2 className="font-display mb-6 text-2xl font-black text-stone-100">
                    Tech Stack
                </h2>
                <div className="flex flex-wrap gap-2">
                    {TECH.map((t) => (
                        <span
                            key={t}
                            className="border border-stone-700 bg-stone-800 px-3 py-1.5 font-mono text-xs text-stone-300"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </div>
            <div>
                <h2 className="font-display mb-4 text-2xl font-black text-stone-100">
                    Client Codebase Architecture
                </h2>
                <p className="font-body mb-4 text-lg leading-relaxed text-stone-400">
                    The biggest challenge in this project was the client
                    codebase. With the amount of features I was adding, and the
                    added challenge of client-server synchronization, it became
                    difficult to track objects and state across the codebase.
                </p>
                <p className="font-body mb-4 text-lg leading-relaxed text-stone-400">
                    To manage this, I designed a custom architecture for the
                    canvas code with strict separation. Each class has a single
                    responsibility and no knowledge of the others' internal
                    workings. I also used React's Context feature.
                </p>
                <p className="font-body mb-8 text-lg leading-relaxed text-stone-400">
                    This made it much easier to avoid stale closure bugs and
                    prop drilling hell. It also made it easy to reuse only
                    what's needed. For example, the board preview in "My Boards"
                    uses just the renderer with no input handling at all.
                </p>
                <div className="space-y-6">
                    {[
                        {
                            title: "CanvasEditor",
                            description:
                                "The top-level parent. Owns tool selection, user settings, and UI panels. Coordinates the other classes but doesn't touch rendering or input directly.",
                        },
                        {
                            title: "CanvasInteractive",
                            description:
                                "Handles all user input and drawing logic. Completely decoupled from how things are rendered. It produces objects, not pixels.",
                        },
                        {
                            title: "CanvasRenderer",
                            description:
                                "A black box that accepts objects and draws them. No knowledge of user state or input.",
                        },
                        {
                            title: "CanvasDOMRenderer",
                            description:
                                "The lowest level: Sets up the actual DOM canvas element, manages the animation frame loop.",
                        },
                    ].map((item) => (
                        <div
                            key={item.title}
                            className="border-l-4 border-amber-400/40 pl-6"
                        >
                            <h3 className="font-display mb-1 text-lg font-black text-stone-200">
                                {item.title}
                            </h3>
                            <p className="font-body text-lg leading-relaxed text-stone-400">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h2 className="font-display mb-4 text-2xl font-black text-stone-100">
                    Auto-save & Sync
                </h2>
                <p className="font-body mb-6 text-lg leading-relaxed text-stone-400">
                    A canvas app generates a lot of writes. Every stroke, camera
                    move & zoom is a REST API call and a database query. Saving
                    on every change is a naive approach that could overwhelm the
                    database if we scale, so I built a queuing system instead.
                </p>
                <div className="space-y-4">
                    {[
                        "Changes are saved locally and queued. A save request only fires once the previous one completes, then waits a configurable cooldown before the next. While users can theoretically bypass this, the client-side limit isn't meant to be a catch-all. Nginx handles the actual rate limiting.",
                        'This means the rule is "no more than one save per N seconds", not "save every N seconds". No unnecessary saves or waiting if nothing\'s changed.',
                        "If the user tries to leave the page, the cooldown is bypassed and an immediate save is attempted for UX reasons.",
                        "If a request fails (network drop, server error, etc.), the system retries automatically, merging any new changes that accumulated during the failed request into the next attempt. Users can keep drawing offline and it'll sync when connectivity returns.",
                    ].map((point, i) => (
                        <div key={i} className="flex gap-5">
                            <span className="mt-1 shrink-0 font-mono text-sm text-amber-400">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <p className="font-body text-lg leading-relaxed text-stone-400">
                                {point}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h2 className="font-display mb-4 text-2xl font-black text-stone-100">
                    Backend
                </h2>
                <p className="font-body mb-6 text-lg leading-relaxed text-stone-400">
                    The server follows a strict MVC structure with clear rules
                    for each layer: controllers validate that parameters exist
                    and call the relevant service method, services handle all
                    logic and sanitization, only models talk to the database.
                    Each layer does only its job and nothing else.
                </p>
                <p className="font-body mb-6 text-lg leading-relaxed text-stone-400">
                    Error handling uses TypeScript discriminated unions with the{" "}
                    <code className="rounded bg-stone-800 px-1.5 py-0.5 font-mono text-sm text-amber-200">
                        satisfies
                    </code>{" "}
                    operator throughout the call stack. Every error reason is a
                    typed literal: if an internal error is added, renamed, or
                    removed, the server won't compile until every switch
                    statement that handles it is updated. There's no silent
                    error path.
                </p>
                <p className="font-body text-lg leading-relaxed text-stone-400">
                    Authentication is a custom JWT implementation with DB-backed
                    refresh token cycling, httpOnly cookies, and bcrypt password
                    hashing. Chalk isn't a security-focused project, so account
                    registration doesn't require email verification for now, and
                    a few minor edge cases are unaddressed, see the{" "}
                    <a
                        href="https://github.com/Gameoholic/chalk#todo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-400 transition-colors hover:text-amber-300"
                    >
                        project's TODO list
                    </a>
                    .
                </p>
            </div>
            <div>
                <h2 className="font-display mb-4 text-2xl font-black text-stone-100">
                    Infrastructure
                </h2>
                <p className="font-body text-lg leading-relaxed text-stone-400">
                    The server runs in Docker on a Linux VPS, served through
                    Nginx. Deployments and testing are automated via GitHub
                    Actions. Sentry is wired up for error monitoring: production
                    errors hit my email directly so I know about them
                    immediately.
                </p>
            </div>
            <div>
                <h2 className="font-display mb-4 text-2xl font-black text-stone-100">
                    What's Missing & What I'd Do Differently
                </h2>
                <p className="font-body mb-8 text-lg leading-relaxed text-stone-400">
                    This project has a long todo list. These are the areas I
                    think matter most from an engineering standpoint.
                </p>
                <div className="space-y-10">
                    {TODO_LIST.map((section) => (
                        <div key={section.category}>
                            <h3 className="font-display mb-4 text-xl font-black text-stone-200">
                                {section.category}
                            </h3>
                            <div className="space-y-3">
                                {section.items.map((item, i) => (
                                    <div key={i} className="flex gap-5">
                                        <span className="mt-1 shrink-0 font-mono text-base text-amber-400">
                                            —
                                        </span>
                                        <p className="font-body text-lg leading-relaxed text-stone-400">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

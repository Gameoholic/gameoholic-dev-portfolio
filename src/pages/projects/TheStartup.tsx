import MediaPreview from "../../components/MediaPreview";

export default function TheStartupProject() {
    const TECH = ["Java", "Minecraft", "Plugin Development", "MySQL", "Redis"];

    return (
        <div className="max-w-4xl space-y-10">
            <MediaPreview src={"/the_startup.mp4"} type={"video"} />

            <div>
                <h2 className="font-display mb-4 text-2xl font-black text-stone-100">
                    About
                </h2>
                <p className="font-body mb-4 text-lg leading-relaxed text-stone-400">
                    The Startup was an event I built for the Minecraft server
                    TopStrix while working there as a developer, in
                    collaboration with Ben-Gurion University of the Negev. The
                    goal was to teach young players about entrepreneurship and
                    startups through video games.
                </p>
                <p className="font-body mb-4 text-lg leading-relaxed text-stone-400">
                    The event ran for over 3,000 unique players, with 16,000
                    logins in the first week alone, and was covered by national
                    press in both English and Hebrew.
                </p>
                <div className="mb-3">
                    <p className="mb-2 font-mono text-xs tracking-widest text-stone-400 uppercase">
                        English coverage
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <a
                            href="https://www.jpost.com/business-and-innovation/article-756945"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-amber-400 px-4 py-2.5 font-mono text-xs font-bold tracking-widest text-stone-900 uppercase transition-colors hover:bg-amber-300"
                        >
                            Jerusalem Post
                        </a>
                        <a
                            href="https://www.ynetnews.com/business/article/sypuhztph"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-amber-400 px-4 py-2.5 font-mono text-xs font-bold tracking-widest text-stone-900 uppercase transition-colors hover:bg-amber-300"
                        >
                            Ynet News
                        </a>
                        <a
                            href="https://americansforbgu.org/bgu-creates-vitual-campus-minecraft/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-amber-400 px-4 py-2.5 font-mono text-xs font-bold tracking-widest text-stone-900 uppercase transition-colors hover:bg-amber-300"
                        >
                            Americans for BGU
                        </a>
                    </div>
                </div>
                <div>
                    <p className="mb-2 font-mono text-xs tracking-widest text-stone-400 uppercase">
                        Hebrew coverage
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <a
                            href="https://www.ynet.co.il/environment-science/article/r1dsxq363"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-amber-400 px-4 py-2.5 font-mono text-xs font-bold tracking-widest text-stone-900 uppercase transition-colors hover:bg-amber-300"
                        >
                            Ynet
                        </a>
                        <a
                            href="https://finance.walla.co.il/item/3605437"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-amber-400 px-4 py-2.5 font-mono text-xs font-bold tracking-widest text-stone-900 uppercase transition-colors hover:bg-amber-300"
                        >
                            Walla
                        </a>
                        <a
                            href="https://www.bizportal.co.il/BizTech/news/article/818040"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-amber-400 px-4 py-2.5 font-mono text-xs font-bold tracking-widest text-stone-900 uppercase transition-colors hover:bg-amber-300"
                        >
                            Bizportal
                        </a>
                    </div>
                </div>
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
                    How it Worked
                </h2>
                <p className="font-body mb-4 text-lg leading-relaxed text-stone-400">
                    The event ran across four weeks, each with its own startup
                    categories (Design & Style, Fashion, Cyber, etc.). Players
                    talked to David Ben Gurion—the in-game mascot of the
                    university—to pick a category, then received a list of
                    themed tasks. The tasks themselves were pure vanilla
                    Minecraft (collect five "space suits" which are really iron
                    chestplates), but framed around the chosen startup theme. A
                    live panel tracked progress as players ventured out into the
                    world.
                </p>

                <p className="font-body mt-6 mb-4 text-lg leading-relaxed text-stone-400">
                    Once players finished all their tasks, they returned to
                    David and received an in-game book, which they used to write
                    up their actual startup idea following guidelines posted
                    around the in-game university. Submissions were saved to the
                    database for the university to review.
                </p>
                <p className="font-body text-lg leading-relaxed text-stone-400">
                    Players could then read each other's submissions and
                    "invest" in startups they thought would win, earning a small
                    prize if their pick made the top 10 that week. Every week
                    reset, with the winners and their ideas displayed
                    permanently near spawn.
                </p>
            </div>

            <div>
                <h2 className="font-display mb-4 text-2xl font-black text-stone-100">
                    Technical Notes
                </h2>
                <p className="font-body mb-4 text-lg leading-relaxed text-stone-400">
                    The plugin had to support hundreds of concurrent players
                    along with frequent database operations, all while staying
                    responsive. Player data was fetched on login and cached in
                    memory, then written back on logout, on important events
                    (task completion, startup submission), or every five minutes
                    as a fallback. If a database write failed, the player was
                    kicked with an explanation rather than silently losing
                    progress, and admins were notified.
                </p>
                <p className="font-body text-lg leading-relaxed text-stone-400">
                    The system was 100% configurable: strings, tasks, prizes,
                    week durations, scoreboard formatting, all of it lived in
                    config files. Together with the university and the rest of
                    the team of artists, designers and managers, we were able to
                    iterate on the event's design and content without needing to
                    change a single line of code.
                </p>
            </div>
        </div>
    );
}

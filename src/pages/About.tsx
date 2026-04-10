export default function About() {
    return (
        <main className="max-w-3xl px-6 pt-36 pb-24 md:px-16 lg:px-32">
            {/* Header */}
            <p className="mb-4 font-mono text-xs tracking-[0.25em] text-amber-400 uppercase">
                About me
            </p>
            <h1 className="font-display mb-12 text-5xl leading-tight font-black text-stone-100 md:text-6xl">
                I build things for the web.
                <br />
                <span className="text-stone-400 italic">
                    And occasionally for fun.
                </span>
            </h1>

            {/* Bio */}
            <div className="font-body space-y-6 text-base leading-relaxed text-stone-400">
                <p>
                    Hey — I'm Daniel. I'm a self-taught web developer based out
                    of wherever my laptop happens to be. I've been writing code
                    seriously for about five years, starting with jQuery
                    spaghetti and gradually working my way up to TypeScript
                    spaghetti.
                </p>
                <p>
                    My day-to-day is mostly React and Node.js, building products
                    that are fast, accessible, and don't fall over. I care a lot
                    about the details — the kind of thing users don't notice
                    when it's right, but definitely notice when it's wrong.
                </p>
                <p>
                    On nights and weekends, I make games. It started as a way to
                    scratch a creative itch and turned into something I take
                    almost as seriously as my actual job. There's something
                    uniquely satisfying about shipping a game and watching
                    strangers play it in ways you completely didn't anticipate.
                </p>
                <p>
                    If you want to work together, talk shop, or just say hey —
                    my inbox is always open.
                </p>
            </div>

            {/* Currently section */}
            <div className="mt-16 border-t border-stone-800 pt-12">
                <h2 className="font-display mb-6 text-2xl font-black text-stone-100">
                    Currently
                </h2>
                <ul className="font-body space-y-4 text-stone-400">
                    {[
                        {
                            label: "Working on",
                            value: "Shiplog — adding team collaboration features",
                        },
                        {
                            label: "Learning",
                            value: "Rust, very slowly and very humbling",
                        },
                        { label: "Playing", value: "Balatro (send help)" },
                        {
                            label: "Reading",
                            value: "A Pattern Language by Christopher Alexander",
                        },
                    ].map(({ label, value }) => (
                        <li key={label} className="flex gap-4">
                            <span className="w-28 shrink-0 pt-1 font-mono text-xs tracking-widest text-amber-400 uppercase">
                                {label}
                            </span>
                            <span>{value}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Contact CTA */}
            <div className="mt-16">
                <a
                    href="mailto:daniel@example.com"
                    className="group inline-flex items-center gap-3 bg-amber-400 px-7 py-4 font-mono text-sm font-bold tracking-widest text-stone-900 uppercase transition-colors hover:bg-amber-300"
                >
                    Get in touch
                    <svg
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                    </svg>
                </a>
            </div>
        </main>
    );
}

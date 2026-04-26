import MediaPreview from "../../components/MediaPreview";

export default function PartigonProject() {
    const TECH = ["Kotlin", "Paper", "Minecraft", "DSL"];

    return (
        <div className="max-w-4xl space-y-10">
            <MediaPreview src={"/partigon.mp4"} type={"video"} />

            <div>
                <h2 className="font-display mb-4 text-2xl font-black text-stone-100">
                    About
                </h2>
                <p className="font-body mb-4 text-lg leading-relaxed text-stone-400">
                    Partigon is a powerful Kotlin library for{" "}
                    <a
                        href="https://papermc.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-400 transition-colors hover:text-amber-300"
                    >
                        Paper
                    </a>{" "}
                    plugin developers that handles the math behind complex
                    Minecraft particle animations so you don't have to. Curves,
                    circles, lines, rotations and easing are defined
                    declaratively instead of writing trig functions manually.
                </p>
                <p className="font-body text-lg leading-relaxed text-stone-400">
                    Because it's written in Kotlin, the API leans on DSL
                    builders, inline methods, and extension functions. Plugis
                    that uses Partigon ends up looking less like math and more
                    like describing the animation you want.
                </p>
                <div className="flex flex-wrap gap-3 pt-3">
                    <a
                        href="https://partigon.gameoholic.xyz/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-amber-400 px-4 py-2.5 font-mono text-xs font-bold tracking-widest text-stone-900 uppercase transition-colors hover:bg-amber-300"
                    >
                        Full Documentation
                    </a>
                    <a
                        href="https://github.com/Gameoholic/PartigonExamplePlugin/tree/main/src/main/kotlin/xyz/gameoholic/partigonexampleplugin/particles/d_cool_examples"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 border border-stone-600 px-4 py-2.5 font-mono text-xs font-bold tracking-widest text-stone-300 uppercase transition-colors hover:border-stone-400 hover:text-stone-100"
                    >
                        Examples with Code
                    </a>
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
                    Envelopes
                </h2>
                <p className="font-body mb-4 text-lg leading-relaxed text-stone-400">
                    This is Partigon's main feature. Instead of accepting static
                    numbers as parameters, Partigon takes Envelopes (functions
                    that interpolate values over time) for every single property
                    of a Minecraft particle: position, offset (speed), count,
                    extra. The library ships with Linear, Trigonometric, and
                    Constant envelopes out of the box, plus Envelope Wrappers
                    that compose them into common shapes like circles and
                    curves. If you want to use a static value for a particle's
                    position, for example, you can just pass a constant
                    envelope.
                </p>
                <p className="font-body text-lg leading-relaxed text-stone-400">
                    Envelopes can also be nested, passed as values into other
                    envelopes, and the library evaluates them recursively at
                    runtime. That means properties can drive each other: a
                    circle's radius can pulse over time, a particle's count can
                    scale with its distance from the origin, and so on, allowing
                    for simple creation of what would otherwise be extremely
                    complicated animations.
                </p>
            </div>

            <div>
                <h2 className="font-display mb-4 text-2xl font-black text-stone-100">
                    Loops
                </h2>
                <p className="font-body mb-4 text-lg leading-relaxed text-stone-400">
                    Every Envelope is driven by a Loop, which decides what frame
                    index gets passed to the envelope on each tick.
                </p>
                <MediaPreview src={"/partigon_loops.mp4"} type={"video"} />
            </div>

            <div>
                <h2 className="font-display mb-4 text-2xl font-black text-stone-100">
                    Envelope Groups & Rotations
                </h2>
                <p className="font-body text-lg leading-relaxed text-stone-400">
                    Position and speed (offset) envelopes can be grouped
                    together so rotations apply across all three axes
                    simultaneously, which is necessary for shapes like circles
                    where rotating any one axis in isolation would just distort
                    the result. Rotations are themselves controlled by
                    envelopes, so a circle can be rotated continuously while
                    it's being drawn.
                </p>
            </div>
        </div>
    );
}

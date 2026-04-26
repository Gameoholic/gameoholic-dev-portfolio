import MediaPreview from "../../components/MediaPreview";

export default function BetterTicTacToeProject() {
    const TECH = [
        "Godot",
        "GDScript",
        "Distributed Systems",
        "Microservices",
        "ENet",
        "Server-Authoritative Networking",
    ];

    return (
        <div className="max-w-4xl space-y-10">
            <MediaPreview src={"/bttt.mp4"} type={"video"} />

            <div>
                <h2 className="font-display mb-4 text-2xl font-black text-stone-100">
                    About
                </h2>
                <p className="font-body mb-4 text-lg leading-relaxed text-stone-400">
                    Better Tic Tac Toe is a multiplayer mobile game built around
                    an idea I had in high school for fixing tic tac toe. The
                    original tic tac toe is a solved game with no strategy, so I
                    added a single mechanic—players can place Expansion Tiles to
                    expand the board in any direction—that turns it into a
                    30-minute strategic, fun match.
                </p>
                <p className="font-body text-lg leading-relaxed text-stone-400">
                    The interesting part isn't the game though, it's the
                    infastructure. The backend is a custom distributed system
                    with five service types, horizontal scaling, an
                    eventual-consistency database, cross-service event
                    broadcasting, and a server-authoritative architecture. All
                    of it was written from scratch in Godot and GDScript
                    (Godot's built-in language, similar to Python).
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
                    Architecture
                </h2>
                <p className="font-body mb-6 text-lg leading-relaxed text-stone-400">
                    The backend is split into five service types that can run on
                    one machine or across many. Each has a single
                    responsibility, talks only to the services it needs, and can
                    be horizontally scaled independently.
                </p>
                <div className="space-y-6">
                    {[
                        {
                            title: "Proxy",
                            description:
                                "The first service every client hits (I would name this a directory service today, since it's not an actual reverse proxy). Validates the client's version (rejecting outdated builds with a clear error message) and hands the client the IP of an available Gateway. Stays online even when game services are down for maintenance, so a player launching the app gets a clean \"servers are offline\" message instead of a connection timeout.",
                        },
                        {
                            title: "Gateway",
                            description:
                                "Handles login, account creation, and forwards authenticated players to game services. The only service that's allowed to talk to the Authentication service. DTLS-encrypted between client and Gateway. Multiple Gateway instances can run in parallel to spread login load.",
                        },
                        {
                            title: "Authentication",
                            description:
                                'Public ports are closed entirely, reachable only from the Gateway over the internal network. Handles password hashing with per-user salt, and issues short-lived game-server connection tokens after a successful login. Auth tokens for the "remember me" feature are hashed separately.',
                        },
                        {
                            title: "Master",
                            description:
                                "The orchestrator. Identifies and tracks every connected service, decides when to start new game servers (via the Load Balancer), routes authenticated players to the game server with the most capacity, and coordinates the periodic database merge across all game servers. Also handles cross-server social features like messaging and friend requests, and account-already-logged-in detection (kicks the existing session before letting the new one in).",
                        },
                        {
                            title: "Game Servers",
                            description:
                                "Where matches actually run. Each game server hosts up to ~3,800 concurrent players. Owns its own local player database that syncs back to Master every minute. Each match runs in its own short-lived game session that gets created when matchmaking pairs two players and destroyed when the match ends. New game servers are spawned automatically by the Load Balancer when capacity falls below 50%.",
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

            <MediaPreview
                src={"/bttt-full.mp4"}
                type={"video"}
                caption={"Full account creation and login flow (sound on)"}
            />

            <div>
                <h2 className="font-display mb-4 text-2xl font-black text-stone-100">
                    Eventual-Consistency Database
                </h2>
                <p className="font-body mb-4 text-lg leading-relaxed text-stone-400">
                    The obvious approach to a multiplayer backend would have
                    every game server hit a central database on every stat
                    update. With a thousand concurrent matches that's tens of
                    thousands of writes per second to one machine, and the
                    database becomes the bottleneck.
                </p>
                <p className="font-body mb-4 text-lg leading-relaxed text-stone-400">
                    Instead, each game server holds its own copy of the player
                    database for fast local reads, but also tracks every change
                    made since the last sync as relative and incremental data.
                    Once a minute the Master orchestrates a sync: it requests
                    the deltas from every game server, merges them into the main
                    DB, and then broadcasts the merged state back to every
                    server so they're all back in sync.
                </p>
            </div>

            <div>
                <h2 className="font-display mb-4 text-2xl font-black text-stone-100">
                    Server-Authoritative Validation
                </h2>
                <p className="font-body mb-4 text-lg leading-relaxed text-stone-400">
                    Every action a player takes, whether it's placing a tile,
                    expanding the board, ending a turn, surrendering, is sent as
                    an RPC to the game server, which then verifies it against
                    the full rules of the game before applying any state change.
                    Is it the player's turn? Does the cell actually exist and is
                    empty? Does the player have expansions? Is the game even
                    still running? All of it is checked server-side before
                    broadcasting it to the opponent. The server is the authority
                    here.
                </p>
                <p className="font-body text-lg leading-relaxed text-stone-400">
                    Failed validations are logged with a specific reason
                    ("Illegal move", "Not player's turn", "Timeout", "Impossible
                    input") and the offending client is kicked with an
                    explanation. Extra care is also taken not to kick an
                    innocent user who's just experience desync or timing issues:
                    In such a case, the request is rejected and the current
                    state of the game is sent back instead.
                </p>
            </div>

            <div>
                <h2 className="font-display mb-4 text-2xl font-black text-stone-100">
                    Matchmaking & Social
                </h2>
                <p className="font-body mb-4 text-lg leading-relaxed text-stone-400">
                    Matchmaking runs per game server: when two players queue for
                    the same game mode (Normal, Blitz, Bullet), a match session
                    is created, runs the game, and is deleted at the end.
                    Players only match with others on the same game server, but
                    friend requests, blocks, and incoming notifications work
                    across all servers because Master broadcasts those events.
                </p>
                <p className="font-body text-lg leading-relaxed text-stone-400">
                    There's also a live admin dashboard that pulls data from
                    every service every few seconds, showing service health,
                    concurrent matches and player counts per game server.
                </p>
            </div>

            <div>
                <h2 className="font-display mb-4 text-2xl font-black text-stone-100">
                    What I'd Do Differently
                </h2>
                <p className="font-body mb-4 text-lg leading-relaxed text-stone-400">
                    This project is from 2022 and I haven't touched it in years,
                    but a few things stand out looking back.
                </p>
                <div className="space-y-3">
                    {[
                        "Most of what the Proxy, Gateway, and Master do is stuff modern infrastructure handles for you. I built each of these by hand because I didn't know they existed at the time, but a real production setup would lean on existing tools rather than reimplementing them.",
                        "Real container orchestration. The LoadBalancer just runs OS.execute() to spawn new game server processes, so scaling across multiple machines would mean manual provisioning and configuration. Today I'd run this on something like Kubernetes or ECS with proper health checks and auto-scaling.",
                        "The dashboard is ok but a real system needs structured logging, metrics, and proper error monitoring. Prometheus, OpenTelemetry, Sentry, etc.",
                    ].map((item, i) => (
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
        </div>
    );
}

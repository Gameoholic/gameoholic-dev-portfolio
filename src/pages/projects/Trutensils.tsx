import MediaPreview from "../../components/MediaPreview";

export default function TrutensilsProject() {
    const TECH = [
        "Python",
        "OpenCV",
        "YOLO",
        "Raspberry Pi 5",
        "Node.js",
        "TypeScript",
        "Express",
        "React",
        "Socket.IO",
        "Flask",
        "Zod",
    ];

    return (
        <div className="max-w-4xl space-y-10">
            <div className="border-l-4 border-amber-400 bg-amber-400/5 px-5 py-4">
                <p className="font-body text-base leading-relaxed text-stone-300">
                    <span className="font-mono text-xs tracking-widest text-amber-400 uppercase">
                        ⚠ Work in progress
                    </span>
                    <br />
                    Currently in active development. Tested on-site at a real
                    restaurant, which prompted a redesign I'm now prototyping.
                </p>
            </div>

            <div>
                <h2 className="font-display mb-4 text-2xl font-black text-stone-100">
                    The Problem
                </h2>
                <p className="font-body mb-4 text-lg leading-relaxed text-stone-400">
                    Restaurant staff accidentally throw utensils into the trash
                    all the time. It's a real, expensive problem for
                    restaurants. Trutensils is a real-time computer vision
                    system that watches the bin and alerts the staff when a
                    utensil goes in.
                </p>

                <MediaPreview src={"/trutensils0.jpg"} type={"image"} />
            </div>

            <div>
                <h2 className="font-display mb-4 text-2xl font-black text-stone-100">
                    Requirements
                </h2>
                <div className="space-y-3">
                    {[
                        "One-time hardware purchase, no monthly fees. Restaurants won't pay a subscription for utensil detection. That rules out cloud inference and GPU servers and forces everything to run locally, including the detection model and the webserver.",
                        "High accuracy with very few false alerts. If staff get too many false alerts, they'll just ignore the system.",
                        "Easy to install. The hardware should fit into a normal restaurant kitchen without rewiring or reorganizing.",
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
                    System Architecture
                </h2>
                <p className="font-body mb-4 text-lg leading-relaxed text-stone-400">
                    Three components: a Python CV microservice running on the Pi
                    (OpenCV + YOLO), a Node.js orchestration server that spawns
                    and manages the microservice process, and a React control
                    panel for monitoring.
                </p>
                <p className="font-body text-lg leading-relaxed text-stone-400">
                    The client connects to the server over Socket.IO so every
                    connected client sees live state and detection events
                    without polling. Control actions (start, stop, status) go
                    through an HTTP API with a standard controller / service /
                    lib structure. The Node layer enforces that the Python
                    process can only be in one of three states (stopped /
                    starting / running), so two clients clicking start can't
                    double-spawn the microservice.
                </p>
            </div>

            <div>
                <h2 className="font-display mb-4 text-2xl font-black text-stone-100">
                    The Various Problems
                </h2>
                <p className="font-body mb-4 text-lg leading-relaxed text-stone-400">
                    I started with the obvious approach: a pretrained YOLO model
                    on the camera feed. It worked when utensils were close to
                    the camera but lost them once they entered the trash bin. I
                    then realized metal utensils reflect light, so I tried
                    detecting white objects in the frame with CV, but that
                    failed because other objects like tissues or rice are also
                    white. Finally, I realized the correct approach would be to
                    train a custom model with conditions as close to a real
                    restaurant as possible. So I got a restaurant-sized trash
                    bin and began collecting data.
                </p>
                <MediaPreview
                    src={"/trutensils1.jpg"}
                    type={"image"}
                    caption={"Bright-pixel masking method"}
                />
                <p className="font-body mb-4 text-lg leading-relaxed text-stone-400">
                    I took the prototype to a real restaurant (Truman & Co) and
                    immediately hit a wall. In a real kitchen, especially during
                    "peaks", the bin area is in total chaos and a fixed camera
                    mount just wouldn't survive. It's dirty, full of water and
                    grease, and the trash bag moves around a lot. But the real
                    problem was the food waste: unlike my tests at home,
                    utensils at the restaurant would sink the second they hit
                    the bag, missing detection completely. Detecting them
                    mid-air was also next to impossible.
                </p>
                <p className="font-body text-lg leading-relaxed text-stone-400">
                    So I'm now prototyping a custom trash bin. The Pi and camera
                    sit in a sealed housing at the top, protected from dirt,
                    grease and water. Below them is a chamber with a flap that
                    briefly holds whatever's being thrown away, so the
                    custom-trained YOLO model checks for utensils before it
                    drops into the bag. If it's a utensil, the unit's LEDs
                    flash. If staff don't pull it out, the system will alert the
                    owner via email/SMS, along with a video of the incident
                    viewable on the dashboard.
                </p>
            </div>

            <div>
                <h2 className="font-display mb-4 text-2xl font-black text-stone-100">
                    Next Steps
                </h2>
                <div className="space-y-3">
                    {[
                        "Make the bin prototype, use the Pi's GPIO and 3D print components.",
                        "Collect training data from the actual camera in an actual restaurant environment.",
                        "Bring hardware costs down. Cheaper alternatives to the Pi 5 exist, especially if I further optimize the model.",
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

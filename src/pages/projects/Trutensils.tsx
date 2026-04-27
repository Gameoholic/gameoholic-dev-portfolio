import { useState } from "react";
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

    const [showBrightPixelCode, setShowBrightPixelCode] = useState(false);

    const brightPixelCode = `
    # --------- Detect human in trash zone with YOLO --------- 
            ACCEPTABLE_CLASSES = {
                0: "human"
            }
            results = model.predict(
                raw_frame,
                classes=list(ACCEPTABLE_CLASSES.keys()),
                conf=0.4,
                iou=0.5,   # Non-maximum suppression threshold — drops duplicate boxes
                        # that overlap by more than 50%. Prevents the model reporting
                        # the same object twice from slightly different anchor positions.
                verbose=False
            )
            if results[0].boxes:
                for box in results[0].boxes:
                    # Get data
                    cls_id = int(box.cls)
                    label = ACCEPTABLE_CLASSES.get(cls_id, "unknown")
                    confidence = float(box.conf)
                    x1, y1, x2, y2 = box.xyxy[0].tolist()
                    x1, y1, x2, y2, w, h = int(x1), int(y1), int(x2), int(y2), int(x2-x1), int(y2-y1)

                    if label != "human":
                        continue

                    last_human_spotted_time = curr_time
                    # Draw detection
                    cv2.rectangle(annotated, (x1, y1), (x2, y2), (0, 0, 255), 2)
                    annotation_string = label + " (" + str(round(confidence * 100, 1)) + "%)"
                    object_center = (x1 + int(w/2), y1 + int(h/2))
                    cv2.putText(annotated, annotation_string, object_center, cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 1)


            # --------- Object detection in trash zone --------- 
            # Mask out all non-white pixels
            hsv_image = cv2.cvtColor(raw_frame, cv2.COLOR_RGB2HSV) # Convert image frame to HSV
            VALUE_TOLERATION = 45 # How much to tolerate change in value below 255 (45)
            SATURATION_TOLERATION = 50 # How much to tolerate change in saturation above 0. (50)
            lower_limit, upper_limit = get_limits_hsv(VALUE_TOLERATION, SATURATION_TOLERATION)
            mask_white_pixels = cv2.inRange(hsv_image, lower_limit, upper_limit)

            # Mask out everything outside of trash zone
            trash_zone_points = np.array([
                [250, 25],
                [380, 0],
                [500, 80],
                [560, 150],
                [480, 290],
                [350, 340],
                [320, 310],
                [240, 180],
            ], dtype=np.int32)
            mask_trash_zone = np.zeros(raw_frame.shape[:2], dtype=np.uint8) # Create blank np array, same size as the image frame
            cv2.fillPoly(mask_trash_zone, [trash_zone_points], 255) # Make everything inside the trash zone WHITE
            
            cv2.polylines(annotated, [trash_zone_points], isClosed=True, color=(255, 255, 255), thickness=2) # Preview trash zone

            # Combine trash zone mask with white pixels mask
            white_objects_in_trash_zone = cv2.bitwise_and(mask_white_pixels, mask_trash_zone)

            # Detect objects in trash zone with CV2
            contours, _ = cv2.findContours(white_objects_in_trash_zone, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            MIN_AREA_FOR_DETECTION = 25
            for cnt in contours:
                area = cv2.contourArea(cnt)
                if area > MIN_AREA_FOR_DETECTION: 
                    # Detection happened!
                    x, y, w, h = cv2.boundingRect(cnt)
                    # Draw the detected object
                    cv2.rectangle(annotated, (x, y), (x + w, y + h), (0, 255, 0), 2)
                    cv2.putText(annotated, "UTENSIL", (x, y - 10), 
                                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 1)
                    
                    # Make sure human hand is not in frame
                    HUMAN_SPOTTED_WAIT = 1
                    if (curr_time >= last_human_spotted_time + HUMAN_SPOTTED_WAIT):
                        # Detection happened here!
                        cv2.rectangle(detections, (x, y), (x + w, y + h), (0, 255, 0), 2)
                        # Send detection event as long as it didn't happen too quickly
                        WAIT_BETWEEN_DETECTIONS = 2
                        if (curr_time >= last_detection_time + WAIT_BETWEEN_DETECTIONS):
                            last_detection_time = curr_time
                            print("detection", flush=True)
    `;

    return (
        <div className="max-w-4xl space-y-10">
            <div className="border-l-4 border-amber-400 bg-amber-400/5 px-5 py-4">
                <p className="font-body text-base leading-relaxed text-stone-300">
                    <span className="font-mono text-xs tracking-widest text-amber-400 uppercase">
                        ⚠ Work in progress
                    </span>
                    <br />
                    This project is in active development. A local restaurant
                    owner has expressed interest in the product, and I have a
                    visit scheduled to evaluate a real-world test.
                </p>
            </div>

            <div>
                <h2 className="font-display mb-4 text-2xl font-black text-stone-100">
                    About
                </h2>
                <p className="font-body mb-4 text-lg leading-relaxed text-stone-400">
                    Trutensils is a real-time computer vision system that
                    detects when restaurant staff accidentally throw utensils
                    into the trash. It runs on a Raspberry Pi 5 mounted near the
                    dish drop-off, watches the bin with a single camera, and
                    triggers a notification when it detects a utensil going in.
                </p>
                <p className="font-body mb-4 text-lg leading-relaxed text-stone-400">
                    The hardware choice is deliberate: restaurants won't pay a
                    monthly subscription for utensil detection, so the whole
                    system has to run as a one-time purchase with no cloud or
                    GPU dependencies.
                </p>
                <p className="font-body text-lg leading-relaxed text-stone-400">
                    The project is in active development and currently in talks
                    with a restaurant for a real-world pilot. There are two
                    halves to the work: the detection problem itself (still
                    being iterated on) and the surrounding infrastructure to
                    run, control, and monitor the detection process from a web
                    interface.
                </p>

                <MediaPreview src={"/trutensils0.jpg"} type={"image"} />
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
                    Backend & Infrastructure
                </h2>
                <p className="font-body mb-6 text-lg leading-relaxed text-stone-400">
                    The system is split across three components: a Python CV
                    microservice running on the Raspberry Pi, a Node.js
                    orchestration server that spawns and manages the
                    microservice process, and a React control panel.
                </p>
                <div className="space-y-6">
                    {[
                        {
                            title: "Real-time data using Socket.IO",
                            description:
                                "The client connects over Socket.IO first thing, so it always sees live data. If another client's already started the microservice or is in the middle of starting it, the new client picks up the current state and every subsequent event (start, stop, logs, detections). Control actions (start, stop, status) go through an API with a standard controller/service/lib structure. The Node layer enforces that the Python process can only be in one of three states (stopped / starting / running), so two clients hitting start at the same time can't double-spawn the subprocess.",
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
                    Detection Logic
                </h2>
                <p className="font-body mb-4 text-lg leading-relaxed text-stone-400">
                    The hard part about this project is reliably detecting that
                    a utensil has entered the trash. It's harder than just
                    throwing YOLO into the Pi, and each approach I've tried has
                    surfaced a new problem that forced the next one. Here's the
                    full path:
                </p>
                <div className="space-y-6">
                    <div className="border-l-4 border-amber-400/40 pl-6">
                        <h3 className="font-display mb-1 text-lg font-black text-stone-200">
                            1. Top-down camera, YOLO predict on utensils
                        </h3>
                        <p className="font-body text-lg leading-relaxed text-stone-400">
                            First setup was a camera mounted high above the dish
                            drop-off, far enough back that both the trash bin
                            and the waiter were in frame. YOLO ran on every
                            frame looking for COCO utensil classes (fork, knife,
                            spoon, cup, bowl). Detection worked when utensils
                            were clearly visible on a tray, but the camera
                            distance meant utensils were only a few pixels wide
                            by the time they reached the bin and YOLO missed
                            most of them. Also fired false positives whenever a
                            utensil was on the tray above the trash zone.
                        </p>
                    </div>

                    <div className="border-l-4 border-amber-400/40 pl-6">
                        <h3 className="font-display mb-1 text-lg font-black text-stone-200">
                            2. YOLO tracker + disappearance detection
                        </h3>
                        <p className="font-body text-lg leading-relaxed text-stone-400">
                            Switched to YOLO's built-in object tracker,
                            assigning persistent IDs to detected utensils and
                            firing a detection when an ID disappeared for
                            several consecutive frames without exiting the trash
                            bag zone, which would mean it's inside the trash
                            bag. Problem: YOLO loses tracking all the time under
                            normal restaurant lighting and motion. Utensils were
                            declared "lost" while rotating or moving fast, and
                            the false positive rate was worse than approach 1.
                        </p>
                    </div>

                    <div className="border-l-4 border-amber-400/40 pl-6">
                        <h3 className="font-display mb-1 text-lg font-black text-stone-200">
                            3. Bright-pixel masking + YOLO for human detection
                        </h3>
                        <p className="font-body mb-4 text-lg leading-relaxed text-stone-400">
                            I then thought of a completely different approach.
                            Metal utensils reflect light, right? Convert each
                            frame to HSV, mask for high-value low-saturation
                            pixels, and constrain to a hand-drawn polygon over
                            the trash zone. YOLO ran in parallel only to detect
                            when a human hand was in frame, so we wouldn't fire
                            while a waiter was scooping food of the tray with a
                            fork. What I failed to consider was that white wipes
                            and rice were common in restaurants. Furthermore,
                            even if we were to play around with the saturation
                            and tolerance values, stuff like plastic wrappers
                            still reflect light. There's no way to distinguish
                            between utensils and other light-reflecting objects,
                            even with the shape or size.
                        </p>
                        <MediaPreview
                            src={"/trutensils1.jpg"}
                            type={"image"}
                            caption={"Bright-pixel masking method"}
                        />
                        <MediaPreview
                            src={"/trutensils3.jpg"}
                            type={"image"}
                            caption={"Plain CV view using bright-pixel masking"}
                        />

                        <button
                            onClick={() =>
                                setShowBrightPixelCode((prev) => !prev)
                            }
                            className="font-mono text-xs tracking-wider text-amber-400 transition-colors hover:text-amber-300"
                        >
                            {showBrightPixelCode
                                ? "▾ HIDE CODE"
                                : "▸ SHOW CODE"}
                        </button>
                        {showBrightPixelCode && (
                            <pre className="mt-3 overflow-x-auto rounded-md border border-stone-700 bg-stone-900 p-4 font-mono text-sm leading-relaxed text-stone-300">
                                <code>{brightPixelCode}</code>
                            </pre>
                        )}
                    </div>

                    <div className="border-l-4 border-amber-400/40 pl-6">
                        <h3 className="font-display mb-1 text-lg font-black text-stone-200">
                            4. Moved the camera closer
                        </h3>
                        <p className="font-body text-lg leading-relaxed text-stone-400">
                            Rather than a top-down view from the ceiling, I
                            mounted the camera much closer to the bin itself.
                            Detection accuracy went up significantly because
                            utensils now occupied a much larger portion of the
                            frame, and as a side benefit the setup is more
                            realistic for actual restaurants (easier to install
                            on a fixture near the bin than to mount overhead).
                            However, all the underlying problems stayed:
                            bright-pixel masking still false-positives on
                            wrappers, YOLO still loses utensils once they're at
                            the bottom of the bag.
                        </p>

                        <MediaPreview
                            src={"/trutensils2.jpg"}
                            type={"image"}
                            caption={
                                "YOLO detection, with camera mounted close"
                            }
                        />
                    </div>

                    <div className="border-l-4 border-amber-400/40 pl-6">
                        <h3 className="font-display mb-1 text-lg font-black text-stone-200">
                            5. Where I am now
                        </h3>
                        <p className="font-body text-lg leading-relaxed text-stone-400">
                            Currently running YOLO directly on the camera feed.
                            No tracker nor bright-pixel masking. The remaining
                            problem is that once a utensil is at the bottom of
                            the bag, YOLO can't recognize it anymore. Two
                            directions I'm exploring: mounting the camera at an
                            angle to detect the utensil crossing a virtual line
                            on its way into the bag (so we catch it while still
                            fully visible), and recording footage from the
                            actual camera in actual restaurant conditions to
                            fine-tune a custom YOLO model.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

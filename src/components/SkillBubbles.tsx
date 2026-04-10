import { useEffect, useRef } from "react";
import Matter from "matter-js";

type SkillGroup = {
    label: string;
    skills: string[];
};

export default function SkillBubbles({ groups }: { groups: SkillGroup[] }) {
    const sceneRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        const Engine = Matter.Engine;
        const Render = Matter.Render;
        const Runner = Matter.Runner;
        const Bodies = Matter.Bodies;
        const Composite = Matter.Composite;
        const Mouse = Matter.Mouse;
        const MouseConstraint = Matter.MouseConstraint;

        const engine = Engine.create();
        const world = engine.world;

        const render = Render.create({
            element: sceneRef.current!,
            engine,
            options: {
                width,
                height,
                wireframes: false,
                background: "transparent",
            },
        });

        // walls
        const walls = [
            Bodies.rectangle(width / 2, height + 50, width, 100, {
                isStatic: true,
            }),
            Bodies.rectangle(-50, height / 2, 100, height, {
                isStatic: true,
            }),
            Bodies.rectangle(width + 50, height / 2, 100, height, {
                isStatic: true,
            }),
        ];

        Composite.add(world, walls);

        // flatten skills
        const allSkills = groups.flatMap((g) => g.skills);

        const bubbles = allSkills.map((skill) => {
            const radius = 40 + Math.random() * 20;

            return Bodies.circle(
                Math.random() * width,
                -Math.random() * 500, // spawn above screen
                radius,
                {
                    restitution: 0.9, // bounciness
                    friction: 0.005,
                    density: 0.001,
                    render: {
                        fillStyle: "#fbbf24", // amber
                    },
                    label: skill,
                }
            );
        });

        Composite.add(world, bubbles);

        // mouse interaction
        const mouse = Mouse.create(render.canvas);

        const mouseConstraint = MouseConstraint.create(engine, {
            mouse,
            constraint: {
                stiffness: 0.2,
            },
        });

        Composite.add(world, mouseConstraint);

        render.mouse = mouse;

        // render loop
        Render.run(render);
        const runner = Runner.create();
        Runner.run(runner, engine);

        // draw labels manually
        Matter.Events.on(render, "afterRender", () => {
            const ctx = render.context;

            ctx.font = "12px monospace";
            ctx.fillStyle = "#000";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            bubbles.forEach((body) => {
                const { x, y } = body.position;
                ctx.fillText(body.label, x, y);
            });
        });

        return () => {
            Render.stop(render);
            Runner.stop(runner);
            Composite.clear(world, false);
            Engine.clear(engine);
            render.canvas.remove();
        };
    }, [groups]);

    return <div ref={sceneRef} className="absolute inset-0 z-0" />;
}

import type { Project, SkillGroup } from "./types";

export const PROJECTS: Project[] = [
    {
        slug: "chalk",
        title: "Chalk",
        description:
            "An infinite modern whiteboard app, allowing users to create whiteboards and save them on the cloud.",
        tags: ["Node.js", "Express", "MongoDB", "React", "JWT", "TypeScript"],
        visitUrl: "https://chalk.gameoholic.dev/",
        sourceUrl: "https://github.com/Gameoholic/chalk",
    },
    {
        slug: "daniels-portal",
        title: "Daniel's Portal",
        description:
            "A custom auth and permissions platform built to serve as the backbone for a suite of personal apps.",
        tags: ["Next.js", "TypeScript", "PostgreSQL", "Auth"],
        visitUrl: "https://www.portaldaniel.com/",
        sourceUrl: "https://github.com/Gameoholic/daniels-portal",
    },
    {
        slug: "trutensils",
        title: "Trutensils",
        description:
            "A practical full-stack computer vision project hosted on a Raspberry Pi that detects when restaurant staff accidentally throw utensils in the trash.",
        tags: [
            "Python",
            "YOLO",
            "OpenCV",
            "Raspberry Pi",
            "Node.js",
            "WebSockets",
            "Computer Vision",
        ],
    },
];

export const OLDER_PROJECTS: Project[] = [
    {
        slug: "better-tic-tac-toe",
        title: "Better Tic Tac Toe",
        description:
            "A multiplayer mobile game with a scalable distributed backend. I added a couple of simple rules that turn the boring, solved Tic Tac Toe into a strategic 30-minute match.",
        tags: [
            "Godot",
            "GDScript",
            "Game",
            "Distributed Systems",
            "Microservices",
        ],
        sourceUrl:
            "https://github.com/Gameoholic/Better-Tic-Tac-Toe-Public-Client",
    },
    {
        slug: "the-startup",
        title: "The Startup",
        description:
            "A Minecraft event built for TopStrix in collaboration with Ben-Gurion University, teaching entrepreneurship to kids. 3,000+ unique players and 16,000 logins in the first week. Featured on Jerusalem Post and ynet.",
        tags: ["Java", "Minecraft", "Game", "MySQL", "Redis"],
        sourceUrl: "",
    },
    {
        slug: "partigon",
        title: "Partigon",
        description:
            "An open-source Kotlin library for Minecraft modders that abstracts the math away from making complex particle animations. Uses a DSL-style builder API for clean, readable animation code.",
        tags: ["Kotlin", "Library", "Minecraft"],
        sourceUrl: "https://github.com/Gameoholic/Partigon",
    },
];

export const SKILL_GROUPS: SkillGroup[] = [
    {
        label: "Languages",
        icon: "</>",
        skills: [
            "TypeScript",
            "JavaScript",
            "Java",
            "Kotlin",
            "Python",
            "C++",
            "C#",
        ],
    },
    {
        label: "Backend & Databases",
        icon: "⬡",
        skills: [
            "Node.js",
            "Express",
            "PostgreSQL",
            "MySQL",
            "MongoDB",
            "MariaDB",
            "Redis",
        ],
    },
    {
        label: "Frontend",
        icon: "▣",
        skills: ["React", "Next.js", "TailwindCSS", "Vite"],
    },
    {
        label: "DevOps",
        icon: "◈",
        skills: ["Docker", "GitHub Actions", "Nginx", "Linux", "Git"],
    },
    {
        label: "Computer Vision & ML",
        icon: "◎",
        skills: ["OpenCV", "YOLO", "Raspberry Pi"],
    },
    {
        label: "Game Dev",
        icon: "◈",
        skills: ["Unreal Engine", "Godot", "OpenGL", "Bukkit/Spigot/Paper"],
    },
];

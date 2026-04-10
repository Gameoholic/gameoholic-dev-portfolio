import type { SkillGroup as SkillGroupType } from "../lib/types";

export default function SkillGroup({ group }: { group: SkillGroupType }) {
    return (
        <div className="border border-stone-800 p-6 transition-colors hover:border-stone-700">
            <div className="mb-5 flex items-center gap-3">
                <span className="font-mono text-lg text-amber-400">
                    {group.icon}
                </span>
                <h3 className="font-display text-lg font-black tracking-wide text-stone-200">
                    {group.label}
                </h3>
            </div>
            <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                    <span
                        key={skill}
                        className="cursor-default border border-stone-700 bg-stone-800 px-3 py-1.5 font-mono text-xs text-stone-300 transition-colors duration-200 hover:border-amber-400/50 hover:text-amber-400"
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
}

export interface Project {
    slug: string;
    title: string;
    description: string;
    tags: string[];
    visitUrl?: string;
    sourceUrl?: string;
}

export interface SkillGroup {
    label: string;
    icon: string;
    skills: string[];
}

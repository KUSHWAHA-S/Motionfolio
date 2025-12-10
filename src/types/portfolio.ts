export type SectionType = "hero" | "about" | "projects" | "experience" | "skills" | "theme";


export type Section = {
id: string;
type: SectionType;
data: any;
};


export type Portfolio = {
id?: string;
title: string;
theme: {
primary: string;
background: string;
text: string;
};
sections: Section[];
};
/**
 * Utility functions for working with portfolio sections and data
 */

import { Section, SectionData } from "@/types/portfolio";
import {
  HeroSectionData,
  AboutSectionData,
  ProjectsSectionData,
  ExperienceSectionData,
  SkillsSectionData,
  isProjectsSectionData,
  isExperienceSectionData,
  isSkillsSectionData,
} from "@/types/portfolio";
import { SECTION_TYPES } from "@/types/constants";

/**
 * Extracted section data from portfolio sections
 */
export interface ExtractedSections {
  heroSection: Section | undefined;
  projectsSection: Section | undefined;
  projects: Array<{ title: string; description?: string; imageUrl?: string; link?: string }>;
  experiencesSection: Section | undefined;
  experiences: Array<{
    title: string;
    company?: string;
    period?: string;
    location?: string;
    description?: string;
  }>;
  skillsSection: Section | undefined;
  skills: string[];
  aboutData: AboutSectionData | undefined;
}

/**
 * Extract and normalize section data from portfolio sections
 */
export function extractSections(sections: Section[]): ExtractedSections {
  const hero = sections.find((s) => s.type === SECTION_TYPES.HERO);
  const projectsSec = sections.find((s) => s.type === SECTION_TYPES.PROJECTS);
  const experiencesSec = sections.find(
    (s) => s.type === SECTION_TYPES.EXPERIENCE
  );
  const skillsSec = sections.find((s) => s.type === SECTION_TYPES.SKILLS);
  const about = sections.find((s) => s.type === SECTION_TYPES.ABOUT);

  const projectsArray = isProjectsSectionData(projectsSec?.data)
    ? projectsSec.data.projects
    : [];

  const experiencesArray = isExperienceSectionData(experiencesSec?.data)
    ? experiencesSec.data.experiences
    : [];

  const skillsArray = isSkillsSectionData(skillsSec?.data)
    ? skillsSec.data.skills
    : [];

  return {
    heroSection: hero,
    projectsSection: projectsSec,
    projects: projectsArray,
    experiencesSection: experiencesSec,
    experiences: experiencesArray,
    skillsSection: skillsSec,
    skills: skillsArray,
    aboutData: (about?.data as AboutSectionData) || undefined,
  };
}

/**
 * Find a section by type
 */
export function findSectionByType(
  sections: Section[],
  type: string
): Section | undefined {
  return sections.find((s) => s.type === type);
}

/**
 * Get section data with type safety
 */
export function getSectionData<T extends SectionData>(
  section: Section | undefined
): T | undefined {
  return section?.data as T | undefined;
}

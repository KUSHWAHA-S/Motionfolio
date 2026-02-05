import { SectionType } from "./constants";

/**
 * Type definitions for portfolio data structures
 */

// Hero section data
export interface HeroSectionData {
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  ctaText?: string;
  ctaLink?: string;
}

// About section data
export interface AboutSectionData {
  bio?: string;
  email?: string;
  location?: string;
  website?: string;
}

// Project item
export interface Project {
  title: string;
  description?: string;
  imageUrl?: string;
  link?: string;
}

// Projects section data
export interface ProjectsSectionData {
  projects: Project[];
}

// Experience item
export interface Experience {
  title: string;
  company?: string;
  period?: string;
  location?: string;
  description?: string;
}

// Experience section data
export interface ExperienceSectionData {
  experiences: Experience[];
}

// Skills section data
export interface SkillsSectionData {
  skills: string[];
}

// Theme section data (legacy, now using theme directly on portfolio)
export interface ThemeSectionData {
  primary?: string;
  secondary?: string;
  background?: string;
  text?: string;
}

// Union type for all section data types
export type SectionData =
  | HeroSectionData
  | AboutSectionData
  | ProjectsSectionData
  | ExperienceSectionData
  | SkillsSectionData
  | ThemeSectionData
  | Record<string, unknown>; // Fallback for unknown section types

// Portfolio section
export interface Section {
  id: string;
  type: SectionType;
  data: SectionData;
  animation?: unknown;
}

// Portfolio theme
export interface PortfolioTheme {
  primary: string;
  secondary: string;
  background?: string;
  text?: string;
}

// Portfolio
export interface Portfolio {
  id?: string;
  title: string;
  theme: PortfolioTheme;
  sections: Section[];
  template?: string;
  is_public?: boolean;
  owner_id?: string;
  created_at?: string;
  updated_at?: string;
}

// Type guards for section data
export function isHeroSectionData(data: SectionData): data is HeroSectionData {
  return typeof data === "object" && data !== null;
}

export function isAboutSectionData(
  data: SectionData
): data is AboutSectionData {
  return typeof data === "object" && data !== null;
}

export function isProjectsSectionData(
  data: SectionData
): data is ProjectsSectionData {
  return (
    typeof data === "object" &&
    data !== null &&
    "projects" in data &&
    Array.isArray(data.projects)
  );
}

export function isExperienceSectionData(
  data: SectionData
): data is ExperienceSectionData {
  return (
    typeof data === "object" &&
    data !== null &&
    "experiences" in data &&
    Array.isArray(data.experiences)
  );
}

export function isSkillsSectionData(
  data: SectionData
): data is SkillsSectionData {
  return (
    typeof data === "object" &&
    data !== null &&
    "skills" in data &&
    Array.isArray(data.skills)
  );
}

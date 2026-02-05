/**
 * Constants for portfolio sections, templates, and other configuration values
 */

export const SECTION_TYPES = {
  HERO: "hero",
  ABOUT: "about",
  PROJECTS: "projects",
  EXPERIENCE: "experience",
  SKILLS: "skills",
  THEME: "theme",
  TEMPLATE: "template",
} as const;

export type SectionType = typeof SECTION_TYPES[keyof typeof SECTION_TYPES];

export const TEMPLATE_NAMES = {
  MODERN_CREATIVE: "modern-creative",
  MINIMAL_SHOWCASE: "minimal-showcase",
  DEVELOPER_TWO_COLUMN: "developer-two-column",
} as const;

export type TemplateName = typeof TEMPLATE_NAMES[keyof typeof TEMPLATE_NAMES];

export const DEFAULT_TEMPLATE = TEMPLATE_NAMES.MODERN_CREATIVE;

export const SECTION_LABELS: Record<SectionType, string> = {
  [SECTION_TYPES.HERO]: "Hero",
  [SECTION_TYPES.ABOUT]: "About",
  [SECTION_TYPES.PROJECTS]: "Projects",
  [SECTION_TYPES.EXPERIENCE]: "Experience",
  [SECTION_TYPES.SKILLS]: "Skills",
  [SECTION_TYPES.THEME]: "Theme",
  [SECTION_TYPES.TEMPLATE]: "Template",
};

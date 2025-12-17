"use client";

import { motion } from "framer-motion";
import { HeroEditor } from "../HeroEditor/HeroEditor";
import { AboutEditor } from "../AboutEditor/AboutEditor";
import { ProjectEditor } from "../ProjectEditor/ProjectEditor";
import { ExperienceEditor } from "../ExperienceEditor/ExperienceEditor";
import { SkillsEditor } from "../SkillsEditor/SkillsEditor";
import { ThemeEditor } from "../ThemeEditor/ThemeEditor";
import { TemplateEditor } from "../TemplateEditor/TemplateEditor";

type SectionType =
  | "hero"
  | "about"
  | "projects"
  | "experience"
  | "skills"
  | "theme"
  | "template";

interface SectionEditorProps {
  section: SectionType;
}

export function SectionEditor({ section }: SectionEditorProps) {
  return (
    <motion.div
      key={section}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      {section === "hero" && <HeroEditor />}
      {section === "about" && <AboutEditor />}
      {section === "projects" && <ProjectEditor />}
      {section === "experience" && <ExperienceEditor />}
      {section === "skills" && <SkillsEditor />}
      {section === "theme" && <ThemeEditor />}
      {section === "template" && <TemplateEditor />}
    </motion.div>
  );
}

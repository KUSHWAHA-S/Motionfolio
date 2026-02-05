"use client";

import { motion } from "framer-motion";
import { HeroEditor } from "../HeroEditor/HeroEditor";
import { AboutEditor } from "../AboutEditor/AboutEditor";
import { ProjectEditor } from "../ProjectEditor/ProjectEditor";
import { ExperienceEditor } from "../ExperienceEditor/ExperienceEditor";
import { SkillsEditor } from "../SkillsEditor/SkillsEditor";
import { ThemeEditor } from "../ThemeEditor/ThemeEditor";
import { TemplateEditor } from "../TemplateEditor/TemplateEditor";
import { SectionType, SECTION_TYPES } from "@/types/constants";

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
      className="bg-white rounded-xl shadow-sm p-6"
      style={{ border: "1px solid #E5E7EB" }}
    >
      {section === SECTION_TYPES.HERO && <HeroEditor />}
      {section === SECTION_TYPES.ABOUT && <AboutEditor />}
      {section === SECTION_TYPES.PROJECTS && <ProjectEditor />}
      {section === SECTION_TYPES.EXPERIENCE && <ExperienceEditor />}
      {section === SECTION_TYPES.SKILLS && <SkillsEditor />}
      {section === SECTION_TYPES.THEME && <ThemeEditor />}
      {section === SECTION_TYPES.TEMPLATE && <TemplateEditor />}
    </motion.div>
  );
}

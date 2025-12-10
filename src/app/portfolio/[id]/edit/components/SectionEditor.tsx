"use client";

import { motion } from "framer-motion";
import { HeroEditor } from "./editors/HeroEditor";
import { AboutEditor } from "./editors/AboutEditor";
import { ProjectEditor } from "./editors/ProjectEditor";
import { ExperienceEditor } from "./editors/ExperienceEditor";
import { SkillsEditor } from "./editors/SkillsEditor";
import { ThemeEditor } from "./editors/ThemeEditor";

type SectionType = "hero" | "about" | "projects" | "experience" | "skills" | "theme";

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
    </motion.div>
  );
}


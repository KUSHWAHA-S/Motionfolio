"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Plus, X } from "lucide-react";
import { SkillsSectionData } from "@/types/portfolio";

export function SkillsEditor() {
  const { t } = useTranslation();
  const { sections, updateSection, addSection } = usePortfolioStore();
  const [newSkill, setNewSkill] = useState("");

  const skillsSection = sections.find((s) => s.type === "skills");
  const skillsData = (skillsSection?.data as SkillsSectionData) || { skills: [] };
  const skills: string[] = skillsData.skills || [];

  const updateSkills = (newSkills: string[]) => {
    if (skillsSection) {
      updateSection(skillsSection.id, {
        data: { skills: newSkills },
      });
    } else {
      addSection({
        id: `skills-${Date.now()}`,
        type: "skills",
        data: { skills: newSkills },
        animation: {},
      });
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      updateSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    updateSkills(skills.filter((s: string) => s !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div
          className="p-2 rounded-lg"
          style={{ backgroundColor: "rgba(64, 224, 208, 0.1)" }}
        >
          <Star className="w-5 h-5" style={{ color: "#40E0D0" }} />
        </div>
        <div>
          <h2 className="text-xl font-semibold" style={{ color: "#1A1A1A" }}>
            {t("skills.title")}
          </h2>
          <p className="text-sm" style={{ color: "#6B7280" }}>
            {t("skills.subtitle")}
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "#1A1A1A" }}
          >
            {t("skills.addSkill")}
          </label>
          <div className="flex gap-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t("skills.addSkillPlaceholder")}
              className="flex-1"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addSkill}
              className="px-4 py-2 text-white rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              style={{ backgroundColor: "#40E0D0" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#20B2AA";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#40E0D0";
              }}
            >
              <Plus className="w-4 h-4" />
              {t("skills.add")}
            </motion.button>
          </div>
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "#1A1A1A" }}
          >
            {t("skills.yourSkills", { count: skills.length })}
          </label>
          {skills.length === 0 ? (
            <div
              className="text-center py-12 border-2 border-dashed rounded-lg"
              style={{ borderColor: "#E5E7EB" }}
            >
              <Star
                className="w-12 h-12 mx-auto mb-3"
                style={{ color: "#9CA3AF" }}
              />
              <p style={{ color: "#6B7280" }}>{t("skills.noSkills")}</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {skills.map((skill: string, index: number) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: index * 0.02 }}
                    className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium"
                    style={{
                      backgroundColor: "rgba(64, 224, 208, 0.1)",
                      color: "#40E0D0",
                    }}
                  >
                    <span>{skill}</span>
                    <motion.button
                      whileHover={{ scale: 1.2, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeSkill(skill)}
                      className="opacity-60 group-hover:opacity-100 transition-opacity p-0.5 rounded-full cursor-pointer"
                      style={{
                        backgroundColor: "rgba(64, 224, 208, 0.2)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgba(64, 224, 208, 0.3)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgba(64, 224, 208, 0.2)";
                      }}
                    >
                      <X className="w-3 h-3" style={{ color: "#0F172A" }} />
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

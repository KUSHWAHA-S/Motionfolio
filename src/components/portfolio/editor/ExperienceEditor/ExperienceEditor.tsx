"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Plus, Trash2, Calendar } from "lucide-react";
import { ExperienceSectionData, Experience } from "@/types/portfolio";

export function ExperienceEditor() {
  const { t } = useTranslation();
  const { sections, updateSection, addSection } = usePortfolioStore();

  const experienceSection = sections.find((s) => s.type === "experience");
  const experienceData = (experienceSection?.data as ExperienceSectionData) || { experiences: [] };
  const experiences: (Experience & { id?: string })[] = experienceData.experiences || [];

  const updateExperiences = (newExperiences: (Experience & { id?: string })[]) => {
    if (experienceSection) {
      updateSection(experienceSection.id, {
        data: { experiences: newExperiences },
      });
    } else {
      addSection({
        id: `experience-${Date.now()}`,
        type: "experience",
        data: { experiences: newExperiences },
        animation: {},
      });
    }
  };

  const addExperience = () => {
    updateExperiences([
      ...experiences,
      {
        id: `exp-${Date.now()}`,
        title: "",
        company: "",
        period: "",
        description: "",
        location: "",
      },
    ]);
  };

  const updateExperience = (id: string, updates: Partial<Experience>) => {
    updateExperiences(
      experiences.map((e) => (e.id === id ? { ...e, ...updates } : e))
    );
  };

  const removeExperience = (id: string) => {
    updateExperiences(experiences.filter((e) => e.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="p-2 rounded-lg"
            style={{ backgroundColor: "rgba(64, 224, 208, 0.1)" }}
          >
            <Briefcase className="w-5 h-5" style={{ color: "#40E0D0" }} />
          </div>
          <div>
            <h2 className="text-xl font-semibold" style={{ color: "#1A1A1A" }}>
              {t("experience.title")}
            </h2>
            <p className="text-sm" style={{ color: "#6B7280" }}>
              {t("experience.subtitle")}
            </p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={addExperience}
          className="flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors cursor-pointer"
          style={{ backgroundColor: "#40E0D0" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#20B2AA";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#40E0D0";
          }}
        >
          <Plus className="w-4 h-4" />
          {t("experience.addExperience")}
        </motion.button>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {experiences.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg"
            >
              <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 mb-4">{t("experience.noExperience")}</p>
              <button
                onClick={addExperience}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
              >
                {t("experience.addFirstExperience")}
              </button>
            </motion.div>
          ) : (
            experiences.map((exp, index: number) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-50 rounded-xl border border-gray-200 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    {t("experience.experienceNumber", { number: index + 1 })}
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => exp.id && removeExperience(exp.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("experience.jobTitle")}
                      </label>
                      <Input
                        value={exp.title || ""}
                        onChange={(e) =>
                          updateExperience(exp.id!, { title: e.target.value })
                        }
                        placeholder={t("experience.jobTitlePlaceholder")}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("experience.company")}
                      </label>
                      <Input
                        value={exp.company || ""}
                        onChange={(e) =>
                          updateExperience(exp.id!, { company: e.target.value })
                        }
                        placeholder={t("experience.companyPlaceholder")}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {t("experience.period")}
                      </label>
                      <Input
                        value={exp.period || ""}
                        onChange={(e) =>
                          updateExperience(exp.id!, { period: e.target.value })
                        }
                        placeholder={t("experience.periodPlaceholder")}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("experience.location")}
                      </label>
                      <Input
                        value={exp.location || ""}
                        onChange={(e) =>
                          updateExperience(exp.id!, { location: e.target.value })
                        }
                        placeholder={t("experience.locationPlaceholder")}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("experience.description")}
                    </label>
                    <Textarea
                      value={exp.description || ""}
                      onChange={(e) =>
                        updateExperience(exp.id!, {
                          description: e.target.value,
                        })
                      }
                      placeholder={t("experience.descriptionPlaceholder")}
                      rows={4}
                      className="w-full"
                    />
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

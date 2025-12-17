"use client";

import { useState } from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Plus, Trash2, Calendar } from "lucide-react";

export function ExperienceEditor() {
  const { sections, updateSection, addSection } = usePortfolioStore();

  const experienceSection = sections.find((s) => s.type === "experience");
  const experiences = experienceSection?.data?.experiences || [];

  const updateExperiences = (newExperiences: any[]) => {
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

  const updateExperience = (id: string, updates: any) => {
    updateExperiences(
      experiences.map((e: any) => (e.id === id ? { ...e, ...updates } : e))
    );
  };

  const removeExperience = (id: string) => {
    updateExperiences(experiences.filter((e: any) => e.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Briefcase className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Experience</h2>
            <p className="text-sm text-gray-500">Your professional journey</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={addExperience}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Experience
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
              <p className="text-gray-500 mb-4">No experience entries yet</p>
              <button
                onClick={addExperience}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
              >
                Add your first experience
              </button>
            </motion.div>
          ) : (
            experiences.map((exp: any, index: number) => (
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
                    Experience {index + 1}
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeExperience(exp.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Title
                      </label>
                      <Input
                        value={exp.title}
                        onChange={(e) =>
                          updateExperience(exp.id, { title: e.target.value })
                        }
                        placeholder="e.g., Senior Software Engineer"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company
                      </label>
                      <Input
                        value={exp.company}
                        onChange={(e) =>
                          updateExperience(exp.id, { company: e.target.value })
                        }
                        placeholder="e.g., Google"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Period
                      </label>
                      <Input
                        value={exp.period}
                        onChange={(e) =>
                          updateExperience(exp.id, { period: e.target.value })
                        }
                        placeholder="e.g., Jan 2020 - Present"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <Input
                        value={exp.location}
                        onChange={(e) =>
                          updateExperience(exp.id, { location: e.target.value })
                        }
                        placeholder="e.g., San Francisco, CA"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <Textarea
                      value={exp.description}
                      onChange={(e) =>
                        updateExperience(exp.id, {
                          description: e.target.value,
                        })
                      }
                      placeholder="Describe your responsibilities and achievements..."
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


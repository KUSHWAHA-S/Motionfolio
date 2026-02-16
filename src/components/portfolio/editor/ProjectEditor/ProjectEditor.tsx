"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { Folder, Plus, Trash2, ExternalLink, GripVertical } from "lucide-react";
import { ProjectsSectionData, Project } from "@/types/portfolio";

export function ProjectEditor() {
  const { t } = useTranslation();
  const { sections, updateSection, addSection } = usePortfolioStore();

  const projectSection = sections.find((s) => s.type === "projects");
  const projectData = (projectSection?.data as ProjectsSectionData) || { projects: [] };
  const projects: (Project & { id?: string; tags?: string[] })[] = projectData.projects || [];

  const updateProjects = (newProjects: (Project & { id?: string; tags?: string[] })[]) => {
    if (projectSection) {
      updateSection(projectSection.id, {
        data: { projects: newProjects },
      });
    } else {
      addSection({
        id: `projects-${Date.now()}`,
        type: "projects",
        data: { projects: newProjects },
        animation: {},
      });
    }
  };

  const addProject = () => {
    updateProjects([
      ...projects,
      {
        id: `project-${Date.now()}`,
        title: "",
        description: "",
        imageUrl: "",
        link: "",
        tags: [],
      },
    ]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    updateProjects(
      projects.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const removeProject = (id: string) => {
    updateProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="p-2 rounded-lg"
            style={{ backgroundColor: "rgba(64, 224, 208, 0.1)" }}
          >
            <Folder className="w-5 h-5" style={{ color: "#40E0D0" }} />
          </div>
          <div>
            <h2 className="text-xl font-semibold" style={{ color: "#1A1A1A" }}>
              {t("projects.title")}
            </h2>
            <p className="text-sm" style={{ color: "#6B7280" }}>
              {t("projects.subtitle")}
            </p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={addProject}
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
          {t("projects.addProject")}
        </motion.button>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {projects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg"
            >
              <Folder className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 mb-4">{t("projects.noProjects")}</p>
              <button
                onClick={addProject}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
              >
                {t("projects.addFirstProject")}
              </button>
            </motion.div>
          ) : (
            projects.map((project, index: number) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-50 rounded-xl border border-gray-200 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-gray-400 cursor-move">
                      <GripVertical className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-gray-900">
                      {t("projects.projectNumber", { number: index + 1 })}
                    </h3>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => project.id && removeProject(project.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("projects.projectTitle")}
                    </label>
                    <Input
                      value={project.title || ""}
                      onChange={(e) =>
                        project.id && updateProject(project.id, { title: e.target.value })
                      }
                      placeholder={t("projects.projectTitlePlaceholder")}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("projects.description")}
                    </label>
                    <Textarea
                      value={project.description || ""}
                      onChange={(e) =>
                        project.id && updateProject(project.id, {
                          description: e.target.value,
                        })
                      }
                      placeholder={t("projects.descriptionPlaceholder")}
                      rows={4}
                      className="w-full"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("projects.imageUrl")}
                      </label>
                      <Input
                        value={project.imageUrl || ""}
                        onChange={(e) =>
                          project.id && updateProject(project.id, {
                            imageUrl: e.target.value,
                          })
                        }
                        placeholder={t("projects.imageUrlPlaceholder")}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        {t("projects.projectLink")}
                      </label>
                      <Input
                        type="url"
                        value={project.link || ""}
                        onChange={(e) =>
                          project.id && updateProject(project.id, { link: e.target.value })
                        }
                        placeholder={t("projects.projectLinkPlaceholder")}
                        className="w-full"
                      />
                    </div>
                  </div>

                  {project.imageUrl && (
                    <div className="rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={project.imageUrl}
                        alt={project.title || t("projects.projectPreview")}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

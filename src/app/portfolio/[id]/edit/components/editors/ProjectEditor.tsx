"use client";

import { useState } from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { Folder, Plus, Trash2, ExternalLink, GripVertical } from "lucide-react";

export function ProjectEditor() {
  const { sections, updateSection, addSection } = usePortfolioStore();

  const projectSection = sections.find((s) => s.type === "projects");
  const projects = projectSection?.data?.projects || [];

  const updateProjects = (newProjects: any[]) => {
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

  const updateProject = (id: string, updates: any) => {
    updateProjects(
      projects.map((p: any) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const removeProject = (id: string) => {
    updateProjects(projects.filter((p: any) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Folder className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Projects</h2>
            <p className="text-sm text-gray-500">Showcase your best work</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={addProject}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Project
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
              <p className="text-gray-500 mb-4">No projects yet</p>
              <button
                onClick={addProject}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
              >
                Add your first project
              </button>
            </motion.div>
          ) : (
            projects.map((project: any, index: number) => (
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
                      Project {index + 1}
                    </h3>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeProject(project.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Title
                    </label>
                    <Input
                      value={project.title}
                      onChange={(e) =>
                        updateProject(project.id, { title: e.target.value })
                      }
                      placeholder="e.g., E-commerce Platform"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <Textarea
                      value={project.description}
                      onChange={(e) =>
                        updateProject(project.id, {
                          description: e.target.value,
                        })
                      }
                      placeholder="Describe your project, technologies used, and key features..."
                      rows={4}
                      className="w-full"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image URL
                      </label>
                      <Input
                        value={project.imageUrl}
                        onChange={(e) =>
                          updateProject(project.id, { imageUrl: e.target.value })
                        }
                        placeholder="https://example.com/image.jpg"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        Project Link
                      </label>
                      <Input
                        type="url"
                        value={project.link}
                        onChange={(e) =>
                          updateProject(project.id, { link: e.target.value })
                        }
                        placeholder="https://project.com"
                        className="w-full"
                      />
                    </div>
                  </div>

                  {project.imageUrl && (
                    <div className="rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={project.imageUrl}
                        alt={project.title || "Project preview"}
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


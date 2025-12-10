"use client";

import { useEffect, useState } from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface LivePreviewProps {
  portfolioId: string;
}

export function LivePreview({ portfolioId }: LivePreviewProps) {
  const { title, theme, sections } = usePortfolioStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-96 bg-white rounded-xl border border-gray-200">
        <div className="text-gray-500">Loading preview...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Preview Header */}
      <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">Portfolio Preview</h3>
          <p className="text-xs text-gray-500 mt-0.5">Live preview of your portfolio</p>
        </div>
        <a
          href={`/portfolio/${portfolioId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Open in new tab
        </a>
      </div>

      {/* Preview Content */}
      <div
        className="p-8 min-h-[600px]"
        style={{
          backgroundColor: theme.background || "#ffffff",
          color: theme.text || "#1f2937",
        }}
      >
        {/* Hero Section */}
        {sections.find((s) => s.type === "hero") && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1
              className="text-5xl font-bold mb-4"
              style={{ color: theme.primary || "#0EA5E9" }}
            >
              {title}
            </h1>
            {sections.find((s) => s.type === "hero")?.data?.subtitle && (
              <p className="text-xl text-gray-600">
                {sections.find((s) => s.type === "hero")?.data.subtitle}
              </p>
            )}
          </motion.div>
        )}

        {/* About Section */}
        {sections.find((s) => s.type === "about") && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: theme.primary || "#0EA5E9" }}
            >
              About
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {sections.find((s) => s.type === "about")?.data?.bio ||
                "Add your bio here..."}
            </p>
          </motion.section>
        )}

        {/* Projects Section */}
        {sections.find((s) => s.type === "projects") && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2
              className="text-3xl font-bold mb-6"
              style={{ color: theme.primary || "#0EA5E9" }}
            >
              Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sections
                .find((s) => s.type === "projects")
                ?.data?.projects?.map((project: any, idx: number) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
                  >
                    <h3 className="font-semibold text-lg mb-2">{project.title || "Project"}</h3>
                    <p className="text-gray-600 text-sm">{project.description || ""}</p>
                  </div>
                )) || (
                <p className="text-gray-500 text-sm">No projects added yet</p>
              )}
            </div>
          </motion.section>
        )}

        {/* Experience Section */}
        {sections.find((s) => s.type === "experience") && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2
              className="text-3xl font-bold mb-6"
              style={{ color: theme.primary || "#0EA5E9" }}
            >
              Experience
            </h2>
            <div className="space-y-4">
              {sections
                .find((s) => s.type === "experience")
                ?.data?.experiences?.map((exp: any, idx: number) => (
                  <div key={idx} className="border-l-4 pl-4" style={{ borderColor: theme.primary || "#0EA5E9" }}>
                    <h3 className="font-semibold">{exp.title || "Position"}</h3>
                    <p className="text-sm text-gray-600">{exp.company || ""}</p>
                    <p className="text-xs text-gray-500">{exp.period || ""}</p>
                  </div>
                )) || (
                <p className="text-gray-500 text-sm">No experience added yet</p>
              )}
            </div>
          </motion.section>
        )}

        {/* Skills Section */}
        {sections.find((s) => s.type === "skills") && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h2
              className="text-3xl font-bold mb-6"
              style={{ color: theme.primary || "#0EA5E9" }}
            >
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {sections
                .find((s) => s.type === "skills")
                ?.data?.skills?.map((skill: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: theme.primary || "#0EA5E9",
                      color: "#ffffff",
                    }}
                  >
                    {skill}
                  </span>
                )) || (
                <p className="text-gray-500 text-sm">No skills added yet</p>
              )}
            </div>
          </motion.section>
        )}

        {sections.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg mb-2">No sections added yet</p>
            <p className="text-sm">Start editing to see your portfolio preview</p>
          </div>
        )}
      </div>
    </div>
  );
}


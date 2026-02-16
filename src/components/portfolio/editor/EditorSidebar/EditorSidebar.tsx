"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Sparkles,
  User,
  Folder,
  Briefcase,
  Star,
  Palette,
  LayoutTemplate,
} from "lucide-react";
import { SaveStatus } from "@/hooks/usePortfolioSync";

type SectionType =
  | "hero"
  | "about"
  | "projects"
  | "experience"
  | "skills"
  | "theme"
  | "template";

interface EditorSidebarProps {
  activeSection: SectionType;
  onSectionChange: (section: SectionType) => void;
  saveStatus: SaveStatus;
}

export function EditorSidebar({
  activeSection,
  onSectionChange,
  saveStatus,
}: EditorSidebarProps) {
  const { t } = useTranslation();
  
  const sections: { id: SectionType; label: string; icon: React.ReactNode }[] = [
    { id: "hero", label: t("editor.hero"), icon: <Sparkles className="w-4 h-4" /> },
    { id: "about", label: t("editor.about"), icon: <User className="w-4 h-4" /> },
    { id: "projects", label: t("editor.projects"), icon: <Folder className="w-4 h-4" /> },
    {
      id: "experience",
      label: t("editor.experience"),
      icon: <Briefcase className="w-4 h-4" />,
    },
    { id: "skills", label: t("editor.skills"), icon: <Star className="w-4 h-4" /> },
    { id: "theme", label: t("editor.theme"), icon: <Palette className="w-4 h-4" /> },
    {
      id: "template",
      label: t("editor.templates"),
      icon: <LayoutTemplate className="w-4 h-4" />,
    },
  ];

  const getSaveStatusText = () => {
    switch (saveStatus) {
      case "saving":
        return t("editor.saving");
      case "saved":
        return t("editor.saved");
      case "error":
        return t("editor.error");
      default:
        return t("editor.ready");
    }
  };

  const getSaveStatusColor = () => {
    switch (saveStatus) {
      case "saving":
        return "#F59E0B";
      case "saved":
        return "#20B2AA";
      case "error":
        return "#EF4444";
      default:
        return "#6B7280";
    }
  };

  return (
    <aside
      className="w-72 flex flex-col h-full"
      style={{ backgroundColor: "#FFFFFF", borderRight: "1px solid #E5E7EB" }}
    >
      {/* Header */}
      <div className="p-6" style={{ borderBottom: "1px solid #E5E7EB" }}>
        <h2 className="text-lg font-semibold mb-1" style={{ color: "#1A1A1A" }}>
          {t("editor.portfolioEditor")}
        </h2>
        <div
          className="text-xs font-medium"
          style={{ color: getSaveStatusColor() }}
        >
          {getSaveStatusText()}
        </div>
      </div>

      {/* Sections List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        {sections.map((section, index) => (
          <motion.button
            key={section.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.2 }}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSectionChange(section.id)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all cursor-pointer"
            style={{
              backgroundColor:
                activeSection === section.id ? "#40E0D0" : "#F9FAFB",
              color: activeSection === section.id ? "#FFFFFF" : "#1A1A1A",
              boxShadow:
                activeSection === section.id
                  ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                  : "none",
            }}
            onMouseEnter={(e) => {
              if (activeSection !== section.id) {
                e.currentTarget.style.backgroundColor = "#F3F4F6";
              }
            }}
            onMouseLeave={(e) => {
              if (activeSection !== section.id) {
                e.currentTarget.style.backgroundColor = "#F9FAFB";
              }
            }}
          >
            <div
              style={{
                color: activeSection === section.id ? "#FFFFFF" : "#6B7280",
              }}
            >
              {section.icon}
            </div>
            <span className="font-medium">{section.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4" style={{ borderTop: "1px solid #E5E7EB" }}>
        <p className="text-xs text-center" style={{ color: "#6B7280" }}>
          {t("editor.changesSaveAutomatically")}
        </p>
      </div>
    </aside>
  );
}

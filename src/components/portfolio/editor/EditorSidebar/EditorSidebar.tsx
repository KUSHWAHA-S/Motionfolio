"use client";

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

const sections: { id: SectionType; label: string; icon: React.ReactNode }[] = [
  { id: "hero", label: "Hero", icon: <Sparkles className='w-4 h-4' /> },
  { id: "about", label: "About", icon: <User className='w-4 h-4' /> },
  { id: "projects", label: "Projects", icon: <Folder className='w-4 h-4' /> },
  {
    id: "experience",
    label: "Experience",
    icon: <Briefcase className='w-4 h-4' />,
  },
  { id: "skills", label: "Skills", icon: <Star className='w-4 h-4' /> },
  { id: "theme", label: "Theme", icon: <Palette className='w-4 h-4' /> },
  {
    id: "template",
    label: "Templates",
    icon: <LayoutTemplate className='w-4 h-4' />,
  },
];

export function EditorSidebar({
  activeSection,
  onSectionChange,
  saveStatus,
}: EditorSidebarProps) {
  const getSaveStatusText = () => {
    switch (saveStatus) {
      case "saving":
        return "Saving...";
      case "saved":
        return "All saved";
      case "error":
        return "Error saving";
      default:
        return "Ready";
    }
  };

  const getSaveStatusColor = () => {
    switch (saveStatus) {
      case "saving":
        return "text-amber-600";
      case "saved":
        return "text-emerald-600";
      case "error":
        return "text-red-600";
      default:
        return "text-gray-500";
    }
  };

  return (
    <aside className='w-72 bg-white border-r border-gray-200 flex flex-col h-full'>
      {/* Header */}
      <div className='p-6 border-b border-gray-200'>
        <h2 className='text-lg font-semibold text-gray-900 mb-1'>
          Portfolio Editor
        </h2>
        <div className={`text-xs font-medium ${getSaveStatusColor()}`}>
          {getSaveStatusText()}
        </div>
      </div>

      {/* Sections List */}
      <div className='flex-1 overflow-y-auto p-4 space-y-1'>
        {sections.map((section, index) => (
          <motion.button
            key={section.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.2 }}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSectionChange(section.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
              activeSection === section.id
                ? "bg-gray-900 text-white shadow-lg"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
            }`}
          >
            <div
              className={
                activeSection === section.id ? "text-white" : "text-gray-500"
              }
            >
              {section.icon}
            </div>
            <span className='font-medium'>{section.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Footer */}
      <div className='p-4 border-t border-gray-200'>
        <p className='text-xs text-gray-500 text-center'>
          Changes save automatically
        </p>
      </div>
    </aside>
  );
}

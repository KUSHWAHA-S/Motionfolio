// src/app/portfolio/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutTemplate } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { defaultTheme } from "@/lib/colors";
import {
  TEMPLATE_NAMES,
  DEFAULT_TEMPLATE,
  TemplateName,
} from "@/types/constants";

const templates = [
  {
    id: TEMPLATE_NAMES.MODERN_CREATIVE,
    name: "Modern Creative",
    description:
      "Bold hero, animated sections and cards. Great for designers & developers.",
    badge: "Popular",
  },
  {
    id: TEMPLATE_NAMES.MINIMAL_SHOWCASE,
    name: "Minimal Showcase",
    description:
      "Clean, typography-focused layout. Great for simple portfolios and resumes.",
    badge: "New",
  },
  {
    id: TEMPLATE_NAMES.DEVELOPER_TWO_COLUMN,
    name: "Developer Two-Column",
    description:
      "Dark, professional two-column layout with sidebar nav and focused content sections.",
    badge: "Pro",
  },
  {
    id: TEMPLATE_NAMES.CANVAS,
    name: "Canvas",
    description:
      "Modern hero with rounded card layout and organic curved separator. Perfect for creative professionals.",
    badge: "New",
  },
] as const;

export default function NewPortfolioPage() {
  const [title, setTitle] = useState("");
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateName>(DEFAULT_TEMPLATE);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/portfolios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title,
          template: selectedTemplate,
          theme: defaultTheme,
        }),
      });

      const data = await res.json();
      if (res.ok && data?.id) {
        router.push(`/portfolio/${data.id}/edit`);
      } else {
        alert(data?.error || "Something went wrong");
      }
    } catch (e) {
      console.error(e);
      alert("Failed to create portfolio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div
        className="flex flex-col items-center justify-center min-h-screen p-6"
        style={{ backgroundColor: "#F9FAFB" }}
      >
        <div
          className="w-full max-w-2xl bg-white shadow-md rounded-2xl p-6"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: "rgba(64, 224, 208, 0.1)" }}
            >
              <LayoutTemplate
                className="w-5 h-5"
                style={{ color: "#40E0D0" }}
              />
            </div>
            <h1 className="text-2xl font-semibold" style={{ color: "#1A1A1A" }}>
              Create New Portfolio
            </h1>
          </div>

          <label className="block mb-6">
            <span
              className="text-sm font-medium mb-2 block"
              style={{ color: "#6B7280" }}
            >
              Portfolio Title
            </span>
            <input
              className="w-full p-3 border rounded-lg"
              style={{ borderColor: "#E5E7EB", color: "#1A1A1A" }}
              placeholder="My Awesome Portfolio"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <div className="mb-6">
            <span
              className="text-sm font-medium mb-3 block"
              style={{ color: "#6B7280" }}
            >
              Choose Template
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {templates.map((tpl) => {
                const isActive = selectedTemplate === tpl.id;
                return (
                  <motion.button
                    key={tpl.id}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedTemplate(tpl.id)}
                    className="w-full text-left rounded-xl border transition-all p-4 cursor-pointer"
                    style={{
                      borderColor: isActive ? "#40E0D0" : "#E5E7EB",
                      backgroundColor: isActive ? "#40E0D0" : "#FFFFFF",
                      color: isActive ? "#FFFFFF" : "#1A1A1A",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.borderColor = "#40E0D0";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.borderColor = "#E5E7EB";
                      }
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-sm">{tpl.name}</h3>
                      {tpl.badge && (
                        <span
                          className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: isActive
                              ? "rgba(255, 255, 255, 0.2)"
                              : "rgba(64, 224, 208, 0.1)",
                            color: isActive ? "#FFFFFF" : "#40E0D0",
                          }}
                        >
                          {tpl.badge}
                        </span>
                      )}
                    </div>
                    <p
                      className="text-xs"
                      style={{
                        color: isActive
                          ? "rgba(255, 255, 255, 0.9)"
                          : "#6B7280",
                      }}
                    >
                      {tpl.description}
                    </p>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleCreate}
            disabled={loading || !title.trim()}
            className="w-full text-white py-3 rounded-lg transition font-medium"
            style={{
              backgroundColor: loading || !title.trim() ? "#6B7280" : "#40E0D0",
            }}
            onMouseEnter={(e) => {
              if (!loading && title.trim()) {
                e.currentTarget.style.backgroundColor = "#20B2AA";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading && title.trim()) {
                e.currentTarget.style.backgroundColor = "#40E0D0";
              }
            }}
          >
            {loading ? "Creating..." : "Create Portfolio"}
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}

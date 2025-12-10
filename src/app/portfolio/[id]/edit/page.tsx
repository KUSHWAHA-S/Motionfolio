"use client";

import { useEffect, useState } from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { usePortfolioSync } from "@/hooks/usePortfolioSync";
import ProtectedRoute from "@/components/ProtectedRoute";
import { EditorSidebar } from "./components/EditorSidebar";
import { SectionEditor } from "./components/SectionEditor";
import { LivePreview } from "./components/LivePreview";
import { motion } from "framer-motion";
import { SaveIndicator } from "./components/SaveIndicator";

type SectionType = "hero" | "about" | "projects" | "experience" | "skills" | "theme";

export default function PortfolioEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [portfolioId, setPortfolioId] = useState<string>("");
  const [activeSection, setActiveSection] = useState<SectionType>("hero");
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const { load, reset, title, theme, sections } = usePortfolioStore();
  const { saveStatus } = usePortfolioSync(portfolioId);

  // Resolve params
  useEffect(() => {
    params.then((p) => setPortfolioId(p.id));
  }, [params]);

  // Load portfolio data
  useEffect(() => {
    if (!portfolioId) return;

    const fetchPortfolio = async () => {
      try {
        const res = await fetch(`/api/portfolios/${portfolioId}`, {
          credentials: "include",
        });
        if (!res.ok) {
          console.error("Failed to load portfolio");
          return;
        }
        const data = await res.json();
        load({
          title: data.title || "Untitled Portfolio",
          theme: data.theme || { primary: "#0EA5E9", secondary: "#1E293B" },
          sections: data.sections || [],
        });
      } catch (err) {
        console.error("Error loading portfolio:", err);
      }
    };

    fetchPortfolio();

    return () => reset();
  }, [portfolioId, load, reset]);

  return (
    <ProtectedRoute>
      <div className="h-screen flex overflow-hidden bg-gray-50">
        {/* Sidebar */}
        <EditorSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          saveStatus={saveStatus}
        />

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden">
          {activeTab === "edit" ? (
            <motion.div
              key="edit"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1 overflow-y-auto bg-white"
            >
              <div className="max-w-4xl mx-auto p-8">
                <div className="mb-6 flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-gray-900">Edit Portfolio</h1>
                  <SaveIndicator status={saveStatus} />
                </div>
                <SectionEditor section={activeSection} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1 overflow-y-auto bg-gray-100"
            >
              <div className="max-w-6xl mx-auto p-8">
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Live Preview</h1>
                  <p className="text-sm text-gray-600">See how your portfolio looks in real-time</p>
                </div>
                <LivePreview portfolioId={portfolioId} />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}

"use client";

import { useEffect, useState } from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { usePortfolioSync } from "@/hooks/usePortfolioSync";
import ProtectedRoute from "@/components/ProtectedRoute";
import { EditorSidebar } from "@/components/portfolio/editor/EditorSidebar";
import { SectionEditor } from "@/components/portfolio/editor/SectionEditor";
import { motion } from "framer-motion";
import { SaveIndicator } from "@/components/portfolio/editor/SaveIndicator";
import { Eye } from "lucide-react";
import Link from "next/link";

type SectionType =
  | "hero"
  | "about"
  | "projects"
  | "experience"
  | "skills"
  | "theme"
  | "template";

export default function PortfolioEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [portfolioId, setPortfolioId] = useState<string>("");
  const [activeSection, setActiveSection] = useState<SectionType>("hero");
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
          template: data.template || "modern-creative",
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
      <div className="h-[calc(100vh-60px)] mt-[60px] flex overflow-hidden bg-gray-50">
        {/* Sidebar */}
        <EditorSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          saveStatus={saveStatus}
        />

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1 overflow-y-auto bg-white"
          >
            <div className="max-w-4xl mx-auto p-8">
              <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">
                  Edit Portfolio
                </h1>
                <div className="flex items-center gap-4">
                  <SaveIndicator status={saveStatus} />
                  {portfolioId && (
                    <Link
                      href={`/portfolio/${portfolioId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      Preview Portfolio
                    </Link>
                  )}
                </div>
              </div>
              <SectionEditor section={activeSection} />
            </div>
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

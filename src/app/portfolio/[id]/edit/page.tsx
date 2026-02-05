"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { usePortfolioSync } from "@/hooks/usePortfolioSync";
import ProtectedRoute from "@/components/ProtectedRoute";
import { EditorSidebar } from "@/components/portfolio/editor/EditorSidebar";
import { SectionEditor } from "@/components/portfolio/editor/SectionEditor";
import { motion } from "framer-motion";
import { SaveIndicator } from "@/components/portfolio/editor/SaveIndicator";
import { Eye, AlertCircle } from "lucide-react";
import { defaultTheme } from "@/lib/colors";
import Link from "next/link";
import { SectionType, SECTION_TYPES } from "@/types/constants";
import { DEFAULT_TEMPLATE } from "@/types/constants";

export default function PortfolioEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [portfolioId, setPortfolioId] = useState<string>("");
  const [activeSection, setActiveSection] = useState<SectionType>(
    SECTION_TYPES.HERO
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/portfolios/${portfolioId}`, {
          credentials: "include",
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          if (res.status === 401) {
            // Unauthorized - redirect to login
            router.replace(
              `/auth/login?next=${encodeURIComponent(
                `/portfolio/${portfolioId}/edit`
              )}`
            );
            return;
          } else if (res.status === 404) {
            // Portfolio not found or user doesn't own it
            setError(
              "Portfolio not found or you don't have permission to edit it."
            );
          } else {
            setError(errorData.error || "Failed to load portfolio");
          }
          setLoading(false);
          return;
        }

        const data = await res.json();
        load({
          title: data.title || "Untitled Portfolio",
          theme: data.theme || defaultTheme,
          sections: data.sections || [],
          template: data.template || DEFAULT_TEMPLATE,
        });
        setLoading(false);
      } catch (err) {
        console.error("Error loading portfolio:", err);
        setError("An error occurred while loading the portfolio.");
        setLoading(false);
      }
    };

    fetchPortfolio();

    return () => reset();
  }, [portfolioId, load, reset, router]);

  if (loading) {
    return (
      <ProtectedRoute>
        <div
          className="h-[calc(100vh-70px)] mt-[70px] flex items-center justify-center"
          style={{ backgroundColor: "#F9FAFB" }}
        >
          <div className="text-center">
            <div
              className="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent mx-auto mb-4"
              style={{ borderColor: "#40E0D0" }}
            />
            <p style={{ color: "#64748B" }}>Loading portfolio...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute>
        <div
          className="h-[calc(100vh-70px)] mt-[70px] flex items-center justify-center"
          style={{ backgroundColor: "#F9FAFB" }}
        >
          <div
            className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg border"
            style={{ borderColor: "#E5E7EB" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6" style={{ color: "#EF4444" }} />
              <h2
                className="text-xl font-semibold"
                style={{ color: "#0F172A" }}
              >
                Error Loading Portfolio
              </h2>
            </div>
            <p className="mb-6" style={{ color: "#64748B" }}>
              {error}
            </p>
            <div className="flex gap-3">
              <Link
                href="/dashboard"
                className="flex-1 text-center px-4 py-2 rounded-lg transition-colors font-medium"
                style={{
                  backgroundColor: "#40E0D0",
                  color: "#FFFFFF",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#20B2AA";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#40E0D0";
                }}
              >
                Go to Dashboard
              </Link>
              <button
                onClick={() => {
                  setError(null);
                  setLoading(true);
                  // Retry loading
                  const fetchPortfolio = async () => {
                    try {
                      const res = await fetch(
                        `/api/portfolios/${portfolioId}`,
                        {
                          credentials: "include",
                        }
                      );
                      if (res.ok) {
                        const data = await res.json();
                        load({
                          title: data.title || "Untitled Portfolio",
                          theme: data.theme || defaultTheme,
                          sections: data.sections || [],
                          template: data.template || DEFAULT_TEMPLATE,
                        });
                        setLoading(false);
                        setError(null);
                      } else {
                        setError("Failed to load portfolio. Please try again.");
                        setLoading(false);
                      }
                    } catch (err) {
                      setError("An error occurred. Please try again.");
                      setLoading(false);
                    }
                  };
                  fetchPortfolio();
                }}
                className="flex-1 px-4 py-2 rounded-lg transition-colors font-medium"
                style={{
                  backgroundColor: "rgba(64, 224, 208, 0.1)",
                  color: "#40E0D0",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(64, 224, 208, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(64, 224, 208, 0.1)";
                }}
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div
        className="h-[calc(100vh-70px)] flex overflow-hidden"
        style={{ backgroundColor: "#F9FAFB" }}
      >
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
                <h1 className="text-2xl font-bold" style={{ color: "#1A1A1A" }}>
                  Edit Portfolio
                </h1>
                <div className="flex items-center gap-4">
                  <SaveIndicator status={saveStatus} />
                  {portfolioId && (
                    <button
                      onClick={() => {
                        window.open(`/portfolio/${portfolioId}`, '_blank', 'noopener,noreferrer');
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium text-sm"
                      style={{
                        backgroundColor: "#40E0D0",
                        color: "#FFFFFF",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#20B2AA";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#40E0D0";
                      }}
                    >
                      <Eye className="w-4 h-4" />
                      Preview Portfolio
                    </button>
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

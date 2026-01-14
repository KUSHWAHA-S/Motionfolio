// src/app/dashboard/page.tsx
"use client";

import useSWR from "swr";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((res) => res.json());

export default function DashboardPage() {
  const router = useRouter();
  const {
    data: portfolios,
    error,
    mutate,
  } = useSWR("/api/portfolios", fetcher);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Prevent card click
    if (!confirm("Are you sure you want to delete this portfolio?")) return;
    setDeletingId(id);
    const res = await fetch(`/api/portfolios/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) {
      mutate();
    } else {
      alert("Failed to delete portfolio.");
    }
    setDeletingId(null);
  };

  const handleCardClick = (id: string) => {
    router.push(`/portfolio/${id}`);
  };

  if (error) return <p className="p-6">Failed to load portfolios.</p>;
  if (!portfolios) return <p className="p-6">Loading...</p>;

  return (
    <ProtectedRoute>
      <div className="max-w-6xl mx-auto py-10 px-6">
        <div className="flex justify-between items-center mb-6">
          <h1
            className="text-3xl font-bold"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: "#0F172A",
            }}
          >
            Your Collection
          </h1>
          <Link
            href="/portfolio/new"
            className="text-white px-4 py-2 rounded-lg transition-colors"
            style={{ backgroundColor: "#40E0D0" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#20B2AA";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#40E0D0";
            }}
          >
            + Create New
          </Link>
        </div>

        {portfolios.length === 0 ? (
          <p>No portfolios yet. Click “Create New” to start.</p>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            style={{ perspective: "1000px" }}
          >
            {portfolios.map((p: any) => (
              <div
                key={p.id}
                onClick={() => handleCardClick(p.id)}
                className="p-6 rounded-2xl shadow-lg transition-all duration-300 cursor-pointer relative group"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid rgba(226, 232, 240, 0.8)",
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget;
                  card.style.transform =
                    "translateY(-8px) rotateX(2deg) rotateY(-2deg) scale(1.02)";
                  card.style.boxShadow =
                    "0 20px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(64, 224, 208, 0.1)";
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget;
                  card.style.transform =
                    "translateY(0) rotateX(0) rotateY(0) scale(1)";
                  card.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
                }}
                onMouseDown={(e) => {
                  const card = e.currentTarget;
                  card.style.transform =
                    "translateY(-4px) rotateX(1deg) rotateY(-1deg) scale(0.98)";
                  card.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.12)";
                }}
                onMouseUp={(e) => {
                  const card = e.currentTarget;
                  card.style.transform =
                    "translateY(-8px) rotateX(2deg) rotateY(-2deg) scale(1.02)";
                  card.style.boxShadow =
                    "0 20px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(64, 224, 208, 0.1)";
                }}
              >
                <h2
                  className="text-xl font-semibold mb-3 pr-16"
                  style={{
                    color: "#0F172A",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {p.title}
                </h2>
                <p className="text-sm mb-4" style={{ color: "#64748B" }}>
                  Last updated: {new Date(p.updated_at).toLocaleString()}
                </p>
                <div
                  className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                  onMouseDown={(e) => e.stopPropagation()}
                  onMouseUp={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      router.push(`/portfolio/${p.id}/edit`);
                    }}
                    className="p-2.5 rounded-xl transition-all duration-200 flex items-center justify-center"
                    style={{
                      backgroundColor: "rgba(64, 224, 208, 0.1)",
                      color: "#40E0D0",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(64, 224, 208, 0.2)";
                      e.currentTarget.style.transform =
                        "scale(1.1) rotate(5deg)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 12px rgba(64, 224, 208, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(64, 224, 208, 0.1)";
                      e.currentTarget.style.transform = "scale(1) rotate(0deg)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                    title="Edit portfolio"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDelete(e, p.id);
                    }}
                    disabled={deletingId === p.id}
                    className="p-2.5 rounded-xl transition-all duration-200 flex items-center justify-center disabled:opacity-50"
                    style={{
                      backgroundColor:
                        deletingId === p.id
                          ? "rgba(107, 114, 128, 0.1)"
                          : "rgba(239, 68, 68, 0.1)",
                      color: deletingId === p.id ? "#6B7280" : "#EF4444",
                    }}
                    onMouseEnter={(e) => {
                      if (deletingId !== p.id) {
                        e.currentTarget.style.backgroundColor =
                          "rgba(239, 68, 68, 0.2)";
                        e.currentTarget.style.transform =
                          "scale(1.1) rotate(-5deg)";
                        e.currentTarget.style.boxShadow =
                          "0 4px 12px rgba(239, 68, 68, 0.3)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (deletingId !== p.id) {
                        e.currentTarget.style.backgroundColor =
                          "rgba(239, 68, 68, 0.1)";
                        e.currentTarget.style.transform =
                          "scale(1) rotate(0deg)";
                        e.currentTarget.style.boxShadow = "none";
                      }
                    }}
                    title="Delete portfolio"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div
                  className="mt-4 pt-4 border-t"
                  style={{ borderColor: "rgba(226, 232, 240, 0.8)" }}
                >
                  <div
                    className="flex items-center gap-2 text-xs"
                    style={{ color: "#94A3B8" }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: "#40E0D0" }}
                    />
                    <span>Click to view</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}

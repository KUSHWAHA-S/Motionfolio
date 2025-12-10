// src/components/editor/Editor.tsx
"use client";

import { useEffect } from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { usePortfolioSync } from "@/hooks/usePortfolioSync";
import { TitleEditor } from "./components/TitleEditor";
import { SectionList } from "./components/SectionList";
import { ThemeEditor } from "./components/ThemeEditor";
import { SaveStatus } from "./components/SaveStatus";

interface EditorProps {
  portfolioId: string;
}

export const EditorLayout = ({ portfolioId }: EditorProps) => {
  const { load, reset } = usePortfolioStore();
  const { saveStatus } = usePortfolioSync(portfolioId);

  // Load portfolio from Supabase API
  useEffect(() => {
    const fetchPortfolio = async () => {
      const res = await fetch(`/api/portfolios/${portfolioId}`, {
        credentials: "include",
      });
      if (!res.ok) return;
      const data = await res.json();
      load({
        title: data.title,
        theme: data.theme || { primary: "#0EA5E9", secondary: "#1E293B" },
        sections: data.sections || [],
      });
    };

    fetchPortfolio();

    return () => reset();
  }, [portfolioId, load, reset]);

  async function handlePublish() {
    const res = await fetch("/api/portfolios/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: portfolioId, publish: true }),
    });

    if (res.ok) alert("✅ Portfolio published!");
    else alert("❌ Failed to publish");
  }

  return (
    <div className='p-8 space-y-8'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Portfolio Editor</h1>
        <SaveStatus status={saveStatus} />
        <button
          onClick={handlePublish}
          className='px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600'
        >
          Publish
        </button>
      </div>

      <TitleEditor />
      <ThemeEditor />
      <SectionList />
    </div>
  );
};

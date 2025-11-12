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
      const res = await fetch(`/api/portfolios/${portfolioId}`);
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

  return (
    <div className='p-8 space-y-8'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Portfolio Editor</h1>
        <SaveStatus status={saveStatus} />
      </div>

      <TitleEditor />
      <ThemeEditor />
      <SectionList />
    </div>
  );
};

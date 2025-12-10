// src/hooks/usePortfolioSync.ts
"use client";

import { useEffect, useRef, useState } from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import {debounce} from "@/lib/debounce";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

export function usePortfolioSync(portfolioId: string) {
  const portfolio = usePortfolioStore();
  const isFirstLoad = useRef(true);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  const savePortfolio = debounce(async (data: any) => {
    try {
      setSaveStatus("saving");
      const res = await fetch(`/api/portfolios/${portfolioId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title: data.title,
          theme: data.theme,
          sections: data.sections,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      setSaveStatus("saved");
    } catch (err) {
      setSaveStatus("error");
      console.error("Failed to auto-save portfolio:", err);
    }
  }, 20000);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    savePortfolio({
      title: portfolio.title,
      theme: portfolio.theme,
      sections: portfolio.sections,
    });
  }, [portfolio.title, portfolio.theme, portfolio.sections]);

  return { saveStatus };
}

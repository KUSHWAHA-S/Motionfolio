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
          // Template is included for forward-compatibility; the API currently
          // ignores unknown fields, and the DB can start persisting it later.
          template: data.template,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      setSaveStatus("saved");
      // Reset to idle after 2 seconds
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch (err) {
      setSaveStatus("error");
      console.error("Failed to auto-save portfolio:", err);
      // Reset error after 3 seconds
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  }, 500);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    savePortfolio({
      title: portfolio.title,
      theme: portfolio.theme,
      sections: portfolio.sections,
      template: portfolio.template,
    });
  }, [portfolio.title, portfolio.theme, portfolio.sections, portfolio.template]);

  return { saveStatus };
}

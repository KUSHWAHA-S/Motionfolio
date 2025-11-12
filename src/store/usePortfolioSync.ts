"use client";
import { useEffect, useRef } from "react";
import { usePortfolioStore } from "./usePortfolioStore";
import { debounce } from "@/lib/debounce";

export function usePortfolioSync(portfolioId: string) {
  const portfolio = usePortfolioStore();
  const isFirstLoad = useRef(true);

  // Debounce save — only push after user stops editing for 2s
  const savePortfolio = debounce(async (data) => {
    try {
      await fetch(`/api/portfolios/${portfolioId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.title,
          theme: data.theme,
          sections: data.sections,
        }),
      });
      console.log("✅ Auto-saved portfolio");
    } catch (err) {
      console.error("❌ Save failed:", err);
    }
  }, 2000);

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
}

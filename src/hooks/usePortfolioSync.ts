// src/hooks/usePortfolioSync.ts
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { debounce } from "@/lib/debounce";
import { PortfolioState } from "@/store/usePortfolioStore";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

interface SavePortfolioData {
  title: string;
  theme: PortfolioState["theme"];
  sections: PortfolioState["sections"];
  template: string;
}

/**
 * Extract error message from API response
 */
async function extractErrorMessage(res: Response): Promise<string> {
  try {
    const errorData = await res.json().catch(() => null);
    if (errorData?.error) {
      return errorData.error;
    }
    const errorText = await res.text().catch(() => null);
    if (errorText) {
      return errorText;
    }
  } catch {
    // If parsing fails, use default message
  }
  return `Failed to save portfolio (${res.status})`;
}

export function usePortfolioSync(portfolioId: string) {
  const portfolio = usePortfolioStore();
  const isFirstLoad = useRef(true);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  const savePortfolio = useCallback(
    debounce(async (data: SavePortfolioData) => {
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
            template: data.template,
          }),
        });

        if (!res.ok) {
          const errorMessage = await extractErrorMessage(res);
          throw new Error(errorMessage);
        }

        setSaveStatus("saved");
        // Reset to idle after 2 seconds
        setTimeout(() => setSaveStatus("idle"), 2000);
      } catch (err) {
        setSaveStatus("error");
        console.error("Failed to auto-save portfolio:", err);
        // Reset error after 3 seconds
        setTimeout(() => setSaveStatus("idle"), 3000);
      }
    }, 500),
    [portfolioId]
  );

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

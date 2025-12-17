"use client";

import { useEffect, useState } from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { ModernCreativeTemplate } from "@/components/templates/ModernCreativeTemplate";
import { MinimalShowcaseTemplate } from "@/components/templates/MinimalShowcaseTemplate";
import { DeveloperTwoColumnTemplate } from "@/components/templates/DeveloperTwoColumnTemplate";

interface Portfolio {
  id: string;
  title: string;
  theme: any;
  sections: any[];
  // Optional template identifier coming from the database (if present)
  template?: string;
}

interface PortfolioClientViewProps {
  portfolio: Portfolio;
}

export default function PortfolioClientView({
  portfolio,
}: PortfolioClientViewProps) {
  const { load, reset } = usePortfolioStore();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    load({
      title: portfolio.title || "Untitled Portfolio",
      theme: portfolio.theme || { primary: "#0EA5E9", secondary: "#1E293B" },
      sections: portfolio.sections || [],
      template: portfolio.template || "modern-creative",
    });
    setInitialized(true);

    return () => {
      reset();
    };
  }, [portfolio, load, reset]);

  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg">Loading portfolio...</p>
      </div>
    );
  }

  // Decide which template to render for the public view.
  const templateId = portfolio.template || "modern-creative";

  switch (templateId) {
    case "minimal-showcase":
      return (
        <MinimalShowcaseTemplate
          portfolioId={portfolio.id}
          showHeader={false}
        />
      );
    case "developer-two-column":
      return (
        <DeveloperTwoColumnTemplate
          portfolioId={portfolio.id}
          showHeader={false}
        />
      );
    case "modern-creative":
    default:
      // Public portfolio view: render as a full portfolio site.
      // The app's global navbar/layout will remain above this.
      return (
        <ModernCreativeTemplate portfolioId={portfolio.id} showHeader={false} />
      );
  }
}

"use client";

import { useEffect, useState } from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { ModernCreativeTemplate } from "@/components/templates/ModernCreativeTemplate";
import { MinimalShowcaseTemplate } from "@/components/templates/MinimalShowcaseTemplate";
import { DeveloperTwoColumnTemplate } from "@/components/templates/DeveloperTwoColumnTemplate";
import { defaultTheme } from "@/lib/colors";
import { Portfolio } from "@/types/portfolio";
import {
  TEMPLATE_NAMES,
  DEFAULT_TEMPLATE,
  TemplateName,
} from "@/types/constants";

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
      theme: portfolio.theme || defaultTheme,
      sections: portfolio.sections || [],
      template: portfolio.template || DEFAULT_TEMPLATE,
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
  const templateId: TemplateName =
    (portfolio.template as TemplateName) || DEFAULT_TEMPLATE;

  switch (templateId) {
    case TEMPLATE_NAMES.MINIMAL_SHOWCASE:
      return (
        <MinimalShowcaseTemplate
          portfolioId={portfolio.id || ""}
          showHeader={false}
        />
      );
    case TEMPLATE_NAMES.DEVELOPER_TWO_COLUMN:
      return (
        <DeveloperTwoColumnTemplate
          portfolioId={portfolio.id || ""}
          showHeader={false}
        />
      );
    case TEMPLATE_NAMES.MODERN_CREATIVE:
    default:
      // Public portfolio view: render as a full portfolio site.
      // The app's global navbar/layout will remain above this.
      return (
        <ModernCreativeTemplate
          portfolioId={portfolio.id || ""}
          showHeader={false}
        />
      );
  }
}

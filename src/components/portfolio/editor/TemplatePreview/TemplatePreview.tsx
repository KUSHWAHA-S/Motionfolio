"use client";

import { usePortfolioStore } from "@/store/usePortfolioStore";
import { ModernCreativeTemplate } from "@/components/templates/ModernCreativeTemplate";
import { MinimalShowcaseTemplate } from "@/components/templates/MinimalShowcaseTemplate";
import { DeveloperTwoColumnTemplate } from "@/components/templates/DeveloperTwoColumnTemplate";
import { JSX } from "react";

type TemplateId =
  | "modern-creative"
  | "minimal-showcase"
  | "developer-two-column";

const TEMPLATE_COMPONENTS: Record<
  TemplateId,
  (props: { portfolioId: string }) => JSX.Element
> = {
  "modern-creative": (props) => (
    <ModernCreativeTemplate portfolioId={props.portfolioId} showHeader />
  ),
  "minimal-showcase": (props) => (
    <MinimalShowcaseTemplate portfolioId={props.portfolioId} showHeader />
  ),
  "developer-two-column": (props) => (
    <DeveloperTwoColumnTemplate portfolioId={props.portfolioId} showHeader />
  ),
};

interface TemplatePreviewProps {
  portfolioId: string;
}

/**
 * Editor-side preview that routes the current portfolio through
 * the selected template. Right now we only have the original
 * design ("modern-creative"), but new templates can plug in above.
 */
export function TemplatePreview({ portfolioId }: TemplatePreviewProps) {
  const template = usePortfolioStore((state) => state.template) as TemplateId;
  const templateId: TemplateId = template || "modern-creative";
  const TemplateComponent =
    TEMPLATE_COMPONENTS[templateId] || TEMPLATE_COMPONENTS["modern-creative"];

  return <TemplateComponent portfolioId={portfolioId} />;
}

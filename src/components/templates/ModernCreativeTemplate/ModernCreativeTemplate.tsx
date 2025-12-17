"use client";

import { LivePreview } from "@/components/portfolio/editor/LivePreview/LivePreview";

interface ModernCreativeTemplateProps {
  portfolioId: string;
  /**
   * When true, show the editor preview header and framed card.
   * When false, render as a full-page portfolio layout.
   */
  showHeader?: boolean;
}

/**
 * Template implementation for the current design.
 * This wraps the existing LivePreview so we can treat it as a
 * first-class template and later add more templates alongside it.
 */
export function ModernCreativeTemplate({
  portfolioId,
  showHeader = true,
}: ModernCreativeTemplateProps) {
  return <LivePreview portfolioId={portfolioId} showHeader={showHeader} />;
}

"use client";

import { useEffect, useState } from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { usePortfolioSync } from "@/hooks/usePortfolioSync";
import {EditorLayout} from "@/components/editor/EditorLayout";

export default function EditPortfolioPage({
  params,
}: {
  params: { id: string };
}) {
  const { title, setTitle, theme, sections, addSection } = usePortfolioStore();
  const [loading, setLoading] = useState(true);

  usePortfolioSync(params.id);

  useEffect(() => {
    const loadPortfolio = async () => {
      const res = await fetch(`/api/portfolios/${params.id}`);
      const data = await res.json();
      if (data) {
        setTitle(data.title);
        if (data.theme) usePortfolioStore.setState({ theme: data.theme });
        if (data.sections)
          usePortfolioStore.setState({ sections: data.sections });
      }
      setLoading(false);
    };
    loadPortfolio();
  }, [params.id, setTitle]);

  if (loading) return <p>Loading portfolio...</p>;

  return (
    <EditorLayout
      title={title}
      theme={theme}
      sections={sections}
      onAddSection={() =>
        addSection({
          id: Date.now().toString(),
          type: "text",
          data: {},
          animation: {},
        })
      }
    />
  );
}

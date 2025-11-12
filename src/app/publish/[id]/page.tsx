import React from "react";
// @ts-expect-error: PublishPanel might be a client component
import PublishPanel from "@/components/editor/PublishPanel";

interface PublishPageProps {
  params: { id: string };
}

export default function PublishPage({ params }: PublishPageProps) {
  const { id } = params;
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold">Publish Portfolio</h1>
      <p className="text-slate-600 mt-2">Configure the public URL and visibility for your portfolio.</p>
      <div className="mt-6">
        {/* client component handles the actual publish call */}
        {/* @ts-expect-error Server Component can render client inside - PublishPanel is client */}
        <PublishPanel portfolioId={id} />
      </div>
    </div>
  );
}

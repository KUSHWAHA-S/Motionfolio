// src/components/editor/PublishPanel.tsx
"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

export default function PublishPanel({ portfolioId }: { portfolioId: string }) {
  const [slug, setSlug] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/portfolios/${portfolioId}`, {
        credentials: "include",
      });
      if (!res.ok) return;
      const portfolio = await res.json();
      setSlug(portfolio.slug ?? "");
      setIsPublic(Boolean(portfolio.is_public));
    }
    load();
  }, [portfolioId]);

  async function handlePublish() {
    setLoading(true);
    try {
      const res = await fetch("/api/portfolios/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id: portfolioId, publish: isPublic }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Publish failed");
      alert("Visibility updated ✅");
    } catch (err: any) {
      console.error(err);
      alert("Publish failed: " + (err.message || err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='bg-white p-4 rounded shadow'>
      <label className='block text-sm text-slate-700'>Public URL slug</label>
      <div className='mt-2 flex gap-2 items-center'>
        <div className='text-sm text-slate-500'>/</div>
        <input
          className='border px-3 py-1 rounded flex-1'
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder='your-username-or-slug'
        />
      </div>

      <div className='mt-4 flex items-center gap-3'>
        <input
          id='isPublic'
          type='checkbox'
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
        <label htmlFor='isPublic' className='text-sm text-slate-700'>
          Make portfolio public
        </label>
      </div>

      <div className='mt-4'>
        <Button onClick={handlePublish} disabled={loading} className='mr-2'>
          {loading ? "Publishing..." : "Publish"}
        </Button>
        <Button
          variant='ghost'
          size='sm'
          onClick={() => alert("Preview not implemented yet")}
        >
          Preview
        </Button>
      </div>
    </div>
  );
}

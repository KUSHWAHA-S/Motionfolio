// src/app/portfolio/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function NewPortfolioPage() {
  const [title, setTitle] = useState("");
  const [themeColor, setThemeColor] = useState("#0EA5E9");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/portfolios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title,
          theme: { primary: themeColor, secondary: "#1E293B" },
        }),
      });

      const data = await res.json();
      if (res.ok && data?.id) {
        router.push(`/portfolio/${data.id}/edit`);
      } else {
        alert(data?.error || "Something went wrong");
      }
    } catch (e) {
      console.error(e);
      alert("Failed to create portfolio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className='flex flex-col items-center justify-center min-h-screen p-6 bg-slate-50'>
        <div className='w-full max-w-md bg-white shadow-md rounded-2xl p-6'>
          <h1 className='text-2xl font-semibold mb-4 text-center'>
            Create New Portfolio
          </h1>

          <label className='block mb-3'>
            <span className='text-sm text-gray-600'>Title</span>
            <input
              className='w-full mt-1 p-2 border rounded-md'
              placeholder='My Awesome Portfolio'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label className='block mb-3'>
            <span className='text-sm text-gray-600'>Primary Color</span>
            <input
              type='color'
              className='w-full h-10 mt-1 border rounded-md'
              value={themeColor}
              onChange={(e) => setThemeColor(e.target.value)}
            />
          </label>

          <button
            onClick={handleCreate}
            disabled={loading}
            className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition'
          >
            {loading ? "Creating..." : "Create Portfolio"}
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}

// src/components/editor/TitleEditor.tsx
"use client";

import { usePortfolioStore } from "@/store/usePortfolioStore";

export const TitleEditor = () => {
  const { title, setTitle } = usePortfolioStore();

  return (
    <div>
      <label className='block text-sm font-medium text-gray-600 mb-1'>
        Portfolio Title
      </label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className='border px-3 py-2 rounded w-full'
        placeholder='Enter portfolio title'
      />
    </div>
  );
};

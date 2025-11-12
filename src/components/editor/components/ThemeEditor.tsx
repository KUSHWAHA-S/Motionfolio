// src/components/editor/ThemeEditor.tsx
"use client";

import { usePortfolioStore } from "@/store/usePortfolioStore";

export const ThemeEditor = () => {
  const { theme, setTheme } = usePortfolioStore();

  return (
    <div>
      <label className='block text-sm font-medium text-gray-600 mb-2'>
        Theme Colors
      </label>
      <div className='flex items-center gap-4'>
        <div>
          <span className='text-sm text-gray-500'>Primary</span>
          <input
            type='color'
            value={theme.primary}
            onChange={(e) => setTheme({ primary: e.target.value })}
            className='ml-2'
          />
        </div>
        <div>
          <span className='text-sm text-gray-500'>Secondary</span>
          <input
            type='color'
            value={theme.secondary}
            onChange={(e) => setTheme({ secondary: e.target.value })}
            className='ml-2'
          />
        </div>
      </div>
    </div>
  );
};

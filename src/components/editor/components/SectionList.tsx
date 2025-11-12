// src/components/editor/SectionList.tsx
"use client";

import { usePortfolioStore } from "@/store/usePortfolioStore";
import { v4 as uuidv4 } from "uuid";

export const SectionList = () => {
  const { sections, addSection, updateSection, removeSection } =
    usePortfolioStore();

  return (
    <div>
      <div className='flex justify-between items-center mb-2'>
        <h3 className='font-medium'>Sections</h3>
        <button
          onClick={() =>
            addSection({
              id: uuidv4(),
              type: "text",
              data: { content: "New Section" },
              animation: null,
            })
          }
          className='bg-blue-500 text-white px-3 py-1 rounded'
        >
          + Add Section
        </button>
      </div>

      <div className='space-y-2'>
        {sections.map((s) => (
          <div key={s.id} className='border p-3 rounded'>
            <input
              value={s.data.content}
              onChange={(e) =>
                updateSection(s.id, {
                  data: { ...s.data, content: e.target.value },
                })
              }
              className='border-b w-full outline-none'
            />
            <button
              onClick={() => removeSection(s.id)}
              className='text-red-500 text-sm mt-1'
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

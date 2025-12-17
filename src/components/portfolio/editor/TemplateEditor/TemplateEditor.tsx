"use client";

import { motion } from "framer-motion";
import { LayoutTemplate } from "lucide-react";
import { usePortfolioStore } from "@/store/usePortfolioStore";

const templates = [
  {
    id: "modern-creative",
    name: "Modern Creative",
    description:
      "Bold hero, animated sections and cards. Great for designers & developers.",
    badge: "Current",
  },
  {
    id: "minimal-showcase",
    name: "Minimal Showcase",
    description:
      "Clean, typography-focused layout. Great for simple portfolios and resumes.",
    badge: "New",
  },
  {
    id: "developer-two-column",
    name: "Developer Two-Column",
    description:
      "Dark, professional two-column layout with sidebar nav and focused content sections.",
    badge: "Pro",
  },
];

export function TemplateEditor() {
  const { template, setTemplate } = usePortfolioStore();

  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-3 mb-6'>
        <div className='p-2 bg-indigo-100 rounded-lg'>
          <LayoutTemplate className='w-5 h-5 text-indigo-600' />
        </div>
        <div>
          <h2 className='text-xl font-semibold text-gray-900'>Templates</h2>
          <p className='text-sm text-gray-500'>
            Choose a layout for your portfolio. Your content will flow into the selected
            template.
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className='grid grid-cols-1 md:grid-cols-2 gap-4'
      >
        {templates.map((tpl) => {
          const isActive = template === tpl.id;
          return (
            <motion.button
              key={tpl.id}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setTemplate(tpl.id)}
              className={`w-full text-left rounded-2xl border transition-all p-4 ${
                isActive
                  ? "border-gray-900 bg-gray-900 text-white shadow-xl"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md text-gray-900"
              }`}
            >
              <div className='flex items-center justify-between mb-3'>
                <h3 className='font-semibold text-base'>{tpl.name}</h3>
                {isActive && (
                  <span className='text-[11px] font-medium px-2 py-1 rounded-full bg-white/10 border border-white/30'>
                    Selected
                  </span>
                )}
              </div>
              <p
                className={`text-xs mb-3 ${
                  isActive ? "text-gray-100/80" : "text-gray-500"
                }`}
              >
                {tpl.description}
              </p>
              {/* Simple visual hint of layout */}
              <div
                className={`rounded-xl border ${
                  isActive ? "border-white/30 bg-white/5" : "border-dashed border-gray-300"
                } p-3 space-y-2 bg-gradient-to-br from-gray-50 to-gray-100`}
              >
                <div className='h-6 rounded-md bg-gray-800/80 mb-1' />
                <div className='h-3 w-2/3 rounded-md bg-gray-400/70' />
                <div className='grid grid-cols-3 gap-2 mt-2'>
                  <div className='h-10 rounded-md bg-gray-300/80' />
                  <div className='h-10 rounded-md bg-gray-300/80' />
                  <div className='h-10 rounded-md bg-gray-300/80' />
                </div>
              </div>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}



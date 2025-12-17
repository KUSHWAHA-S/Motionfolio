"use client";

import { usePortfolioStore } from "@/store/usePortfolioStore";
import { motion } from "framer-motion";
import { Palette, Sparkles } from "lucide-react";

const presetThemes = [
  { name: "Ocean", primary: "#0EA5E9", secondary: "#1E293B", background: "#FFFFFF", text: "#1F2937" },
  { name: "Forest", primary: "#10B981", secondary: "#064E3B", background: "#FFFFFF", text: "#1F2937" },
  { name: "Sunset", primary: "#F59E0B", secondary: "#92400E", background: "#FFFFFF", text: "#1F2937" },
  { name: "Purple", primary: "#8B5CF6", secondary: "#4C1D95", background: "#FFFFFF", text: "#1F2937" },
  { name: "Rose", primary: "#F43F5E", secondary: "#881337", background: "#FFFFFF", text: "#1F2937" },
  { name: "Dark", primary: "#6366F1", secondary: "#1E293B", background: "#0F172A", text: "#F1F5F9" },
];

export function ThemeEditor() {
  const { theme, setTheme } = usePortfolioStore();

  const applyPreset = (preset: typeof presetThemes[0]) => {
    setTheme({
      primary: preset.primary,
      secondary: preset.secondary,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-pink-100 rounded-lg">
          <Palette className="w-5 h-5 text-pink-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Theme & Styling</h2>
          <p className="text-sm text-gray-500">Customize your portfolio's look</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Preset Themes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Preset Themes
          </label>
          <div className="grid grid-cols-3 gap-3">
            {presetThemes.map((preset) => (
              <motion.button
                key={preset.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => applyPreset(preset)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  theme.primary === preset.primary
                    ? "border-gray-900 shadow-lg"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div
                  className="w-full h-20 rounded-lg mb-2"
                  style={{ backgroundColor: preset.primary }}
                />
                <div className="text-xs font-medium text-gray-700">
                  {preset.name}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Custom Colors */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Color
            </label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={theme.primary}
                onChange={(e) => setTheme({ primary: e.target.value })}
                className="w-16 h-16 rounded-lg border-2 border-gray-200 cursor-pointer"
              />
              <div className="flex-1">
                <input
                  type="text"
                  value={theme.primary}
                  onChange={(e) => setTheme({ primary: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg font-mono text-sm"
                  placeholder="#0EA5E9"
                />
              </div>
              <div
                className="w-12 h-12 rounded-lg border border-gray-200"
                style={{ backgroundColor: theme.primary }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Secondary Color
            </label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={theme.secondary}
                onChange={(e) => setTheme({ secondary: e.target.value })}
                className="w-16 h-16 rounded-lg border-2 border-gray-200 cursor-pointer"
              />
              <div className="flex-1">
                <input
                  type="text"
                  value={theme.secondary}
                  onChange={(e) => setTheme({ secondary: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg font-mono text-sm"
                  placeholder="#1E293B"
                />
              </div>
              <div
                className="w-12 h-12 rounded-lg border border-gray-200"
                style={{ backgroundColor: theme.secondary }}
              />
            </div>
          </div>
        </div>

        {/* Preview */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Theme Preview
          </label>
          <div className="p-6 rounded-xl border border-gray-200 bg-white">
            <div
              className="p-4 rounded-lg mb-3"
              style={{ backgroundColor: theme.primary, color: "#FFFFFF" }}
            >
              <div className="font-semibold text-lg">Primary Color</div>
              <div className="text-sm opacity-90">{theme.primary}</div>
            </div>
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: theme.secondary, color: "#FFFFFF" }}
            >
              <div className="font-semibold text-lg">Secondary Color</div>
              <div className="text-sm opacity-90">{theme.secondary}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}


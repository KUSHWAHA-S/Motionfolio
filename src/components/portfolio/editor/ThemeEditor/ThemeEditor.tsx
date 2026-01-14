"use client";

import { usePortfolioStore } from "@/store/usePortfolioStore";
import { motion } from "framer-motion";
import { Palette, Sparkles } from "lucide-react";

const presetThemes = [
  {
    name: "Turquoise",
    primary: "#40E0D0",
    secondary: "#20B2AA",
    background: "#FFFFFF",
    text: "#1A1A1A",
  },
  {
    name: "Aqua",
    primary: "#48D1CC",
    secondary: "#20B2AA",
    background: "#FFFFFF",
    text: "#1A1A1A",
  },
  {
    name: "Teal",
    primary: "#20B2AA",
    secondary: "#008B8B",
    background: "#FFFFFF",
    text: "#1A1A1A",
  },
  {
    name: "Cyan",
    primary: "#00CED1",
    secondary: "#40E0D0",
    background: "#FFFFFF",
    text: "#1A1A1A",
  },
  {
    name: "Ocean",
    primary: "#5F9EA0",
    secondary: "#4682B4",
    background: "#FFFFFF",
    text: "#1A1A1A",
  },
  {
    name: "Dark",
    primary: "#40E0D0",
    secondary: "#20B2AA",
    background: "#1A1A1A",
    text: "#E5E7EB",
  },
];

export function ThemeEditor() {
  const { theme, setTheme } = usePortfolioStore();

  const applyPreset = (preset: (typeof presetThemes)[0]) => {
    setTheme({
      primary: preset.primary,
      secondary: preset.secondary,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div
          className="p-2 rounded-lg"
          style={{ backgroundColor: "rgba(64, 224, 208, 0.1)" }}
        >
          <Palette className="w-5 h-5" style={{ color: "#40E0D0" }} />
        </div>
        <div>
          <h2 className="text-xl font-semibold" style={{ color: "#1A1A1A" }}>
            Theme & Styling
          </h2>
          <p className="text-sm" style={{ color: "#6B7280" }}>
            Customize your portfolio's look
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Preset Themes */}
        <div>
          <label
            className="block text-sm font-medium mb-3"
            style={{ color: "#1A1A1A" }}
          >
            Preset Themes
          </label>
          <div className="grid grid-cols-3 gap-3">
            {presetThemes.map((preset) => (
              <motion.button
                key={preset.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => applyPreset(preset)}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  theme.primary === preset.primary ? "shadow-lg" : ""
                }`}
                style={{
                  borderColor:
                    theme.primary === preset.primary ? "#40E0D0" : "#E5E7EB",
                }}
              >
                <div
                  className="w-full h-20 rounded-lg mb-2"
                  style={{ backgroundColor: preset.primary }}
                />
                <div
                  className="text-xs font-medium"
                  style={{ color: "#1A1A1A" }}
                >
                  {preset.name}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Custom Colors */}
        <div className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#1A1A1A" }}
            >
              Primary Color
            </label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={theme.primary}
                onChange={(e) => setTheme({ primary: e.target.value })}
                className="w-16 h-16 rounded-lg border-2 cursor-pointer"
                style={{ borderColor: "#E5E7EB" }}
              />
              <div className="flex-1">
                <input
                  type="text"
                  value={theme.primary}
                  onChange={(e) => setTheme({ primary: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg font-mono text-sm"
                  style={{ borderColor: "#E5E7EB", color: "#1A1A1A" }}
                  placeholder="#40E0D0"
                />
              </div>
              <div
                className="w-12 h-12 rounded-lg border"
                style={{
                  backgroundColor: theme.primary,
                  borderColor: "#E5E7EB",
                }}
              />
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#1A1A1A" }}
            >
              Secondary Color
            </label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={theme.secondary}
                onChange={(e) => setTheme({ secondary: e.target.value })}
                className="w-16 h-16 rounded-lg border-2 cursor-pointer"
                style={{ borderColor: "#E5E7EB" }}
              />
              <div className="flex-1">
                <input
                  type="text"
                  value={theme.secondary}
                  onChange={(e) => setTheme({ secondary: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg font-mono text-sm"
                  style={{ borderColor: "#E5E7EB", color: "#1A1A1A" }}
                  placeholder="#20B2AA"
                />
              </div>
              <div
                className="w-12 h-12 rounded-lg border"
                style={{
                  backgroundColor: theme.secondary,
                  borderColor: "#E5E7EB",
                }}
              />
            </div>
          </div>
        </div>

        {/* Preview */}
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "#1A1A1A" }}
          >
            Theme Preview
          </label>
          <div
            className="p-6 rounded-xl border bg-white"
            style={{ borderColor: "#E5E7EB" }}
          >
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

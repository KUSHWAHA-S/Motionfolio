"use client";

import { usePortfolioStore } from "@/store/usePortfolioStore";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Sparkles, Upload } from "lucide-react";

export function HeroEditor() {
  const { title, setTitle, sections, updateSection } = usePortfolioStore();

  const heroSection = sections.find((s) => s.type === "hero");
  const heroData = heroSection?.data || {
    subtitle: "",
    description: "",
    imageUrl: "",
    ctaText: "",
    ctaLink: "",
  };

  const updateHeroData = (updates: any) => {
    if (heroSection) {
      updateSection(heroSection.id, { data: { ...heroData, ...updates } });
    } else {
      // Create new hero section if it doesn't exist
      const { addSection } = usePortfolioStore.getState();
      addSection({
        id: `hero-${Date.now()}`,
        type: "hero",
        data: { ...heroData, ...updates },
        animation: {},
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Sparkles className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Hero Section</h2>
          <p className="text-sm text-gray-500">Your portfolio's first impression</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Portfolio Title
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., John Doe - Full Stack Developer"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subtitle
          </label>
          <Input
            value={heroData.subtitle}
            onChange={(e) => updateHeroData({ subtitle: e.target.value })}
            placeholder="e.g., Building amazing digital experiences"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <Textarea
            value={heroData.description}
            onChange={(e) => updateHeroData({ description: e.target.value })}
            placeholder="A brief introduction about yourself..."
            rows={4}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hero Image URL
          </label>
          <div className="flex gap-2">
            <Input
              value={heroData.imageUrl}
              onChange={(e) => updateHeroData({ imageUrl: e.target.value })}
              placeholder="https://example.com/image.jpg"
              className="flex-1"
            />
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <Upload className="w-4 h-4" />
            </button>
          </div>
          {heroData.imageUrl && (
            <div className="mt-2 rounded-lg overflow-hidden border border-gray-200">
              <img
                src={heroData.imageUrl}
                alt="Hero preview"
                className="w-full h-48 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CTA Button Text
            </label>
            <Input
              value={heroData.ctaText}
              onChange={(e) => updateHeroData({ ctaText: e.target.value })}
              placeholder="e.g., View My Work"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CTA Link
            </label>
            <Input
              value={heroData.ctaLink}
              onChange={(e) => updateHeroData({ ctaLink: e.target.value })}
              placeholder="e.g., /projects"
              className="w-full"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}


"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Sparkles, AlertCircle } from "lucide-react";
import { HeroSectionData } from "@/types/portfolio";

export function HeroEditor() {
  const { t } = useTranslation();
  const { title, setTitle, sections, updateSection } = usePortfolioStore();
  const [imageError, setImageError] = useState<string | null>(null);

  const heroSection = sections.find((s) => s.type === "hero");
  const heroData: HeroSectionData = (heroSection?.data as HeroSectionData) || {
    subtitle: "",
    description: "",
    imageUrl: "",
    ctaText: "",
    ctaLink: "",
  };

  const { addSection } = usePortfolioStore();

  // Extract direct image URL from Google redirect URLs
  const extractImageUrl = (url: string): string => {
    try {
      // If it's a Google redirect URL, try to extract the actual URL
      if (url.includes("google.com/url") || url.includes("url?sa=i")) {
        const urlParams = new URLSearchParams(url.split("?")[1] || "");
        const actualUrl = urlParams.get("url");
        if (actualUrl) {
          return decodeURIComponent(actualUrl);
        }
      }
      // If it's already a direct URL, return as is
      return url;
    } catch (err) {
      return url;
    }
  };

  const handleImageUrlChange = (url: string) => {
    setImageError(null);
    const directUrl = extractImageUrl(url);
    updateHeroData({ imageUrl: directUrl });

    // Validate the image URL
    if (directUrl) {
      const img = new Image();
      img.onload = () => setImageError(null);
      img.onerror = () =>
        setImageError(t("hero.imageLoadError"));
      img.src = directUrl;
    }
  };

  const updateHeroData = (updates: any) => {
    if (heroSection) {
      updateSection(heroSection.id, { data: { ...heroData, ...updates } });
    } else {
      // Create new hero section if it doesn't exist
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
        <div
          className="p-2 rounded-lg"
          style={{ backgroundColor: "rgba(64, 224, 208, 0.1)" }}
        >
          <Sparkles className="w-5 h-5" style={{ color: "#40E0D0" }} />
        </div>
        <div>
          <h2 className="text-xl font-semibold" style={{ color: "#1A1A1A" }}>
            {t("hero.title")}
          </h2>
          <p className="text-sm text-gray-500">
            {t("hero.subtitle")}
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("hero.portfolioTitle")}
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t("hero.portfolioTitlePlaceholder")}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("hero.subtitleLabel")}
          </label>
          <Input
            value={heroData.subtitle || ""}
            onChange={(e) => updateHeroData({ subtitle: e.target.value })}
            placeholder={t("hero.subtitlePlaceholder")}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("hero.description")}
          </label>
          <Textarea
            value={heroData.description || ""}
            onChange={(e) => updateHeroData({ description: e.target.value })}
            placeholder={t("hero.descriptionPlaceholder")}
            rows={4}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("hero.heroImageUrl")}
          </label>
          <Input
            value={heroData.imageUrl || ""}
            onChange={(e) => handleImageUrlChange(e.target.value)}
            placeholder={t("hero.heroImagePlaceholder")}
            className="w-full"
          />
          {imageError && (
            <div className="mt-2 flex items-center gap-2 text-sm text-red-600 bg-red-50 p-2 rounded-lg">
              <AlertCircle className="w-4 h-4" />
              <span>{imageError}</span>
            </div>
          )}
          {heroData.imageUrl && !imageError && (
            <div className="mt-2 rounded-lg overflow-hidden border border-gray-200">
              <img
                src={heroData.imageUrl}
                alt="Hero preview"
                className="w-full h-48 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                  setImageError(t("hero.imageFailedToLoad"));
                }}
                onLoad={() => setImageError(null)}
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("hero.ctaButtonText")}
            </label>
            <Input
              value={heroData.ctaText || ""}
              onChange={(e) => updateHeroData({ ctaText: e.target.value })}
              placeholder={t("hero.ctaButtonPlaceholder")}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("hero.ctaLink")}
            </label>
            <Input
              value={heroData.ctaLink || ""}
              onChange={(e) => updateHeroData({ ctaLink: e.target.value })}
              placeholder={t("hero.ctaLinkPlaceholder")}
              className="w-full"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
